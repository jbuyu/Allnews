import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import type { RouterContext } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <div className="flex flex-col min-h-screen ">
        <Header />
        <main className="container mx-auto grow p-4">
          <Outlet />
        </main>
      </div>
      <Toaster />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
});
