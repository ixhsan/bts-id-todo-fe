import { ReactNode } from "react";

// lazy loading page helper
export const lazyRoute =
  <T = ReactNode>(importFn: () => Promise<T>, componentName: keyof T) =>
  async () => {
    const module = await importFn();
    return { Component: module[componentName] };
  };
