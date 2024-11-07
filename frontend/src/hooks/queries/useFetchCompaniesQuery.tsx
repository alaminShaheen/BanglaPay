import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/services/GetCompanies";
import { QUERY_KEYS } from "@/constants/QueryKeys";

type UseFetchCompaniesQueryProps = {
    enabled: boolean;
}

export const useFetchCompaniesQuery = (props: UseFetchCompaniesQueryProps) => {
    const { enabled } = props;

    return useQuery(
        {
            queryKey: [QUERY_KEYS.FETCH_COMPANIES],
            queryFn: async () => {
                const response = await getCompanies();
                return response.data;
            },
            enabled,
        }
    );
};