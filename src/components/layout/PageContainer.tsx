import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="lg:ml-[200px] min-h-screen pt-14 lg:pt-0">
      <div className="px-6 sm:px-10 lg:pr-16 py-10 lg:py-16">
        {children}
      </div>
    </main>
  );
}
