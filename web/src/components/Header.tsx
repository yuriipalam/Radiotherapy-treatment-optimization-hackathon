import { Link } from "react-router-dom";
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
  return (
    <>
      <div className="container fixed z-50 bg-white shadow flex justify-between items-center gap-2 space-x-4 lg:space-x-6 py-2 px-4">
        <div className="flex gap-4 items-center">
          <img width={100} src="/siemens-logo.png" alt="Logo" />
          <nav className="flex gap-4">
            <Link
              to="/patients"
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
            <Link
              to="/search"
              className="text-sm text-slate-800 font-medium transition-colors hover:text-primary"
            >
              Search
            </Link>
          </nav>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatar.svg" alt="@shadcn" />
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
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border-b" />
    </>
  );
}
