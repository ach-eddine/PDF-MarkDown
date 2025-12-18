import React from 'react';
import { Download } from 'lucide-react';

export function Header() {
    const handleDownload = async () => {
        const element = document.getElementById('pdf-content');
        if (!element) return;

        try {
            // @ts-ignore - html2pdf doesn't have perfect types
            const html2pdf = (await import('html2pdf.js')).default;

            const opt = {
                margin: 0,
                filename: 'markpdf-document.pdf',
                image: { type: 'jpeg' as const, quality: 0.98 },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    // Remove scrollY setting as it can conflict with onclone
                    onclone: (doc: Document) => {
                        const el = doc.getElementById('pdf-content');
                        if (el) {
                            // Strictly force height to auto to fit content exactly
                            el.style.setProperty('min-height', '0', 'important');
                            el.style.setProperty('height', 'fit-content', 'important');
                            el.style.setProperty('margin', '0', 'important');
                            el.style.setProperty('padding', '20mm', 'important'); // Enforce standard padding
                            el.style.setProperty('box-shadow', 'none', 'important');
                            el.style.setProperty('overflow', 'visible', 'important');

                            // Find and reset the inner prose container's margins
                            const prose = el.querySelector('.prose') as HTMLElement;
                            if (prose) {
                                prose.style.setProperty('margin-top', '0', 'important');
                                prose.style.setProperty('margin-bottom', '0', 'important');
                            }
                        }
                    }
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <header className="h-14 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-4 print:hidden shrink-0">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    MarkPDF
                </h1>
            </div>
            <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
            >
                <Download size={16} />
                Export PDF
            </button>
        </header>
    );
}
