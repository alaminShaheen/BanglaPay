"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Compensation } from "@/models/Compensation";


export const columns: ColumnDef<Compensation>[] = [
    {
        accessorKey: "company",
        header: () => <div className="text-center">Company</div>
    },
    {
        accessorKey: "jobTitle",
        header: () => <div className="text-center">Title</div>
    },
    {
        accessorKey: "baseSalary",
        header: () => <div className="text-center">Salary</div>
    }
];
