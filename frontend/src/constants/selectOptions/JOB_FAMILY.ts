import { GroupedSelectOption, SelectOption } from "@/models/SelectOption";

export const JOB_FAMILY_OPTIONS: (SelectOption<string> | GroupedSelectOption<string>)[] = [
    {
        label: "Software Engineering", options: [
            { value: "eng_generic", label: "Software Engineer" },
            { value: "eng_backend", label: "Backend" },
            { value: "eng_web", label: "Frontend" },
            { value: "eng_fullstack", label: "Fullstack" },
            { value: "eng_mobile", label: "Mobile" },
            { value: "eng_cloud", label: "Cloud" },
            { value: "eng_embedded", label: "Embedded" },
            { value: "eng_devops", label: "DevOps Engineer" },
            { value: "eng_sre", label: "Site Reliablity Engineer (SRE)" },
            { value: "eng_infra", label: "Platform &amp; Infra" },
            { value: "eng_security", label: "Security Engineering" },
            { value: "eng_data", label: "Data Engineer" },
            { value: "eng_ml", label: "ML Engineer" },
            { value: "eng_ai", label: "AI Engineer" },
            { value: "eng_architect", label: "Architect" },
            { value: "eng_solutions_architect", label: "Solutions Architect" },
            { value: "eng_partner", label: "Partner Engineer" },
            { value: "eng_sales", label: "Sales Engineer" },
            { value: "eng_bi", label: "BI Engineer" },
            { value: "eng_consultant", label: "Consultant" },
            { value: "eng_support", label: "Support Engineer" },
            { value: "eng_test", label: "Test/QA/SDET" }
        ]
    },
    {
        label: "Engineering Management", options: [
            { value: "tech_lead", label: "Tech Lead" },
            { value: "eng_manager", label: "Engineering Manager" },
            { value: "delivery_manager", label: "Delivery Manager" }
        ]
    },
    {
        label: "Product & Program Management", options: [
            { value: "product_manager", label: "Product Manager" },
            { value: "program_manager", label: "Program Manager" },
            { value: "tpm", label: "TPM" },
            { value: "product_owner", label: "Product Owner" },
            { value: "project_manager", label: "Project Manager" },
            { value: "product_marketing_manager", label: "Product Marketing Manager" },
            { value: "business_analyst", label: "Business Analyst" }
        ]
    },
    {
        label: "Design", options: [
            { value: "designer", label: "Designer" },
            { value: "ux_designer", label: "UX Designer" },
            { value: "user_researcher", label: "User Researcher" }
        ]
    },
    {
        label: "Data Science", options: [
            { value: "data_scientist", label: "Data Scientist" },
            { value: "data_analyst", label: "Data Analytist" },
            { value: "quant_analyst", label: "Quant Analytist" }
        ]
    },
    {
        label: "Developer Advocacy", options: [
            { value: "dev_advocate", label: "Developer Advocate" },
            { value: "tech_evangelist", label: "Technical Evangelist" },
            { value: "tech_writer", label: "Technical Writer" }
        ]
    },
    {
        label: "Sales & Related", options: [
            { value: "tech_sales", label: "Sales" },
            { value: "tech_account_manager", label: "Account Manager" },
            { value: "tech_customer_success_manager", label: "Customer Success Manager" }
        ]
    },
    {
        label: "Recruitment", options: [
            { value: "tech_recruiter", label: "Tech Recruiter" },
            { value: "tech_sourcer", label: "Tech Sourcer" },
            { value: "exec_recruiter", label: "Executive Recruiter" }
        ]
    },
    { label: "Other", value: "other" }
];