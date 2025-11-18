export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET() {
  const valorantRes = await fetch(
    "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
  );

  const json: { data: unknown[] } = await valorantRes.json();

  const data = json.data.map((a) => {
    const agent = a as {
      displayName: string;
      displayIcon: string;
    };

    return {
      name: agent.displayName,
      icon: agent.displayIcon,
    };
  });

  return new Response(JSON.stringify(data), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
