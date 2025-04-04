import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col min-h-screen border-2 border-black">
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
