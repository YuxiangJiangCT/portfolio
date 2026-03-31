import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="lg:ml-[240px] min-h-screen pt-14 lg:pt-0">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-20">
        {children}
      </div>
    </main>
  );
}
