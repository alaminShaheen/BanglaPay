import { GroupedSelectOption, SelectOption } from "@/models/SelectOption";

export const JOB_FAMILY: (SelectOption<string> | GroupedSelectOption<string>)[] = [
    {
        label: "Software Engineering", options: [
            { value: "Software Engineer", label: "Software Engineer" },
            { value: "Backend", label: "Backend" },
            { value: "Frontend", label: "Frontend" },
            { value: "Fullstack", label: "Fullstack" },
            { value: "Mobile", label: "Mobile" },
            { value: "Cloud", label: "Cloud" },
            { value: "Embedded", label: "Embedded" },
            { value: "DevOps Engineer", label: "DevOps Engineer" },
            { value: "Site Reliablity Engineer (SRE)", label: "Site Reliablity Engineer (SRE)" },
            { value: "Platform &amp; Infra", label: "Platform &amp; Infra" },
            { value: "Security Engineering", label: "Security Engineering" },
            { value: "Data Engineer", label: "Data Engineer" },
            { value: "ML Engineer", label: "ML Engineer" },
            { value: "AI Engineer", label: "AI Engineer" },
            { value: "Architect", label: "Architect" },
            { value: "Solutions Architect", label: "Solutions Architect" },
            { value: "Partner Engineer", label: "Partner Engineer" },
            { value: "Sales Engineer", label: "Sales Engineer" },
            { value: "BI Engineer", label: "BI Engineer" },
            { value: "Consultant", label: "Consultant" },
            { value: "Support Engineer", label: "Support Engineer" },
            { value: "Test/QA/SDET", label: "Test/QA/SDET" }
        ]
    },
    {
        label: "Engineering Management", options: [
            { value: "Tech Lead", label: "Tech Lead" },
            { value: "Engineering Manager", label: "Engineering Manager" },
            { value: "Delivery Manager", label: "Delivery Manager" }
        ]
    },
    {
        label: "Product & Program Management", options: [
            { value: "Product Manager", label: "Product Manager" },
            { value: "Program Manager", label: "Program Manager" },
            { value: "TPM", label: "TPM" },
            { value: "Product Owner", label: "Product Owner" },
            { value: "Project Manager", label: "Project Manager" },
            { value: "Product Marketing Manager", label: "Product Marketing Manager" },
            { value: "Business Analyst", label: "Business Analyst" }
        ]
    },
    {
        label: "Design", options: [
            { value: "Designer", label: "Designer" },
            { value: "UX Designer", label: "UX Designer" },
            { value: "User Researcher", label: "User Researcher" }
        ]
    },
    {
        label: "Data Science", options: [
            { value: "Data Scientist", label: "Data Scientist" },
            { value: "Data Analytist", label: "Data Analytist" },
            { value: "Quant Analytist", label: "Quant Analytist" }
        ]
    },
    {
        label: "Developer Advocacy", options: [
            { value: "Developer Advocate", label: "Developer Advocate" },
            { value: "Technical Evangelist", label: "Technical Evangelist" },
            { value: "Technical Writer", label: "Technical Writer" }
        ]
    },
    {
        label: "Sales & Related", options: [
            { value: "Sales", label: "Sales" },
            { value: "Account Manager", label: "Account Manager" },
            { value: "Customer Success Manager", label: "Customer Success Manager" }
        ]
    },
    {
        label: "Recruitment", options: [
            { value: "Tech Recruiter", label: "Tech Recruiter" },
            { value: "Tech Sourcer", label: "Tech Sourcer" },
            { value: "Executive Recruiter", label: "Executive Recruiter" }
        ]
    },
    { label: "Other", value: "Other" }
];