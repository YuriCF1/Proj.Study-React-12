//Hooks router
import { useLocation, useParams } from "react-router-dom";

//Hook react
import { useMemo } from "react";

export const useQuery = () => {
  const { search } = useLocation();
  console.log(search); 
  
  return useMemo(() => new URLSearchParams(search), [search]);
};
