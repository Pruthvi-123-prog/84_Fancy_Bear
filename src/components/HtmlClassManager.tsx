'use client';

import { useEffect } from 'react';

export default function HtmlClassManager({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure consistent className after hydration
    if (typeof document !== 'undefined') {
      document.documentElement.className = 'scroll-smooth';
    }
  }, []);

  return <>{children}</>;
}
