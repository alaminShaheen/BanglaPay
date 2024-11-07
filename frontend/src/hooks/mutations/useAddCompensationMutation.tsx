import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { UseFormSetError } from "react-hook-form";

import { Compensation } from "@/models/Compensation";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { addCompensation } from "@/services/AddCompensation";
import { CompensationForm } from "@/models/forms/CompensationForm";

type UseAddCompanyMutationProps = {
    setError?: UseFormSetError<CompensationForm>
    onAddCompensationSuccess: (response: Compensation) => void;
}

export const useAddCompensationMutation = (props: UseAddCompanyMutationProps) => {
    const { setError, onAddCompensationSuccess } = props;
    const { handleErrors } = useErrorHandler();
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: CompensationForm) => {
            const response = await addCompensation(formData);
            return response.data;
        },
        onSuccess: (response) => {
            onAddCompensationSuccess(response);
            // TODO: Do after adding fetch compensation mutation
            // queryClient.setQueryData<Compensation[], string[], Compensation[]>([QUERY_KEYS.FETCH_COMPENSATIONS], (oldCompensations) => {
            //     if (oldCompensations && oldCompensations.length > 0) {
            //         return [...oldCompensations, response];
            //     }
            //     return [response];
            // });
        },
        onError: (error) => handleErrors(error, setError)
    });
};