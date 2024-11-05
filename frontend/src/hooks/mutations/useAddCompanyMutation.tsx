import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { Company } from "@/models/Company";
import { addCompany } from "@/services/AddCompany";
import { QUERY_KEYS } from "@/constants/QueryKeys";

// type UseAddCompanyMutationProps = {
// }

export const useAddCompanyMutation = () => {
    // const {  } = props;
    const { handleErrors } = useErrorHandler();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (companyName: string) => {
            const response = await addCompany({ name: companyName });
            return response.data;
        },
        onSuccess: (response) => {
            queryClient.setQueryData<Company[], string[], Company[]>([QUERY_KEYS.FETCH_COMPANIES], (oldCompanies) => {
                if (oldCompanies && oldCompanies.length > 0) {
                    return [...oldCompanies, response];
                }
                return [response];
            });
        },
        onError: (error) => handleErrors(error)
    });
};