import { fetchAgents, fetchMaps, fetchWeapons } from "@/lib/valorant";

export default async function ValPage() {
  const [agents, maps, weapons] = await Promise.all([
    fetchAgents(),
    fetchMaps(),
    fetchWeapons(),
    
  ]);

  const data = { agents, maps, weapons};

  return (
    <pre style={{ color: "white", background: "#0a0a0f", padding: "20px", fontSize: "14px"}}>
        {JSON.stringify(data, null, 2)}
    </pre>
    );
}