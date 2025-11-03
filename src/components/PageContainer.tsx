import type { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return <section>{children}</section>;
};
