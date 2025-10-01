import type { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return <section className="w-full h-full">{children}</section>;
};
