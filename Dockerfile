# Use explicit Dockerfile syntax
# syntax=docker/dockerfile:1.6

# ---------------------------
# Base image for all stages
# ---------------------------
FROM node:22.21.0-bullseye AS base
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# --- IMPORTANT ADDITION ---
# Declare ARG for the publishable key
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# Set ENV from ARG, making it available in subsequent stages
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# --- END IMPORTANT ADDITION ---

ENV NEXT_TELEMETRY_DISABLED=1 # Moved here as it applies to all stages


# ---------------------------
# 1. Dependencies stage (glibc / Debian)
# ---------------------------
FROM base AS deps
# No WORKDIR needed, inherited from base
# No ENV needed, inherited from base

# install minimal build tools (if native builds are needed)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 build-essential ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy package manifests and install deps (npm ci for reproducible installs)
COPY package.json package-lock.json* ./
# ensure postinstall runs if present; use unsafe-perm for rebuild scripts
RUN npm ci --unsafe-perm --no-audit --no-fund

# Ensure lightningcss native binary is present for glibc (best-effort)
RUN npm rebuild lightningcss --update-binary || true

# ---------------------------
# 2. Builder stage
# ---------------------------
FROM base AS builder
# No WORKDIR needed, inherited from base
# No ENV needed, inherited from base

# Copy deps from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app (production)
# The NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY from the base stage will be available here
RUN npm run build

# ---------------------------
# 3. Production Runner (minimal)
# ---------------------------
FROM base AS runner
# No WORKDIR needed, inherited from base
# No ENV needed, inherited from base

# Create non-root user
RUN groupadd --system nextgroup && useradd --system --gid nextgroup --uid 1001 nextuser

# Copy the standalone output from builder (Next.js standalone)
# (This assumes you use Next's standalone output via `next.config.js` or default packaging)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Ensure permissions
RUN chown -R nextuser:nextgroup /app

USER nextuser

EXPOSE 8080

# Start the app (server.js is created by Next standalone)
CMD ["node", "server.js"]
