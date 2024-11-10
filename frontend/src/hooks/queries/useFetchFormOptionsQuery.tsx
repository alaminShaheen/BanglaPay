import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/services/GetCompanies";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { getFormOptions } from "@/services/GetFormOptions";

type UseFetchFormOptionsQueryProps = {
    enabled: boolean;
}

export const useFetchFormOptionsQuery = (props: UseFetchFormOptionsQueryProps) => {
    const { enabled } = props;

    return useQuery(
        {
            queryKey: [QUERY_KEYS.FETCH_FORM_OPTIONS],
            queryFn: async () => {
                const response = await getFormOptions();
                return response.data;
            },
            enabled,
        }
    );
};