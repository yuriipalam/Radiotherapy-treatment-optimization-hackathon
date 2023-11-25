import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.tsx";
import { Command, CommandInput } from "@/components/ui/command.tsx";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { PatientDropdownMenu } from "@/components/Patients/PatientDropdownMenu.tsx";
import { AddPatientDialog } from "@/components/Patients/AddPatientDialog.tsx";
import usePatientsStore from "@/store/store.tsx";

export const PatientsTable = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  const patients = usePatientsStore((state) => state.patients);

  return (
    <div className="w-4/5 mx-auto">
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
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead className="w-[100px]">TAJ</TableHead>
            <TableHead>Full name</TableHead>
            <TableHead>Birth date</TableHead>
            <TableHead>Weight (kg)</TableHead>
            <TableHead>Height (cm)</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Inpatient</TableHead>
            <TableHead>Sessions left</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {patients.map((patient) => (
              <TableRow>
                <TableCell className="font-medium" key={patient.tajNumber}>
                  <Checkbox className="" />
                </TableCell>
                <TableCell>{patient.tajNumber}</TableCell>
                <TableCell>{patient.fullname}</TableCell>
                <TableCell>{patient.birthDate}</TableCell>
                <TableCell>{patient.weight}</TableCell>
                <TableCell>{patient.height}</TableCell>
                <TableCell>{patient.region}</TableCell>
                <TableCell>{patient.inpatient ? "Yes" : "No"}</TableCell>
                <TableCell>{patient.sessionsLeft}</TableCell>
                <PatientDropdownMenu patient={patient} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
