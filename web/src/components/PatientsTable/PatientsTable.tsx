import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.tsx";
import { Command, CommandInput } from "@/components/ui/command.tsx";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { PatientDropdownMenu } from "@/components/PatientsTable/PatientDropdownMenu.tsx";
import { AddPatientDialog } from "@/components/PatientsTable/AddPatientDialog.tsx";

export const PatientsTable = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className="w-4/5 mx-auto py-5">
      <div className="flex gap-5 items-center mb-3">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            onInput={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search for patients"
          />
        </Command>
        <AddPatientDialog />
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead className="w-[100px]">TAJ</TableHead>
            <TableHead>Full name</TableHead>
            <TableHead>Organ</TableHead>
            <TableHead>Birth date</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Height</TableHead>
            <TableHead className="text-right">Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium ">
              <Checkbox className="" />
            </TableCell>
            <TableCell>123456789</TableCell>
            <TableCell>Gabor Shabat</TableCell>
            <TableCell className="font-medium">Brain</TableCell>
            <TableCell>1962.04.01</TableCell>
            <TableCell>130 kg</TableCell>
            <TableCell>190 cm</TableCell>
            <TableCell className="text-right">Height</TableCell>
            <PatientDropdownMenu />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
