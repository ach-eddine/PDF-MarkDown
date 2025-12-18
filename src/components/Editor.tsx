import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  return (
    <div className="w-full h-full flex flex-col">
        <textarea
        className="flex-1 w-full h-full p-4 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 font-mono resize-none focus:outline-none text-sm leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="# Start typing your markdown here..."
        spellCheck={false}
        />
    </div>
  );
}
