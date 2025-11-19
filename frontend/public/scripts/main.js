async function loadData() {
  const [agentsRes, mapsRes, weaponsRes] = await Promise.all([
    fetch("http://localhost:3000/api/valorant/agents"),
    fetch("http://localhost:3000/api/valorant/maps"),
    fetch("http://localhost:3000/api/valorant/weapons")
  ]);

  const agents = await agentsRes.json();
  const maps = await mapsRes.json();
  const weapons = await weaponsRes.json();

  renderSection("agents", "Agents", agents, (item) => `
    <img src="${item.icon || item.displayIcon}" alt="${item.name}">
    <p>${item.name}</p>
    ${item.role ? `<p class="role">${item.role}</p>` : ''}
  `);

  renderSection("maps", "Maps", maps, (item) => `
    <img src="${item.splash}" alt="${item.name}">
    <p>${item.name}</p>
  `);

  renderSection("weapons", "Weapons", weapons, (item) => `
    <img src="${item.icon || item.displayIcon}" alt="${item.name}">
    <p>${item.name}</p>
    ${item.category ? `<p class="category">${item.category}</p>` : ''}
  `);
}

function renderSection(id, title, items, templateFn) {
  const container = document.getElementById(id);
  
  
  container.innerHTML = '';
  
  
  const titleEl = document.createElement('h2');
  titleEl.className = 'section-title';
  titleEl.textContent = title;
  container.appendChild(titleEl);
  
 
  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = 'card';
    card.innerHTML = templateFn(item);
    grid.appendChild(card);
  });
  
  container.appendChild(grid);
}

loadData();
