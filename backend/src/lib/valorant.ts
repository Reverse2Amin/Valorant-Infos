export async function getValorantData(type: string) {
  const res = await fetch(`https://valorant-api.com/v1/${type}`);
  const json = await res.json();
  return json.data;
}
