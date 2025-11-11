# syntax=docker/dockerfile:1.6

# ---------------------------
# 1. Builder stage
# ---------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
  else npm install; \
  fi

# Copy project files and build
COPY . .
RUN npm run build

# ---------------------------
# 2. Production Runner
# ---------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Copy only necessary artifacts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Next.js needs standalone server build for production
CMD ["npm", "run", "start"]
