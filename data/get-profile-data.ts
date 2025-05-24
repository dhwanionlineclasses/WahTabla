import { getProfileData } from "@/action/profile/get-profile-data";
import { useQuery } from "@tanstack/react-query";


export function useProfileData () {
    return useQuery({
        queryKey: ["getProfileData"],
        queryFn: async () => await getProfileData(),
    })
}