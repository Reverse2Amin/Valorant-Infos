async function loadData() {
  const [agentsRes, mapsRes, weaponsRes] = await Promise.all([
    fetch("http://localhost:3000/api/valorant/agents"),
    fetch("http://localhost:3000/api/valorant/maps"),
    fetch("http://localhost:3000/api/valorant/weapons")
  ]);

  const agents = await agentsRes.json();
  const maps = await mapsRes.json();
  const weapons = await weaponsRes.json();

  renderSection("agents", agents, "icon");
  renderSection("maps", maps, "splash");
  renderSection("weapons", weapons, "icon");
}

function renderSection(id, items, imageKey) {
  const container = document.getElementById(id);

  items.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${item[imageKey]}" alt="${item.name}">
      <p>${item.name}</p>
    `;
    container.appendChild(div);
  });
}

loadData();
