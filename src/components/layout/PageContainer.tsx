import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="lg:ml-[200px] min-h-screen pt-14 lg:pt-0">
      <div className="max-w-[860px] mx-auto px-6 sm:px-10 py-16 lg:py-24">
        {children}
      </div>
    </main>
  );
}
