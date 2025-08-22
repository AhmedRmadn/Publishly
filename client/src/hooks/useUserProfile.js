import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../services/ProfileService";

export function useUserProfile() {
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  const {
    isLoading: profileLoading, // fixed typo here
    data: user,
    error: isError,
  } = useQuery({
    queryKey: ["profileHeader"],
    queryFn: fetchUserProfile,
    // enabled: isLoggedIn,
    // enabled: true, // optional: set to false if you want to conditionally fetch
    retry: false, // optional: don't retry if 403 error
  });

  return { profileLoading, isError, user };
}
