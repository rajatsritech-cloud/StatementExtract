'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export interface AdminEditorProps {
  initialContent?: string;
  initialTitle?: string;
  initialSlug?: string;
  initialSummary?: string;
  initialCoverImage?: string;
  initialTags?: string[];
}

export const AdminEditor = ({
  initialContent = '',
  initialTitle = '',
  initialSlug = '',
  initialSummary = '',
  initialCoverImage = '',
  initialTags = [],
}: AdminEditorProps) => {
  const { getToken } = useAuth();
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [slugTouched, setSlugTouched] = useState(false);
  const [summary, setSummary] = useState(initialSummary);
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [tags, setTags] = useState(initialTags.join(', '));
  const [body, setBody] = useState(initialContent);
  const [commitMessage, setCommitMessage] = useState('');
  const [createPR, setCreatePR] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  const frontmatter = useMemo(
    () => ({
      title,
      summary,
      coverImage,
      date: new Date().toISOString().split('T')[0],
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }),
    [title, summary, coverImage, tags],
  );

  const handleSave = useCallback(
    async (withPR: boolean) => {
      if (!title.trim()) {
        toast.error('Title is required');
        return;
      }

      if (!body.trim()) {
        toast.error('Content cannot be empty');
        return;
      }

      setSaving(true);
      try {
        const payload = {
          slug: slug || slugify(title),
          frontmatter,
          content: body,
          commitMessage: commitMessage || `Add blog ${title}`,
          createPR: withPR,
        };
        const token = await getToken();

        const res = await fetch('/api/admin/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (!res.ok || !json.ok) {
          throw new Error(json.error || 'Unknown error');
        }

        if (withPR) {
          toast.success(`Pull request created: ${json.prUrl}`);
        } else {
          toast.success(`Commit pushed: ${json.commit}`);
        }
      } catch (error: any) {
        console.error('Save failed', error);
        toast.error(`Save failed: ${error.message ?? error}`);
      } finally {
        setSaving(false);
      }
    },
    [body, commitMessage, frontmatter, slug, title],
  );

  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Title</label>
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Automating Bank Statements with AI" />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Slug</label>
          <Input
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setSlugTouched(true);
            }}
            placeholder="automating-bank-statements-with-ai"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Summary</label>
          <Textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="Optional short description shown in blog list"
            rows={3}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Cover image URL</label>
          <Input value={coverImage} onChange={(event) => setCoverImage(event.target.value)} placeholder="https://example.com/cover.jpg" />
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Upload to R2 separately and paste the public URL.</p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Tags</label>
          <Input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="finance, automation, cloudflare" />
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Comma-separated list of tags.</p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Commit message</label>
          <Input value={commitMessage} onChange={(event) => setCommitMessage(event.target.value)} placeholder={`Add blog ${title || ''}`} />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Content</h2>
          <span className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Markdown with live preview</span>
        </div>
        <div data-color-mode="dark">
          <MDEditor height={500} value={body} onChange={(value) => setBody(value ?? '')} preview="live" hideToolbar={false} />
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
        <label className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-[hsl(var(--border))]"
            checked={createPR}
            onChange={(event) => setCreatePR(event.target.checked)}
          />
          Open pull request instead of direct commit
        </label>
        <div className="flex gap-3">
          <Button disabled={saving} onClick={() => handleSave(false)}>
            {saving ? 'Saving…' : 'Save to main'}
          </Button>
          <Button disabled={saving} variant="outline" onClick={() => handleSave(true)}>
            {saving ? 'Saving…' : 'Save & create PR'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AdminEditor;
