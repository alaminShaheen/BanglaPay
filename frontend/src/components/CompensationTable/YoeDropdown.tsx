import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type YoeDropdownProps = {
    onApply: (from: number, to: number) => Promise<void>;
};

function isNumber(value: string) {
    return !isNaN(Number(value));
}

const YoeDropdown = (props: YoeDropdownProps) => {
    const { onApply } = props;
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const onApplyClick = useCallback(() => {
        void onApply(Number(from), Number(to));
    }, [onApply, from, to]);


    const onChangeFrom = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (isNumber(event.target.value)) {
            setFrom(event.target.value);
        }
        return;
    }, [isNumber]);

    const onChangeTo = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (isNumber(event.target.value)) {
            setTo(event.target.value);
        }
        return;
    }, [isNumber]);

    useEffect(() => {
        return () => {
            setFrom("");
            setTo("");
        };
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" className="rounded-md font-bold h-7 text-xs">Filter by YOE <ChevronsUpDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 gap-4 flex flex-col p-4 text-xs">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="from" className="text-xs">From</Label>
                    <Input id="from" className="h-6" value={from} onChange={onChangeFrom} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-xs" htmlFor="to">To</Label>
                    <Input id="to" className="h-6" value={to} onChange={onChangeTo} />
                </div>

                <Button variant="default" className="h-6 font-bold" onClick={onApplyClick}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default YoeDropdown;
