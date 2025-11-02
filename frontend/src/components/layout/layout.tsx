import type { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen grid place-items-center bg-gray-50">
    <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow space-y-4">
      {children}
    </div>
  </div>
);
