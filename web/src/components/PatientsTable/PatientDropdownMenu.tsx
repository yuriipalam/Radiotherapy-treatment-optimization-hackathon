import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Calendar } from "lucide-react";
import { EditPatientDataPopup } from "@/components/PatientsTable/EditPatientDataPopup.tsx";

export function PatientDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mt-2.5" asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions: </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditPatientDataPopup />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          Copy patient TAJ
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          Show calendar <Calendar className="h-4 ml-1"></Calendar>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
