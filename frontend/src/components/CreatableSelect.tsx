"use client";

import { Loader2Icon, XIcon } from "lucide-react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import React, { MouseEvent, useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SelectOption } from "@/models/SelectOption";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import AlertModal from "@/components/AlertModal";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

type CreatableSelectProps<T> = {
    options: SelectOption<T>[];
    value: T;
    onOptionSelect: (value: T) => void;
    className?: string;
    onCreate: (query: string) => Promise<void>;
}

const matches = (str: string, query: string, exact: boolean = false) => {
    return exact ? str.toLowerCase() === query.toLowerCase() : str.toLowerCase().includes(query.toLowerCase());
};


const CreatableSelect = <T extends {}>(props: CreatableSelectProps<T>) => {
    const { options, onOptionSelect, value, className, onCreate } = props;
    const { handleErrors } = useErrorHandler();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption<T> | undefined>(() => options.find((option) => option.value === value));
    const [searchQuery, setSearchQuery] = useState("");
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

    const toggleDropdown = useCallback(() => {
        setOpen(prev => !prev);
    }, []);

    const onQueryChange = useCallback((newQuery: string) => {
        setSearchQuery(newQuery);
    }, []);

    const onCancelCreateOption = useCallback(async (event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        setSearchQuery("");
    }, []);

    const onOptionClick = useCallback((option: SelectOption<T>) => {
        onOptionSelect(option.value);
        setSelectedOption(option);
        setOpen(false);
    }, [onOptionSelect]);

    const onCreateOption = useCallback(async () => {
        try {
            setLoading(true);
            const newOption: SelectOption<T> = {
                value: searchQuery as unknown as T,
                label: searchQuery
            };
            await onCreate(searchQuery);
            onOptionClick(newOption);
        } catch (error) {
            handleErrors(error);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, handleErrors, onOptionClick]);

    const onCloseModal = useCallback(() => {
        setConfirmationModalOpen(prev => !prev);
    }, []);

    return (
        <AlertModal
            modalOpen={confirmationModalOpen}
            onClose={onCloseModal}
            alertTitle={`Create a new company "${searchQuery}"?`}
            alertDescription={`This will create a new entry for a company named "${searchQuery}"`}
            onConfirm={onCreateOption}
        >
            <Popover
                open={open}
                onOpenChange={toggleDropdown}
            >
                <PopoverTrigger asChild className={className}>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                        ) : (
                            selectedOption?.value ? String(selectedOption?.label) : "Select option..."
                        )}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0 min-w-[--radix-popover-trigger-width] max-h-[calc(var(--radix-popover-content-available-height)-2rem)] overflow-auto">
                    <Command>
                        <CommandInput
                            value={searchQuery}
                            onValueChange={onQueryChange}
                            placeholder="Search option..."
                            className="h-9"
                        />
                        <CommandEmpty>No companies found. Type to create a new one.</CommandEmpty>
                        <CommandGroup>
                            <CommandList>
                                {searchQuery &&
                                    !options.some((option) => matches(option.label, searchQuery, true)) && (
                                        <CommandItem
                                            key={searchQuery}
                                            value={searchQuery}
                                        >
                                            <AlertDialogTrigger className="w-full text-left">
                                                Create "{searchQuery}"
                                            </AlertDialogTrigger>
                                            <span
                                                className="ml-auto h-4 w-4 cursor-pointer block"
                                                onClick={onCancelCreateOption}>
                                                <XIcon />
                                            </span>
                                        </CommandItem>
                                    )}

                                {options.map((option) => (
                                    <CommandItem
                                        key={String(option.value)}
                                        value={String(option.value)}
                                        onSelect={() => onOptionClick(option)}
                                    >
                                        {option.label}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                selectedOption?.value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </AlertModal>
    );
};

export default CreatableSelect;
