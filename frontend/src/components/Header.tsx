import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { MenuIcon, NewspaperIcon } from "lucide-react";

import { userQueryOptions } from "@/lib/api";

// import { userQueryOptions } from "@/lib/api";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useQuery(userQueryOptions());
  return (
    <header className="sticky top-0 z-50 rounded-md   justify-center  backdrop-blur supports-[backdrop-filter]:bg-green-200 mx-40 mt-1">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-xl font-bold flex items-center space-x-2"
          >
            <img src="/logo.svg" alt="" srcset="" className="h-11" />
            <div>Allnews</div>
          </Link>
          <nav className="hidden items-center space-x-4 md:flex">
            <Link
              to="/"
              search={{ sortBy: "recent", order: "desc" }}
              className="hover:underline"
            >
              new
            </Link>
            <Link
              className="hover:underline"
              to="/"
              search={{ sortBy: "points", order: "desc" }}
            >
              top
            </Link>
          </nav>
        </div>
        <div className="hidden items-center space-x-4 md:flex">
          {user ? (
            <>
              <span>{user}</span>
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
              >
                <a href="api/auth/logout">Log out</a>
              </Button>
            </>
          ) : (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
            >
              <Link to="/login">Log in</Link>
            </Button>
          )}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="secondary" size="icon" className="md:hidden">
              <MenuIcon className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="mb-2">
            <SheetHeader>
              <SheetTitle>BetterNews</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 px-4">
              <Link
                onClick={() => setIsOpen(false)}
                className="hover:underline"
                to="/"
                search={{ sortBy: "recent", order: "desc" }}
              >
                new
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="hover:underline"
                to="/"
                search={{ sortBy: "points", order: "desc" }}
              >
                top
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="hover:underline"
                to="/submit"
              >
                submit
              </Link>
              {user ? (
                <>
                  <span>user: {user}</span>
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
                  >
                    <a href="api/auth/logout">Log out</a>
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                  className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
                >
                  <Link onClick={() => setIsOpen(false)} to="/login">
                    Log in
                  </Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
