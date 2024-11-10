import React from "react";
import {
    Select as SelectComponent,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "./ui/select";
import { GroupedSelectOption, SelectOption } from "@/models/SelectOption";

type SelectProps<T> = {
    value?: T;
    onChange: (value: T) => void;
    className?: string;
    placeholder?: string;
    options: (GroupedSelectOption<T> | SelectOption<T>)[];
};


const Select = <T extends {}>(props: SelectProps<T>) => {
    const { options, onChange, className, placeholder } = props;
    return (
        <SelectComponent onValueChange={(value) => onChange(value as unknown as T)}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder ?? "Select an option"} />
            </SelectTrigger>
            <SelectContent className="bg-zinc-600">
                {
                    options.map((option) => {
                        if ("options" in option && Array.isArray(option.options)) {
                            const group = option;
                            return <SelectGroup key={group.label}>
                                <SelectLabel className="font-bold">{group.label}</SelectLabel>
                                {group.options.map((option) => (
                                    <SelectItem
                                        className="ml-2"
                                        key={String(option.value)}
                                        value={String(option.value)}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>;
                        } else {
                            const selectOption = option as SelectOption<T>;
                            return <SelectItem
                                key={String(selectOption.value)}
                                value={String(selectOption.value)}
                            >
                                {selectOption.label}
                            </SelectItem>;
                        }
                    })
                }
            </SelectContent>
        </SelectComponent>
    );
};

export default Select;
