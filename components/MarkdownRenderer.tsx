'use client';

import ReactMarkdown from 'react-markdown';

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-8 mb-4 text-foreground" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-6 mb-3 text-muted-foreground" {...props} />,
        p: ({node, ...props}) => <p className="text-muted-foreground leading-relaxed mb-6" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 text-muted-foreground space-y-2" {...props} />,
        ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 text-muted-foreground space-y-2" {...props} />,
        li: ({node, ...props}) => <li className="pl-2" {...props} />,
        a: ({node, ...props}) => <a className="text-primary hover:underline underline-offset-4 font-medium" {...props} />,
        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary/20 pl-4 italic text-muted-foreground my-6 bg-muted/30 p-4 rounded-r-lg" {...props} />,
        code: ({node, ...props}) => {
          const isBlock = node?.position?.start.line !== node?.position?.end.line
          return (
            <code 
              className={`${isBlock ? 'block p-4 my-6 overflow-x-auto border' : 'px-1.5 py-0.5'} bg-muted rounded-md text-sm font-mono text-foreground border-border/50`} 
              {...props} 
            />
          )
        },
        img: ({node, ...props}) => <img className="rounded-lg border my-8 w-full h-auto shadow-sm" {...props} />,
        hr: ({node, ...props}) => <hr className="border-border my-12" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
