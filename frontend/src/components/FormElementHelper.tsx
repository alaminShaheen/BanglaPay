import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

type FormElementHelperProps = {
    instructions: string;
}

const FormElementHelper = (props: FormElementHelperProps) => {
    const { instructions } = props;
    return (
        <Popover>
            <PopoverTrigger><Info /></PopoverTrigger>
            <PopoverContent>{instructions}</PopoverContent>
        </Popover>
    );
};

export default FormElementHelper;
