//Hooks router
import { useLocation } from "react-router-dom";

//Hook react
import { useMemo } from "react";

export const useQuery = () => {
  const { search } = useLocation();
  console.log(search);

  return useMemo(() => {
    console.log(search);
    new URLSearchParams(search);
  }, [search]);
};
