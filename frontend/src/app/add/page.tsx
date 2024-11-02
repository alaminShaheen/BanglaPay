"use client";

import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Select from "@/components/Select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/Routes";
import { Gender } from "@/models/enums/Gender";
import { Button } from "@/components/ui/button";
import { Company } from "@/models/Company";
import { Textarea } from "@/components/ui/textarea";
import { Protected } from "@/components/Protected";
import { Seniority } from "@/models/enums/Seniority";
import { SENIORITY } from "@/constants/selectOptions/SENIORITY";
import { EDUCATION } from "@/constants/selectOptions/EDUCATION";
import { addCompany } from "@/services/AddCompany";
import { OfferStatus } from "@/models/enums/OfferStatus";
import CreatableSelect from "@/components/CreatableSelect";
import { SelectOption } from "@/models/SelectOption";
import { getCompanies } from "@/services/GetCompanies";
import { ContractType } from "@/models/enums/ContractType";
import { CONTRACT_TYPE } from "@/constants/selectOptions/CONTRACT_TYPE";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { CompensationForm } from "@/models/forms/CompensationForm";
import { HighestEducation } from "@/models/enums/HighestEducation";
import { JOB_FAMILY_OPTIONS } from "@/constants/selectOptions/JOB_FAMILY";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Add = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control
    } = useForm<CompensationForm>();
    const [loading, setLoading] = useState(false);
    const { handleErrors } = useErrorHandler();
    const [companies, setCompanies] = useState<Company[]>([]);

    const onSubmit = useCallback((data: CompensationForm) => {
    }, []);

    const onAddCompany = useCallback(async (companyName: string) => {
        try {
            setLoading(true);
            const newCompanyOption = await addCompany({ name: companyName });
            setCompanies(prev => [...prev, newCompanyOption.data]);
        } catch (error) {
            console.log(error);
            handleErrors(new Error("An error occurred when creating a new company"));
        } finally {
            setLoading(false);
        }
    }, [handleErrors]);

    const fetchCompanies = useCallback(async () => {
        try {
            setLoading(true);
            const companyData = await getCompanies();
            setCompanies(companyData.data);
        } catch (error) {
            console.log(error);
            handleErrors(new Error("An error occurred when creating a new company"));
        } finally {
            setLoading(false);
        }
    }, [handleErrors]);

    useEffect(() => {
        void fetchCompanies();
    }, [fetchCompanies]);

    return (
        <div className="max-w-lg mx-auto border border-border rounded-md p-4 my-10 bg-background">
            <Button variant="link" className="p-0 text-primary">
                <Link href={ROUTES.SALARIES} className="flex items-center">
                    <ArrowBigLeft /> Back
                </Link>
            </Button>
            <p className="text-sm mt-2">Please fill out the form below to proceed.</p>
            <form className="flex flex-col gap-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-lg font-bold">Company details</h3>
                <div>
                    <Label htmlFor="company" className={cn({ "text-destructive": errors.company })}>Company</Label>
                    <Controller
                        render={({ field: { value, onChange } }) => {
                            return (
                                <CreatableSelect<string>
                                    onCreate={onAddCompany}
                                    value={value}
                                    onOptionSelect={onChange}
                                    options={companies.map(company => ({ label: company.name, value: company.name }))}
                                    className="mt-2"
                                />
                            );
                        }}
                        name="company"
                        rules={{ required: "This is required" }}
                        control={control}
                    />
                </div>

                <div>
                    <Label htmlFor="officeCity" className={cn({ "text-destructive": errors.officeCity })}>
                        Office City
                    </Label>
                    <Input
                        className={cn("border mt-2", {
                            "border-border": !errors.officeCity,
                            "border-destructive": errors.officeCity
                        })}
                        id="officeCity"
                        type="text"
                        {...register("officeCity", { required: "This is required" })} />
                    {errors.officeCity && (
                        <span className="text-xs text-destructive">{errors.officeCity.message}</span>
                    )}
                </div>

                <h3 className="text-lg font-bold">Position details</h3>

                <div>
                    <Label htmlFor="jobTitle" className={cn({ "text-destructive": errors.jobTitle })}>
                        Job Title
                    </Label>
                    <Input
                        className={cn("border mt-2", {
                            "border-border": !errors.jobTitle,
                            "border-destructive": errors.jobTitle
                        })}
                        id="jobTitle"
                        type="text"
                        {...register("jobTitle", { required: "This is required" })}
                    />
                    {errors.jobTitle && (
                        <span className="text-xs text-destructive">{errors.jobTitle.message}</span>
                    )}
                </div>

                <div>
                    <Label htmlFor="jobFocus" className={cn({ "text-destructive": errors.jobFocus })}>
                        Job Area/Focus
                    </Label>
                    <Controller
                        render={({ field: { value, onChange } }) => {
                            return (
                                <Select<string>
                                    value={value}
                                    onChange={onChange}
                                    options={JOB_FAMILY_OPTIONS}
                                    className="mt-2"
                                />
                            );
                        }}
                        name="jobFocus"
                        rules={{ required: "This is required" }}
                        control={control}
                    />
                    {errors.jobFocus && (
                        <span className="text-xs text-destructive">{errors.jobFocus.message}</span>
                    )}
                </div>

                <div>
                    <Label
                        htmlFor="yearsOfExperience"
                        className={cn({ "text-destructive": errors.yearsOfExperience })}
                    >
                        Years of Experience
                    </Label>
                    <Input
                        className={cn("border mt-2", {
                            "border-border": !errors.yearsOfExperience,
                            "border-destructive": errors.yearsOfExperience
                        })}
                        id="yearsOfExperience"
                        type="number"
                        {...register("yearsOfExperience", {
                            required: "This is required",
                            valueAsNumber: true,
                            min: { value: 0, message: "Years of experience should be a positive integer" }
                        })} />
                    {errors.yearsOfExperience && (
                        <span className="text-xs text-destructive">{errors.yearsOfExperience.message}</span>
                    )}
                </div>
                <div>
                    <Label
                        htmlFor="seniority"
                        className={cn({ "text-destructive": errors.seniority })}
                    >
                        Seniority
                    </Label>
                    <Controller
                        render={({ field: { value, onChange } }) => {
                            return (
                                <Select<Seniority>
                                    value={value}
                                    onChange={onChange}
                                    options={SENIORITY}
                                    className="mt-2"
                                />
                            );
                        }}
                        name="seniority"
                        rules={{ required: "This is required" }}
                        control={control}
                    />
                    {errors.seniority && (
                        <span className="text-xs text-destructive">{errors.seniority.message}</span>
                    )}
                </div>


                <div className="flex gap-4 items-center w-full justify-between">
                    <div className="w-1/2">
                        <Label
                            htmlFor="contractType"
                            className={cn({ "text-destructive": errors.contractType })}
                        >
                            Contract type
                        </Label>
                        <Controller
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <Select<ContractType>
                                        value={value}
                                        onChange={onChange}
                                        options={CONTRACT_TYPE}
                                        className="mt-2 w-full"
                                    />
                                );
                            }}
                            name="contractType"
                            rules={{ required: "This is required" }}
                            control={control}
                        />
                        {errors.contractType && (
                            <span className="text-xs text-destructive">{errors.contractType.message}</span>
                        )}
                    </div>
                    <div className="w-1/2">
                        <Label
                            htmlFor="yearOfCompensation"
                            className={cn({ "text-destructive": errors.yearOfCompensation })}
                        >
                            Year for when this data is valid for
                        </Label>
                        <Controller
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <Select<number>
                                        value={value}
                                        onChange={onChange}
                                        options={Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i)
                                            .map<SelectOption<number>>(year => ({
                                                label: String(year),
                                                value: year
                                            }))}
                                        className="mt-2 w-full"
                                    />
                                );
                            }}
                            name="yearOfCompensation"
                            rules={{ required: "This is required" }}
                            control={control}
                        />
                        {errors.yearOfCompensation && (
                            <span className="text-xs text-destructive">{errors.yearOfCompensation.message}</span>
                        )}
                    </div>
                </div>

                <div className="">
                    <Label
                        htmlFor="perks"
                        className={cn({ "text-destructive": errors.perks })}
                    >
                        Perks (If any)
                    </Label>
                    <Textarea
                        className={cn("border mt-2", {
                            "border-border": !errors.perks,
                            "border-destructive": errors.perks
                        })}
                        id="perks"
                        {...register("perks")} />
                    {errors.perks && (
                        <span className="text-xs text-destructive">{errors.perks.message}</span>
                    )}
                </div>

                <h3 className="text-lg font-bold">Compensation details</h3>

                <div className="flex gap-4 items-center w-full justify-between">
                    <div className="w-1/2">
                        <Label
                            htmlFor="baseSalary"
                            className={cn({ "text-destructive": errors.baseSalary })}
                        >
                            Base Salary
                        </Label>
                        <Input
                            className={cn("border mt-2", {
                                "border-border": !errors.baseSalary,
                                "border-destructive": errors.baseSalary
                            })}
                            id="baseSalary"
                            type="number"
                            {...register("baseSalary", {
                                required: "This is required",
                                valueAsNumber: true,
                                min: { value: 1, message: "Base salary should be a positive integer" }
                            })}
                        />
                        {errors.baseSalary && (
                            <span className="text-xs text-destructive">{errors.baseSalary.message}</span>
                        )}
                    </div>
                    <div className="w-1/2">
                        <Label
                            htmlFor="annualBonus"
                            className={cn({ "text-destructive": errors.annualBonus })}
                        >
                            Annual Bonus
                        </Label>
                        <Input
                            className={cn("border mt-2", {
                                "border-border": !errors.annualBonus,
                                "border-destructive": errors.annualBonus
                            })}
                            id="annualBonus"
                            type="number"
                            {...register("annualBonus", {
                                required: "This is required",
                                valueAsNumber: true,
                                min: { value: 1, message: "Annual bonus should be a positive integer" }
                            })}
                        />
                        {errors.annualBonus && (
                            <span className="text-xs text-destructive">{errors.annualBonus.message}</span>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="w-1/2">
                        <Label
                            htmlFor="signOnBonus"
                            className={cn({ "text-destructive": errors.signOnBonus })}
                        >
                            Sign-on Bonus
                        </Label>
                        <Input
                            className={cn("border mt-2", {
                                "border-border": !errors.signOnBonus,
                                "border-destructive": errors.signOnBonus
                            })}
                            id="signOnBonus"
                            type="number"
                            {...register("signOnBonus", {
                                required: "This is required",
                                valueAsNumber: true,
                                min: { value: 1, message: "Sign-on bonus should be a positive integer" }
                            })}
                        />
                        {errors.signOnBonus && (
                            <span className="text-xs text-destructive">{errors.signOnBonus.message}</span>
                        )}
                    </div>

                    <div className="w-1/2">
                        <Label
                            htmlFor="offerStatus"
                            className={cn({ "text-destructive": errors.signOnBonus })}
                        >
                            Is your offer new or existing?
                        </Label>
                        <RadioGroup defaultValue={OfferStatus.NEW} className="flex gap-4 items-center mt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={OfferStatus.NEW}
                                    defaultChecked={true}
                                    id="new"
                                    {...register("offerStatus")}
                                />
                                <Label htmlFor="new">New</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={OfferStatus.EXISTING}
                                    id="exisiting"
                                    {...register("offerStatus")}
                                />
                                <Label htmlFor="exisiting">Existing</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="">
                    <Label
                        htmlFor="compensationDetails"
                        className={cn({ "text-destructive": errors.compensationDetails })}
                    >
                        Compensation details
                    </Label>
                    <Textarea
                        className={cn("border mt-2", {
                            "border-border": !errors.compensationDetails,
                            "border-destructive": errors.compensationDetails
                        })}
                        id="compensationDetails"
                        {...register("compensationDetails")} />
                    {errors.compensationDetails && (
                        <span className="text-xs text-destructive">{errors.compensationDetails.message}</span>
                    )}
                </div>


                <h3 className="text-lg font-bold">Private details</h3>

                <div>
                    <Label
                        htmlFor="highestEducation"
                        className={cn({ "text-destructive": errors.highestEducation })}
                    >
                        Highest education
                    </Label>
                    <Controller
                        render={({ field: { value, onChange } }) => {
                            return (
                                <Select<HighestEducation>
                                    value={value}
                                    onChange={onChange}
                                    options={EDUCATION}
                                    className="mt-2 w-full"
                                />
                            );
                        }}
                        name="highestEducation"
                        rules={{ required: "This is required" }}
                        control={control}
                    />
                    {errors.highestEducation && (
                        <span className="text-xs text-destructive">{errors.highestEducation.message}</span>
                    )}
                </div>

                <div className="">
                    <Label
                        htmlFor="gender"
                        className={cn({ "text-destructive": errors.gender })}
                    >
                        Gender
                    </Label>
                    <RadioGroup defaultValue={OfferStatus.NEW} className="flex gap-4 items-center mt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={Gender.MALE} id="male" {...register("gender")} />
                            <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={Gender.FEMALE} id="female" {...register("gender")} />
                            <Label htmlFor="female">Female</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={Gender.OTHER} id="other" {...register("gender")} />
                            <Label htmlFor="other">Other</Label>
                        </div>
                    </RadioGroup>
                </div>

                <Button type="submit" className="mt-2" disabled={loading}>Submit</Button>
            </form>
        </div>
    );
};

export default Protected(Add);
