import type { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return <section className="p-5 w-full h-full">{children}</section>;
};
