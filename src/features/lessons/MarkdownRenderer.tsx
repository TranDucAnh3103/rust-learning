import React, { useState } from 'react';
import { Copy, Check, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    toast.success('Code Copied', 'Rust code copied to your clipboard.');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSendToPlayground = (code: string) => {
    sessionStorage.setItem('rustforge_playground_custom_code', code);
    toast.info('Loaded in Playground', 'Switching to interactive workspace...');
    navigate('/playground');
  };

  // Parse lines into tokens: headings, code blocks, tables, blockquotes, paragraphs
  const renderFormattedText = () => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    let blockCounter = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code Block: ```rust or ```text
      if (line.trim().startsWith('```')) {
        const lang = line.trim().slice(3).trim() || 'rust';
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        const codeText = codeLines.join('\n');
        const currentIndex = blockCounter++;

        const isCompileFailure = codeText.includes('EXPECTED COMPILE FAILURE') || codeText.includes('RUNTIME PANIC');

        elements.push(
          <div key={`code-${currentIndex}`} className="my-5 rounded-2xl overflow-hidden border border-white/10 shadow-glass">
            <div className="flex items-center justify-between px-4 py-2 bg-[#070a10] border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-orange-400 font-semibold uppercase">{lang}</span>
                {isCompileFailure && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Expected Failure
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(codeText, currentIndex)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Copy code"
                >
                  {copiedIndex === currentIndex ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px] text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium">Copy</span>
                    </>
                  )}
                </button>
                {lang === 'rust' && (
                  <button
                    onClick={() => handleSendToPlayground(codeText)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 transition-colors"
                    title="Send code to interactive playground"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span className="text-[11px] font-medium">Try in Playground</span>
                  </button>
                )}
              </div>
            </div>
            <pre className="p-4 bg-[#0a0e17] text-slate-200 overflow-x-auto text-[13px] font-mono leading-relaxed selection:bg-orange-500/30">
              <code>{codeText}</code>
            </pre>
          </div>
        );
        continue;
      }

      // Headings
      if (line.startsWith('# ')) {
        const title = line.replace('# ', '');
        elements.push(
          <h1 key={`h1-${i}`} className="text-2xl md:text-3xl font-extrabold text-white mt-8 mb-4 tracking-tight">
            {title}
          </h1>
        );
        i++;
        continue;
      }

      if (line.startsWith('## ')) {
        const title = line.replace('## ', '');
        const anchorId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        elements.push(
          <h2
            key={`h2-${i}`}
            id={anchorId}
            className="text-xl md:text-2xl font-bold text-slate-100 mt-8 mb-3 pt-2 border-b border-white/10 pb-2 tracking-tight flex items-center gap-2 group"
          >
            <span>{title}</span>
            <a href={`#${anchorId}`} className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity text-base">
              #
            </a>
          </h2>
        );
        i++;
        continue;
      }

      if (line.startsWith('### ')) {
        const title = line.replace('### ', '');
        elements.push(
          <h3 key={`h3-${i}`} className="text-lg font-semibold text-orange-300 mt-6 mb-2">
            {title}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal Rule
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${i}`} className="my-6 border-white/10" />);
        i++;
        continue;
      }

      // Blockquote / Callout
      if (line.startsWith('> ')) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].startsWith('> ')) {
          quoteLines.push(lines[i].replace(/^>\s?/, ''));
          i++;
        }
        elements.push(
          <div key={`quote-${i}`} className="my-4 p-4 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 text-sm text-slate-200">
            {quoteLines.join(' ')}
          </div>
        );
        continue;
      }

      // Markdown Tables
      if (line.includes('|') && lines[i + 1]?.includes('|') && lines[i + 1]?.includes('---')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].includes('|')) {
          tableLines.push(lines[i]);
          i++;
        }

        const headers = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        const rows = tableLines.slice(2).map((rowStr) =>
          rowStr
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );

        elements.push(
          <div key={`table-${i}`} className="my-5 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="p-3 font-semibold text-slate-200 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02]">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-slate-300 font-mono text-xs">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Unordered lists (- or *)
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
          listItems.push(lines[i].trim().replace(/^[-*]\s+/, ''));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="my-3 space-y-1.5 list-disc list-inside text-sm text-slate-300">
            {listItems.map((item, itemIdx) => (
              <li key={itemIdx} className="leading-relaxed">
                {parseInlineSpans(item)}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered lists (1. , 2. )
      if (/^\d+\.\s/.test(line.trim())) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="my-3 space-y-1.5 list-decimal list-inside text-sm text-slate-300">
            {listItems.map((item, itemIdx) => (
              <li key={itemIdx} className="leading-relaxed">
                {parseInlineSpans(item)}
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Paragraph
      if (line.trim().length > 0) {
        elements.push(
          <p key={`p-${i}`} className="my-3 text-sm md:text-base leading-relaxed text-slate-300">
            {parseInlineSpans(line)}
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  // Helper to format inline bold, backticks code, and links
  const parseInlineSpans = (text: string): React.ReactNode => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const code = part.slice(1, -1);
        return (
          <code key={idx} className="px-1.5 py-0.5 mx-0.5 rounded-md bg-white/10 text-orange-300 font-mono text-xs border border-white/10">
            {code}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        const bold = part.slice(2, -2);
        return (
          <strong key={idx} className="font-semibold text-slate-100">
            {bold}
          </strong>
        );
      }
      return part;
    });
  };

  return <article className="prose prose-invert max-w-none">{renderFormattedText()}</article>;
};
