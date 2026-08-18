import { useLoaderData } from "react-router-dom";

export function useTypedLoaderData<T>() {
  return useLoaderData() as T;
}
