import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Checkbox } from "@/components/ui/checkbox";

export function AddPatientDialog() {
  return (
    <Dialog>
      <DialogTrigger className="h-12 shadow-2xl" asChild>
        <Button variant="outline">Add patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
              defaultValue="980321560"
              className="col-span-1 h-8"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="fractions">Number of fractions:</Label>
            <Input
              id="fractions"
              type="number"
              defaultValue="10"
              className="col-span-1 h-8"
            />
          </div>
          <div className="grid grid-cols-2 mb-4 items-center gap-4">
            <Label htmlFor="region">Region of treatment:</Label>
            <Input
              id="region"
              type="text"
              defaultValue="Breast"
              className="col-span-1 h-8"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="inpatient" />
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
          <Button type="submit">Add patient</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
