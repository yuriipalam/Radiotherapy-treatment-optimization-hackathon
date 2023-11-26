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
import { EditPatientDataPopup } from "@/components/Patients/EditPatientDataPopup.tsx";
import { useToast } from "@/components/ui/use-toast";

import usePatientsStore from "@/store/patients/patientsStore.ts";
import {Patient} from "@/store/patients/patientType.ts";

interface Props {
  patient: Patient;
}

export function PatientDropdownMenu(props: Props) {
  const { toast } = useToast();
  const markAsFinished = usePatientsStore((state) => state.markAsFinished);

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
        <EditPatientDataPopup patient={props.patient} />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(props.patient.tajNumber);
            toast({
              description: "Copied to clipboard.",
            });
          }}
        >
          Copy patient TAJ
          <CopyIcon className="h-4 ml-2"></CopyIcon>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          Show calendar <Calendar className="h-4 ml-1"></Calendar>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => {
          markAsFinished(props.patient);
        }}>
          Mark as finished <CheckCircle className="h-4 ml-1"></CheckCircle>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
