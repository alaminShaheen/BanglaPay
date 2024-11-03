import { OfficeArrangement } from "@/models/enums/OfficeArrangement";
import { Seniority } from "@/models/enums/Seniority";
import { HighestEducation } from "@/models/enums/HighestEducation";
import { Gender } from "@/models/enums/Gender";
import { ContractType } from "@/models/enums/ContractType";
import { OfferStatus } from "@/models/enums/OfferStatus";


export type Compensation = {
    id: string;
    company: string;
    officeCity: string;

    jobTitle: string;
    jobFocus: string;
    arrangement: OfficeArrangement;
    yearsOfExperience: number;
    seniority: Seniority;
    contractType: ContractType;
    yearOfCompensation: number;
    perks: string;

    baseSalary: number;
    signOnBonus: number;
    annualBonus: number;
    offerStatus: OfferStatus;
    compensationDetails: string;


    highestEducation: HighestEducation;
    gender: Gender;
    otherInfo: string;
}