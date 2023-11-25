import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import usePatientsStore from "@/store/store.tsx";
import { Patient } from "@/store/patients.ts";
import { useState } from "react";

export function AddPatientDialog() {
  const addPatient = usePatientsStore((state) => state.addPatient);

  const [inpatient, setInpatient] = useState(false);

  return (
    <Dialog>
      <DialogTrigger className="h-12 shadow-2xl" asChild>
        <Button variant="outline">Add patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(inpatient);
            const newPatient: Patient = {
              tajNumber: event.currentTarget.taj.value,
              fullname: event.currentTarget.fullname.value,
              birthDate: `${
                Math.floor(Math.random() * (2000 - 1950 + 1)) + 1950
              }-${String(Math.floor(Math.random() * 12) + 1).padStart(
                2,
                "0",
              )}-${String(Math.floor(Math.random() * 28) + 1).padStart(
                2,
                "0",
              )}`,
              weight: Math.floor(Math.random() * 100 + 50),
              height: Math.floor(Math.random() * 100 + 100),
              region: event.currentTarget.region.value,
              inpatient: inpatient,
              numberOfFractions: Number(event.currentTarget.fractions.value),
              sessionsLeft: Math.floor(Math.random() * (30 - 5 + 1)) + 5,
            };
            addPatient(newPatient);
          }}
        >
          <DialogHeader>
            <DialogTitle>Add new patient </DialogTitle>
            <DialogDescription>
              Fill out the TAJ and will automatically load the patient data.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="taj">TAJ:</Label>
              <Input
                id="taj"
                name="taj"
                defaultValue=""
                className="col-span-1 h-8"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="fullname">Full name:</Label>
              <Input
                id="fullname"
                name="fullname"
                defaultValue=""
                className="col-span-1 h-8"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="region">Region of treatment:</Label>
              <Input
                id="region"
                name="region"
                type="text"
                defaultValue=""
                className="col-span-1 h-8"
              />
            </div>
            <div className="grid grid-cols-2 mb-4 items-center gap-4">
              <Label htmlFor="fractions">Number of fractions:</Label>
              <Input
                id="fractions"
                name="fractions"
                type="number"
                defaultValue=""
                className="col-span-1 h-8"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inpatient"
                name="inpatient"
                onCheckedChange={() => {
                  setInpatient((prev) => !prev);
                }}
              />
              <label
                htmlFor="inpatient"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Inpatient treatment
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="Overweight" />
              <label
                htmlFor="Overweight"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Overweight
              </label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Add patient</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
