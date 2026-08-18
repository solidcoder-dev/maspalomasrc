import { createContext, useContext, type ReactNode } from "react";
import { useRouteLoaderData } from "react-router-dom";
import type { Club } from "../domain/club";
import type { AppDependencies } from "../application/appDependencies";

type AppServices = AppDependencies & { club: Club | null };
const AppServicesContext = createContext<AppServices | null>(null);

export function AppServicesProvider({ dependencies, children }: { dependencies: AppDependencies; children: ReactNode }) {
  const club = useRouteLoaderData("club") as Club | undefined;
  return <AppServicesContext.Provider value={{ ...dependencies, club: club || null }}>{children}</AppServicesContext.Provider>;
}

export function useAppServices() {
  const services = useContext(AppServicesContext);
  if (!services) throw new Error("App services are not available outside AppServicesProvider.");
  return services;
}
