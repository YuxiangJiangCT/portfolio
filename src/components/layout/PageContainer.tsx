import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        {children}
      </div>
    </main>
  );
}
