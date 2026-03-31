import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
      <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        {children}
      </div>
    </main>
  );
}
