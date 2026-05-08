import { Download, FileText } from 'lucide-react';
import { asset } from '../lib/asset';

export default function ResumePage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-primary mb-8">
        Resume
      </h1>

      {/* Download card */}
      <div className="bg-gradient-to-br from-accent to-blue-700 rounded-xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-white">
            <FileText className="w-12 h-12 shrink-0" strokeWidth={1.5} />
            <div>
              <h2 className="text-2xl font-bold mb-1">Yuxiang (Ryan) Jiang</h2>
              <p className="text-white/80">Software Engineer · Cornell Tech M.S. 2026</p>
            </div>
          </div>
          <a
            href={asset('/Ryan_Resume.pdf')}
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-accent font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
        </div>
      </div>

      {/* PDF viewer */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-primary">Preview</h3>
        </div>
        <div className="p-4">
          <iframe
            src={asset('/Ryan_Resume.pdf')}
            title="Resume Preview"
            className="w-full border-0 rounded-lg"
            style={{ height: '800px' }}
          />
        </div>
      </div>

      {/* Fallback */}
      <p className="text-center text-muted text-sm mt-6">
        Can't view the PDF?{' '}
        <a
          href={asset('/Ryan_Resume.pdf')}
          download
          className="text-accent underline font-medium hover:text-accent/80 transition-colors"
        >
          Click here to download directly
        </a>
      </p>
    </div>
  );
}
