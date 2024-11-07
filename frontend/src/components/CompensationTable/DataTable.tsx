"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/CompensationTable/DataTablePagination";
import { Compensation } from "@/models/Compensation";
import CompensationDetails from "@/components/CompensationTable/CompensationDetails";

interface DataTableProps<TValue> {
    columns: ColumnDef<Compensation, TValue>[];
    data: Compensation[];
}

export function DataTable<TValue>(props: DataTableProps<TValue>) {
    const { columns, data } = props;
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        },
        getPaginationRowModel: getPaginationRowModel()
    });

    const [compensationExpanded, setCompensationExpanded] = useState(new Set<number>());

    return (
        <div>
            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="font-bold text-primary">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, rowIndex) => {
                                return (
                                    <Collapsible
                                        key={row.id}
                                        asChild
                                        open={compensationExpanded.has(rowIndex)}
                                        onOpenChange={(isOpen) => {
                                            setCompensationExpanded(prev => {
                                                if (isOpen) {
                                                    prev.add(rowIndex);
                                                } else {
                                                    prev.delete(rowIndex);
                                                }
                                                return new Set(prev);
                                            });
                                        }}>
                                        <>
                                            <CollapsibleTrigger asChild>
                                                <TableRow
                                                    data-state={row.getIsSelected() && "selected"}
                                                    className={cn("", {
                                                        "border-border": !compensationExpanded.has(rowIndex),
                                                        "border-0": compensationExpanded.has(rowIndex)
                                                    })}
                                                >
                                                    {row.getVisibleCells().map((cell) => {
                                                        return (
                                                            <TableCell key={cell.id} className="p-4 text-center">
                                                                {
                                                                    cell.column.id === "id" ? (
                                                                        compensationExpanded.has(rowIndex) ?
                                                                            <ChevronUp
                                                                                className="text-primary cursor-pointer"
                                                                                size={20} />
                                                                            :
                                                                            <ChevronDown
                                                                                className="text-primary cursor-pointer"
                                                                                size={20} />
                                                                    ) : flexRender(cell.column.columnDef.cell, cell.getContext())
                                                                }
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="w-full" asChild>
                                                <TableRow data-state={row.getIsSelected() && "selected"}
                                                          className="hover:bg-secondary!">
                                                    <TableCell className="p-4 text-center w-full border-0" colSpan={columns.length}>
                                                        <CompensationDetails compensation={row.original} />
                                                    </TableCell>
                                                </TableRow>
                                            </CollapsibleContent>
                                        </>
                                    </Collapsible>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
