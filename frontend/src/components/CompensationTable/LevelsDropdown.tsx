"use client";

import React, { useCallback } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";

type LevelsDropdownProps = {
    onItemToggle: (itemIndex: number) => void;
    selectedItemIndices: Set<number>;
    levels: string[],
}

const LevelsDropdown = (props: LevelsDropdownProps) => {
    const { onItemToggle, selectedItemIndices, levels } = props;
    // const [indicesSelected, setIndicesSelected] = useState<number[]>([]);

    const onItemSelected = useCallback((index: number) => {
        onItemToggle(index);
    }, [onItemToggle]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-md font-bold h-7 text-xs">
                    Filter by Levels <ChevronsUpDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2">
                <DropdownMenuGroup>
                    {
                        levels.map((item, index) => {
                            return (
                                <DropdownMenuItem key={item} onClick={(event) => {
                                    event.preventDefault();
                                    onItemSelected(index);
                                }}>
                                    <span className="inline-flex items-center gap-2 text-sm">
                                        {selectedItemIndices.has(index) ?
                                            <Check size={14} className="text-green-600" /> :
                                            <X className="text-destructive" size={14} />}
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
