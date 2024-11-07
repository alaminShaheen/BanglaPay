import React, { useCallback } from "react";
import { Compensation } from "@/models/Compensation";
import { Separator } from "@/components/ui/separator";
import { Briefcase, CalendarDays, Factory, Gift, GraduationCap, Laptop, User } from "lucide-react";
import { formatText } from "@/lib/utils";
import { BsGenderAmbiguous } from "react-icons/bs";

type CompensationDetailsProps = {
    compensation: Compensation;
}

const CompensationDetails = (props: CompensationDetailsProps) => {
    const { compensation } = props;

    const calculateTotalCompensation = useCallback((base: number, annualBonus?: number, signOnBonus?: number) => {
        return Number(base) + Number(annualBonus || 0) + Number(signOnBonus || 0);
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-stretch">
                <div
                    className="flex shrink-0 justify-center items-center gap-4 w-full md:w-[150px] pb-2 md:pb-0 md:pr-2 border-b md:border-b-0 md:border-r dark:border-white border-gray-300">
                    <div>
                        <div className="font-bold text-sm">{compensation.company}</div>
                        <div className="text-xs">{compensation.officeCity}</div>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-stretch gap-4">
                    <div className="text-lg font-bold text-left">
                        {compensation.jobTitle}
                    </div>
                    <div className="flex flex-col gap-2 items-center md:items-stretch">
                            <span className="inline-flex items-center text-sm gap-2">
                                <CalendarDays size={14} />
                                {compensation.yearOfCompensation}
                            </span>
                        <span className="inline-flex items-center text-sm gap-2">
                                <User size={14} />
                            {formatText(compensation.seniority)}
                            </span>
                        <span className="inline-flex items-center text-sm gap-2">
                                <Briefcase size={14} />
                            {compensation.yearsOfExperience} {compensation.yearOfCompensation === 1 ? "Year" : "Years"} of experience
                            </span>
                        <span className="inline-flex items-center text-sm gap-2">
                                <Factory size={14} />
                            {compensation.jobFocus}
                            </span>
                        <span className="inline-flex items-center text-sm gap-2">
                                <Laptop size={14} />
                            {compensation.arrangement}
                            </span>
                        <span className="inline-flex items-center text-sm gap-2 text-left">
                                <Gift size={14} className="size-3.5 shrink-0" />
                            {compensation.perks || "N/A"}
                            </span>

                        <span className="font-bold text-left text-lg my-2">Other</span>

                        <span className="inline-flex items-center text-sm gap-2 text-left">
                                <GraduationCap size={14} />
                            {compensation.highestEducation}
                            </span>

                        <span className="inline-flex items-center text-sm gap-2 text-left">
                                <BsGenderAmbiguous size={14} />
                            {compensation.gender || "N/A"}
                            </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-4 mx-auto md:mx-4 shrink-0">
                <div className="flex gap-4">
                    <div className="flex flex-col text-left font-bold">
                        <span>Base Salary:</span>
                        <span>Annual Bonus:</span>
                        <span>Sign-on Bonus:</span>
                    </div>
                    <div className="flex flex-col">
                            <span className="text-left">
                                {"\u09F3"}{compensation.baseSalary}
                            </span>
                        <span className="text-left">{"\u09F3"}{compensation.annualBonus || 0}</span>
                        <span className="text-left">{"\u09F3"}{compensation.signOnBonus || 0}</span>
                    </div>
                </div>
                <Separator className="my-2 h-0.5 dark:bg-white bg-black" />
                <div className="flex gap-4 w-full justify-between">
                    <div className="flex flex-col text-left font-bold">
                        <span>Total:</span>
                    </div>
                    <div className="flex flex-col text-right">
                            <span>
                                {"\u09F3"}
                                {calculateTotalCompensation(compensation.baseSalary, compensation.annualBonus, compensation.signOnBonus)}
                            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompensationDetails;
