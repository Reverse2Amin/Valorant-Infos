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
  const valorantRes = await fetch("https://valorant-api.com/v1/maps");

  const json: { data: unknown[] } = await valorantRes.json();

  const data = json.data.map((m) => {
    const map = m as {
      displayName: string;
      splash: string;
    };

    return {
      name: map.displayName,
      splash: map.splash,
    };
  });

  return new Response(JSON.stringify(data), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
