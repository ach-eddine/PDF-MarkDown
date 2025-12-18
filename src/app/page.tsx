"use client";

import React, { useState, useEffect } from 'react';
import { Editor } from '@/components/Editor';
import { Preview } from '@/components/Preview';
import { Header } from '@/components/Header';
import { Eye, Edit2 } from 'lucide-react';

const DEFAULT_MARKDOWN = `# Welcome to MarkPDF

This is a simple, secure markdown to PDF converter.

## Features
- **Real-time Preview**: Type on the left, see changes on the right.
- **Privacy First**: All processing happens in your browser.
- **Print Ready**: Just click export to save as PDF.

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

> "Simplicity is the ultimate sophistication."
`;

export default function Home() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('markpdf-content');
    if (saved) {
      setMarkdown(saved);
    }
  }, []);

  // Save to local storage on change
  const handleChange = (value: string) => {
    setMarkdown(value);
    localStorage.setItem('markpdf-content', value);
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950">
      <Header />

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 print:hidden shrink-0">
        <button
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'editor'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-zinc-950 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
            }`}
          onClick={() => setActiveTab('editor')}
        >
          <Edit2 size={16} />
          Editor
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'preview'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-zinc-950 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
            }`}
          onClick={() => setActiveTab('preview')}
        >
          <Eye size={16} />
          Preview
        </button>
      </div>

      <main className="flex-1 overflow-hidden flex relative">
        {/* Editor Pane */}
        <div className={`w-full md:w-1/2 h-full border-r border-gray-200 dark:border-zinc-800 ${activeTab === 'editor' ? 'block' : 'hidden md:block'
          } print:hidden`}>
          <Editor value={markdown} onChange={handleChange} />
        </div>

        {/* Preview Pane */}
        <div className={`w-full md:w-1/2 h-full bg-gray-100 dark:bg-zinc-900 overflow-y-auto ${activeTab === 'preview' ? 'block' : 'hidden md:block'
          } print:!block print:!w-full print:!h-auto print:!overflow-visible`}>
          <Preview markdown={markdown} />
        </div>
      </main>
    </div>
  );
}
