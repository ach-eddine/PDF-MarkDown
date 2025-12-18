import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

interface PreviewProps {
    markdown: string;
}

export function Preview({ markdown }: PreviewProps) {
    return (
        <div className="w-full h-full bg-white overflow-y-auto">
            <div
                id="pdf-content"
                className="max-w-[210mm] mx-auto min-h-[297mm] p-[20mm] shadow-lg mb-8 print:shadow-none print:mb-0"
                style={{ backgroundColor: '#ffffff', color: '#000000' }}
            >
                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-p:leading-relaxed">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeSanitize]}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
