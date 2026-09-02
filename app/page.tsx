import { getActiveDecisions } from "@/features/decision-contract/repository";
import { HomeScreen } from "@/features/home/components/home-screen";
import { getHomeState } from "@/features/home/lib/get-home-state";

export const dynamic = "force-dynamic";

export default async function Home() {
  const state = await getHomeState();
  const decisions = await getActiveDecisions();

  return (
    <HomeScreen
      state={state}
      decisions={decisions}
    />
  );
}
