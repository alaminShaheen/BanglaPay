import React, { useCallback, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";

const LevelsDropdown = () => {
    const [indicesSelected, setIndicesSelected] = useState<number[]>([]);

    const onItemToggle = useCallback((index: number) => {
        setIndicesSelected(prev => {
            if (prev.includes(index)) {
                return prev.filter(prevIndex => prevIndex !== index);
            } else {
                return [...prev, index];
            }
        })
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" className="rounded-md font-bold h-7 text-xs">Filter by Levels <ChevronsUpDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2">
                <DropdownMenuGroup>
                    {
                        [
                            "Intern (~0-2 YOE)",
                            "Mid Level (2-5 YOE)",
                            "Senior (5-10 YOE)",
                            "Senior Plus (10+ YOE)",
                            "Executive (VP, C-level)"
                        ].map((item, index) => {
                            return (
                                <DropdownMenuItem onClick={(event) => {
                                    event.preventDefault();
                                    onItemToggle(index)
                                }}>
                                    <span className="inline-flex items-center gap-2 text-sm">
                                        {indicesSelected.includes(index) ? <Check size={14} className="text-green-600" /> :  <X className="text-destructive" size={14} />}
                                        {item}
                                    </span>
                                </DropdownMenuItem>
                            );
                        })

                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LevelsDropdown;
