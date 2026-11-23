import Home from "@/src/components/Hero";
import { statCardsFromApi } from "@/src/components/home-sections/HomeStats";
import { getStats } from "@/src/server/api/stats";

const page = async () => (
  <div>
    <Home stats={statCardsFromApi(await getStats())} />
  </div>
);

export default page;
