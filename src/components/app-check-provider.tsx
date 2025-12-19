'use client';

// Import to initialize firebase and app check
import '@/lib/firebase'; 

export default function AppCheckProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
