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
  const valorantRes = await fetch("https://valorant-api.com/v1/weapons");

  const json: { data: unknown[] } = await valorantRes.json();

  const data = json.data.map((w) => {
    const weapon = w as {
      displayName: string;
      displayIcon: string;
      displayType: string;
    };

    return {
      name: weapon.displayName,
      icon: weapon.displayIcon,
      type: weapon.displayType,
    };
  });

  return new Response(JSON.stringify(data), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
