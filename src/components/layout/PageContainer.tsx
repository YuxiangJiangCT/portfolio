import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="lg:ml-60 min-h-screen pt-14 lg:pt-0">
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        {children}
      </div>
    </main>
  );
}
