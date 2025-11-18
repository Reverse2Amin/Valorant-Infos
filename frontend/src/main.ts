async function load() {
  const res = await fetch("http://localhost:3000/api/valorant/all");
  const data = await res.json();

  showAgents(data.agents ?? []);
  showMaps(data.maps ?? []);
  showWeapons(data.weapons ?? []);
  
}

function showAgents(agents: any[]) {
  const div = document.getElementById("agents");
  if (!div) return;
  div.innerHTML = agents
    .map(a => `
      <div class="card">
        <img src="${a.icon ?? a.displayIcon ?? ''}" />
        <h3>${a.name ?? a.displayName ?? ''}</h3>
        <p>${a.role ?? a.role?.displayName ?? ''}</p>
      </div>
    `)
    .join("");
}

function showMaps(maps: any[]) {
  const div = document.getElementById("maps");
  if (!div) return;
  div.innerHTML = maps
    .map(m => `
      <div class="card">
        <img src="${m.splash ?? ''}" />
        <h3>${m.name ?? m.displayName ?? ''}</h3>
      </div>
    `)
    .join("");
}

function showWeapons(weapons: any[]) {
  const div = document.getElementById("weapons");
  if (!div) return;
  div.innerHTML = weapons
    .map(w => `
      <div class="card weapon-card" data-id="${w.id ?? ''}">
        <img src="${w.icon ?? w.displayIcon ?? ''}" />
        <h3>${w.name ?? w.displayName ?? ''}</h3>
        <p>${w.category ?? w.shopData?.category ?? ''}</p>
      </div>
    `)
    .join("");
}


load();
