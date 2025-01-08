// src/components/layouts/BaseLayout.tsx

import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type BaseLayoutProps = {
  children?: ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return <div>{children || <Outlet />}</div>;
}
