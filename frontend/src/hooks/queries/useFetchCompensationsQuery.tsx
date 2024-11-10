import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { getCompensations } from "@/services/GetCompensations";

type UseFetchCompensationsQueryProps = {
    enabled: boolean;
}

export const useFetchCompensationsQuery = (props: UseFetchCompensationsQueryProps) => {
    const { enabled } = props;

    return useQuery(
        {
            queryKey: [QUERY_KEYS.FETCH_COMPENSATIONS],
            queryFn: async () => {
                const response = await getCompensations();
                return response.data;
            },
            enabled
        }
    );
};