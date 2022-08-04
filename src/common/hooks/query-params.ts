import {useLocation} from "react-router-dom";

export function useQuery(name:string) {
    return new URLSearchParams(useLocation().search).get(name);
}