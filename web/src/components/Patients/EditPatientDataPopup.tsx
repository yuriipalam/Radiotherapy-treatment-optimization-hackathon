import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Pencil2Icon } from "@radix-ui/react-icons";

import { Patient } from "@/store/patients.ts";
import usePatientsStore from "@/store/store.tsx";

interface Props {
  patient: Patient;
}

export function EditPatientDataPopup(props: Props) {
  const changePatient = usePatientsStore((state) => state.changePatient);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <div className="flex mr-auto -ml-2 justify-start items-center gap-3">
            Edit data <Pencil2Icon></Pencil2Icon>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="Region">Region</Label>
              <Input
                id="Region"
                onChange={(event) => {
                  const newPatient = props.patient;
                  newPatient.region = event.currentTarget.value;
                  changePatient(newPatient);
                }}
                defaultValue={props.patient.region}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                onChange={(event) => {
                  const newPatient = props.patient;
                  newPatient.weight = Number(event.currentTarget.value);
                  changePatient(newPatient);
                }}
                defaultValue={props.patient.weight}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="Height">Height (cm)</Label>
              <Input
                id="Height"
                onChange={(event) => {
                  const newPatient = props.patient;
                  newPatient.height = Number(event.currentTarget.value);
                  changePatient(newPatient);
                }}
                defaultValue={props.patient.height}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="grid-cols-1" htmlFor="airplane-mode">
                Inpatient
              </Label>
              <Switch
                id="airplane-mode"
                onCheckedChange={() => {
                  const newPatient = props.patient;
                  newPatient.inpatient = !newPatient.inpatient;
                  changePatient(newPatient);
                }}
                checked={props.patient.inpatient}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
