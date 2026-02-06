import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

export const runtime = 'edge';
export const revalidate = 60

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: post, error } = await supabase
    .from('posts')
    .select('title, content, created_at')
    .eq('slug', slug)
    .single()

  if (error || !post) {
    console.error('Error fetching post:', error)
    return notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* Header */}
        <header className="mb-12 border-b pb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">
            {post.title}
          </h1>
          <time className="text-muted-foreground/60 text-sm font-mono block">
            {new Date(post.created_at).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </time>
        </header>
        
        {/* Content */}
        <article className="prose prose-emerald dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.content} />
        </article>
      </div>
    </div>
  )
}
