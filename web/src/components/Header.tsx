import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";

export default function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="fixed z-50 bg-white right-0 top-0 left-0 shadow">
      <div className="container flex justify-between items-center gap-2 space-x-4 lg:space-x-6 py-2 px-4">
        <div className="flex gap-4 items-center">
          <Link to="/">
            <img width={100} src="/siemens-logo.png" alt="Logo" />
          </Link>
          <nav className="flex gap-4">
            <Link
              to="/dashboard"
              className="text-sm text-slate-800 font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="text-sm text-slate-800 font-medium transition-colors hover:text-primary"
            >
              Patients
            </Link>
            <Link
              to="/appointments"
              className="text-sm text-slate-800 font-medium transition-colors hover:text-primary"
            >
              Appointments
            </Link>
            {/*<Link*/}
            {/*  to="/search"*/}
            {/*  className="text-sm text-slate-800 font-medium transition-colors hover:text-primary"*/}
            {/*>*/}
            {/*  Search*/}
            {/*</Link>*/}
          </nav>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage
                  src={isLoginPage ? "/avatar-placeholder.svg" : "/avatar.svg"}
                  alt="@shadcn"
                />
                <AvatarFallback>GH</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Gabor Horvat</p>
                <p className="text-xs leading-none text-muted-foreground">
                  gaborhorvat@gmail.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Link to="/login">
              <DropdownMenuItem className="cursor-pointer">
                Log out
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border-b" />
    </div>
  );
}
