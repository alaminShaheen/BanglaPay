"use client"

import React, { useCallback } from "react";

import { Protected } from "@/components/Protected";
import { DataTable } from "@/components/CompensationTable/data-table";
import { columns } from "@/components/CompensationTable/columns";
import { Input } from "@/components/ui/input";
import LevelsDropdown from "@/components/CompensationTable/levels-dropdown";
import YoeDropdown from "@/components/CompensationTable/yoe-dropdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/Routes";
import { Plus, Search } from "lucide-react";

const Salaries = () => {

    const onApply = useCallback(async (from: number, to: number) => {

    }, []);


    return (
        <div className="container mx-auto p-4 my-10">
            <div className="flex flex-col md:flex-row mx-auto gap-4 items-center justify-center">
                <span className="relative w-[250px]">
                    <Search className="absolute top-1.5 left-2" size={14} />
                    <Input placeholder="Search a company" className="dark:bg-zinc-800 h-7 pl-7" />
                </span>
                <div className="flex gap-4">
                    <LevelsDropdown/>
                    <YoeDropdown onApply={onApply}/>
                </div>
                <Button className="font-bold h-7 text-xs">
                    <Link href={ROUTES.ADD} className="flex items-center gap-2">
                        <Plus />
                        Add Compensation
                    </Link>
                </Button>
            </div>

            <div className="bg-background rounded-md my-5">

                <DataTable columns={columns} data={[]} />
            </div>
        </div>
    );
};

export default Protected(Salaries);
