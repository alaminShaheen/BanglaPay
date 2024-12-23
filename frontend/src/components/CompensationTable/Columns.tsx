"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Compensation } from "@/models/Compensation";
import { abbreviateNumber } from "@/lib/utils";


export const Columns: ColumnDef<Compensation>[] = [
    {
        accessorKey: "id",
        header: () => ""
    },
    {
        accessorKey: "company",
        header: ({ column }) => <div className="text-center flex flex-col py-4 gap-2">
            <span className="text-sm md:text-base">
                COMPANY
            </span>
            <span className="text-xs">
                Location | Compensation Year
            </span>
        </div>,
        cell: ({ row }) => {
            return (
                <div className="inline-flex flex-col gap-1">
                    <span className="font-bold">{row.original.company}</span>
                    <span className="text-xs">
                        {row.original.officeCity} | {row.original.yearOfCompensation}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "jobTitle",
        header: () => <div className="text-center flex flex-col py-4 gap-2">
            <span className="text-sm md:text-base">
                TITLE
            </span>
            <span className="text-xs">
                Tag | YOE
            </span>
        </div>,
        cell: ({ row }) => {
            return (
                <div className="inline-flex flex-col gap-1">
                    <span className="font-bold">{row.original.jobTitle}</span>
                    <span className="text-xs">
                        {row.original.jobFocus} | {row.original.yearsOfExperience}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "baseSalary",
        header: ({ column }) => {
            return (
                <div className="text-center flex items-center justify-center gap-2">
                    <div className="flex flex-col py-4 gap-2">
                        <span className="text-sm md:text-base">
                            TOTAL COMPENSATION
                        </span>
                        <span className="text-xs">
                            Annual Salary | Annual Bonus | Sign-on Bonus
                        </span>
                    </div>
                    <Button variant="ghost" className="px-1"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        <ArrowUpDown size={8} />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const amount = (row.original.baseSalary * 12) + (row.original.annualBonus || 0) + (row.original.signOnBonus || 0);

            const formatted = new Intl.NumberFormat("en-US", {}).format(amount);

            return <div className="text-center inline-flex flex-col gap-1">
                <span className="font-bold">
                    {"\u09F3"}{formatted}
                </span>
                <span className="text-xs">
                    {abbreviateNumber((row.original.baseSalary * 12))} | {row.original.annualBonus ? abbreviateNumber(row.original.annualBonus) : "-"} | {row.original.signOnBonus ? abbreviateNumber(row.original.signOnBonus) : "-"}
                </span>
            </div>;
        }
    }
];
