import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CopyIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Calendar, CheckCircle } from "lucide-react";
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
          <CopyIcon className="h-4 ml-3"></CopyIcon>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          Show calendar <Calendar className="h-4 ml-1"></Calendar>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          Mark as finished <CheckCircle className="h-4 ml-1"></CheckCircle>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
