import { supabase } from '@/lib/supabaseClient'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

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
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-zinc-800">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center text-zinc-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
            {post.title}
          </h1>
          <time className="text-zinc-500 text-sm font-mono block">
            {new Date(post.created_at).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>
        
        {/* Content */}
        <article className="prose-invert">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-white" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-8 mb-4 text-zinc-100" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-6 mb-3 text-zinc-200" {...props} />,
              p: ({node, ...props}) => <p className="text-zinc-300 leading-relaxed mb-6" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 text-zinc-300 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 text-zinc-300 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="pl-2" {...props} />,
              a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-zinc-700 pl-4 italic text-zinc-400 my-6" {...props} />,
              code: ({node, ...props}) => {
                const isBlock = node?.position?.start.line !== node?.position?.end.line
                return (
                  <code 
                    className={`${isBlock ? 'block p-4 my-6 overflow-x-auto' : 'px-1.5 py-0.5'} bg-zinc-900 rounded-md text-sm font-mono text-zinc-200 border border-zinc-800/50`} 
                    {...props} 
                  />
                )
              },
              img: ({node, ...props}) => <img className="rounded-lg border border-zinc-800 my-8 w-full h-auto" {...props} />,
              hr: ({node, ...props}) => <hr className="border-zinc-800 my-12" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
