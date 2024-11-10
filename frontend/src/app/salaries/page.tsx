"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/Routes";
import { Button } from "@/components/ui/button";
import { Columns } from "@/components/CompensationTable/Columns";
import YoeDropdown from "@/components/CompensationTable/YoeDropdown";
import { YoeFilter } from "@/models/YoeFilter";
import { Protected } from "@/components/Protected";
import { Seniority } from "@/models/enums/Seniority";
import { DataTable } from "@/components/CompensationTable/DataTable";
import LevelsDropdown from "@/components/CompensationTable/LevelsDropdown";
import { SelectOption } from "@/models/SelectOption";
import { useFetchCompensationsQuery } from "@/hooks/queries/useFetchCompensationsQuery";

const LEVELS: SelectOption<Seniority>[] = [
    { value: Seniority.INTERN, label: "Intern (~0-2 YOE)" },
    { value: Seniority.MID_LEVEL, label: "Mid Level (2-5 YOE)" },
    { value: Seniority.SENIOR, label: "Senior (5-10 YOE)" },
    { value: Seniority.SENIOR_PLUS, label: "Senior Plus (10+ YOE)" },
    { value: Seniority.EXECUTIVE, label: "Executive (VP, C-level)" }
];

const Salaries = () => {
    const [searchCompanyName, setSearchCompanyName] = useState("");
    const [yoeFilter, setYoeFilter] = useState<YoeFilter>();
    const [selectedLevelsIndex, setSelectedLevelsIndex] = useState<Set<number>>(new Set());

    const onApply = useCallback(async (from: number, to: number) => {
        setYoeFilter({ from, to });
    }, []);

    const onLevelsItemToggle = useCallback((index: number) => {
        setSelectedLevelsIndex(prev => {
            if (prev.has(index)) {
                prev.delete(index);
            } else {
                prev.add(index);
            }
            return new Set(prev);
        });
    }, []);

    const { data: compensations, isPending: fetchingCompensations } = useFetchCompensationsQuery({ enabled: true });

    const onSearchQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchCompanyName(event.target.value);
    }, []);

    const filteredCompensations = useMemo(() => {
        let newCompensations = compensations || [];
        if (searchCompanyName) {
            newCompensations = newCompensations?.filter(compensation => {
                return compensation.company.toLowerCase().includes(searchCompanyName.toLowerCase());
            }) || [];
        }

        if (yoeFilter) {
            newCompensations = newCompensations.filter(compensation => {
                return compensation.yearsOfExperience >= yoeFilter.from && compensation.yearsOfExperience <= yoeFilter.to;
            });
        }

        if (selectedLevelsIndex.size) {
            newCompensations = newCompensations.filter(compensation => {
                const index = LEVELS.findIndex(level => level.value === compensation.seniority);
                return selectedLevelsIndex.has(index);
            });
        }

        return newCompensations ?? [];
    }, [compensations, searchCompanyName, yoeFilter, selectedLevelsIndex]);

    return (
        <div className="container mx-auto p-4 my-10">
            <div className="flex flex-col md:flex-row mx-auto gap-4 items-center justify-center">
                <span className="relative w-[250px]">
                    <Search className="absolute top-1.5 left-2" size={14} />
                    <Input
                        placeholder="Search a company"
                        className="dark:bg-zinc-800 h-7 pl-7"
                        value={searchCompanyName}
                        onChange={onSearchQueryChange}
                    />
                </span>
                <div className="flex gap-4">
                    <LevelsDropdown
                        levels={LEVELS.map(level => level.label)}
                        selectedItemIndices={selectedLevelsIndex}
                        onItemToggle={onLevelsItemToggle}
                    />
                    <YoeDropdown onApply={onApply} />
                </div>
                <Button
                    className="font-bold h-7 text-xs"
                    variant="expandIcon"
                    Icon={Plus}
                    iconPlacement="left"
                    disabled={fetchingCompensations}
                >
                    <Link href={ROUTES.ADD} className="flex items-center gap-2">
                        Add Compensation
                    </Link>
                </Button>
            </div>

            <div className="rounded-md my-5">
                <DataTable columns={Columns} data={filteredCompensations} />
            </div>
        </div>
    );
};

export default Protected(Salaries);
