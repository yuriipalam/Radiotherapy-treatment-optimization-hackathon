import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Pencil2Icon } from "@radix-ui/react-icons";

export function EditPatientDataPopup() {
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
              <Label htmlFor="Organ">Organ</Label>
              <Input
                id="Organ"
                defaultValue="Brain"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Weight</Label>
              <Input
                id="width"
                defaultValue="65 kg"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="Height">Height</Label>
              <Input
                id="Height"
                defaultValue="175cm"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Test</Label>
              <Input
                onInput={(event) => console.log(event.currentTarget.value)}
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
