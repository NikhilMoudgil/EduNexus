import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-cyan max-w-none font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h1 className="text-3xl font-black mb-6 border-b border-white/10 pb-4" {...props} />,
          h2: (props) => <h2 className="text-2xl font-bold text-cyan-400 mt-10 mb-4 border-l-4 border-cyan-500 pl-4 bg-cyan-500/10 py-2 rounded-r-lg" {...props} />,
          h3: (props) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
          table: (props) => <div className="overflow-x-auto my-8 border border-white/10 rounded-xl bg-black/20"><table className="w-full text-left border-collapse" {...props} /></div>,
          thead: (props) => <thead className="bg-white/5 border-b border-white/10" {...props} />,
          th: (props) => <th className="p-4 font-semibold text-sm uppercase tracking-wider" {...props} />,
          td: (props) => <td className="p-4 text-sm text-gray-300 border-b border-white/5" {...props} />,
          ul: (props) => <ul className="list-disc ml-5 space-y-2 mb-6 marker:text-cyan-500" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}