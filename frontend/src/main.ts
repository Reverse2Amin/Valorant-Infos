const API_URL = 'http://localhost:3000/api';

let token = localStorage.getItem('token');
let currentUser: { username: string; isAdmin: boolean } | null = null;

let allAgents: any[] = [];
let allWeapons: any[] = [];
let allMaps: any[] = [];
let myFavorites: any[] = [];

document.addEventListener('DOMContentLoaded', async () => {
    if (token) {
        try {
            const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            currentUser = { username: payload.username, isAdmin: payload.isAdmin };
        } catch (e) { logout(); }
    }

    updateAuthUI();
    setupEventListeners();

    console.log("🚀 Starte Datenabruf...");
    
    await Promise.all([
        fetchAgents(),
        fetchWeapons(),
        fetchMaps()
    ]);
    
    if (token) {
        await fetchFavorites();
        renderAgents();
    }
});

async function fetchAgents() {
    const grid = document.getElementById('agents-grid');
    try {
        const res = await fetch(`${API_URL}/valorant/agents`);
        if (!res.ok) throw new Error(`Fehler ${res.status}`);
        const json = await res.json();
        allAgents = Array.isArray(json) ? json : json.data || [];
        renderAgents();
    } catch(e) { 
        console.error("Agents Error:", e);
        if(grid) grid.innerHTML = `<p style="color:red">Fehler beim Laden der Agents: ${(e as Error).message}</p>`; 
    }
}

async function fetchWeapons() {
    const grid = document.getElementById('weapons-grid');
    try {
        console.log("Lade Waffen...");
        const res = await fetch(`${API_URL}/valorant/weapons`);
        
        if (!res.ok) {
            throw new Error(`Backend Route fehlt? Status: ${res.status}`);
        }
        
        const json = await res.json();
        allWeapons = Array.isArray(json) ? json : json.data || [];
        console.log(`Waffen geladen: ${allWeapons.length}`);
        renderWeapons();
    } catch(e) { 
        console.error("Weapons Error:", e);
        if(grid) grid.innerHTML = `<p style="color:red">Konnte Waffen nicht laden.<br>Fehler: ${(e as Error).message}<br>Existiert <code>backend/src/app/api/valorant/weapons/route.ts</code>?</p>`;
    }
}

async function fetchMaps() {
    const grid = document.getElementById('maps-grid');
    try {
        console.log("Lade Maps...");
        const res = await fetch(`${API_URL}/valorant/maps`);
        
        if (!res.ok) {
            throw new Error(`Backend Route fehlt? Status: ${res.status}`);
        }

        const json = await res.json();
        allMaps = Array.isArray(json) ? json : json.data || [];
        console.log(`Maps geladen: ${allMaps.length}`);
        renderMaps();
    } catch(e) { 
        if(grid) grid.innerHTML = `<p style="color:red">Konnte Maps nicht laden.<br>Fehler: ${(e as Error).message}</p>`;
    }
}

async function fetchFavorites() {
    if (!token) return;
    try {
        const res = await fetch(`${API_URL}/favorites`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
            myFavorites = await res.json();
            renderAgents();
            renderFavorites();
        }
    } catch(e) {}
}

async function fetchUsers() {
    if (!token || !currentUser?.isAdmin) return;
    try {
        const res = await fetch(`${API_URL}/admin/users`, { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        renderAdminPanel(data);
    } catch(e) {}
}

function renderAgents() {
    const grid = document.getElementById('agents-grid');
    if (!grid) return;
    if (allAgents.length === 0) { grid.innerHTML = '<p>Keine Agents gefunden.</p>'; return; }

    grid.innerHTML = allAgents.map(agent => {
        const isFav = myFavorites.some(f => f.itemUuid === agent.uuid);
        const img = agent.image || agent.displayIcon;
        const name = agent.name || agent.displayName;

        return `
            <div class="card">
                <img src="${img}" class="card-image agent-clickable" data-uuid="${agent.uuid}" alt="${name}">
                <div class="card-content">
                    <h3 class="card-title">${name}</h3>
                    <div class="card-actions">
                        ${isFav ? '<span style="font-size:1.5rem; color:#ff4655;">❤️</span>' : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    addGridListeners();
}

function renderWeapons() {
    const grid = document.getElementById('weapons-grid');
    if (!grid) return;
    
    if (allWeapons.length === 0) {
        grid.innerHTML = "<p>Lade Waffen...</p>";
        return;
    }

    grid.innerHTML = allWeapons.map(w => {
        const price = w.shopData ? w.shopData.cost : 0;
        const category = w.shopData ? w.shopData.categoryText : 'Melee';
        
        const fireRate = w.weaponStats ? w.weaponStats.fireRate : '-';
        const magazine = w.weaponStats ? w.weaponStats.magazineSize : '-';
        
        const damage = w.weaponStats && w.weaponStats.damageRanges && w.weaponStats.damageRanges.length > 0
            ? w.weaponStats.damageRanges[0].bodyDamage 
            : '-';

        return `
            <div class="card">
                <div class="weapon-price">${price} ¤</div>
                <div class="weapon-category">${category}</div>

                <img src="${w.displayIcon}" class="card-image" style="cursor: default; padding: 20px;">
                
                <div class="card-content">
                    <h3 class="card-title">${w.displayName}</h3>
                    
                    <div class="weapon-stats-grid">
                        <div class="stat-row">
                            <span class="stat-label">Schaden</span>
                            <span class="stat-value">${damage}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Magazin</span>
                            <span class="stat-value">${magazine}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Feuerrate</span>
                            <span class="stat-value">${fireRate}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Typ</span>
                            <span class="stat-value">${category}</span>
                        </div>
                    </div>
                </div>
            </div>`;
    }).join('');
}

function renderMaps() {
    const grid = document.getElementById('maps-grid');
    if(!grid) return;

    if (allMaps.length === 0) {
        grid.innerHTML = "<p>Keine Maps gefunden.</p>";
        return;
    }

    grid.innerHTML = allMaps.map(m => `
        <div class="card">
            <img src="${m.splash || m.displayIcon}" class="card-image" style="cursor:default;">
            <div class="card-content">
                <h3 class="card-title">${m.displayName}</h3>
                <p>${m.coordinates || ''}</p>
            </div>
        </div>`).join('');
}

function renderFavorites() {
    const grid = document.getElementById('favorites-grid');
    if (!grid) return;
    if (myFavorites.length === 0) { grid.innerHTML = '<p>Keine Favoriten.</p>'; return; }

    grid.innerHTML = myFavorites.map(fav => `
        <div class="card">
            <img src="${fav.image}" class="card-image agent-clickable" data-uuid="${fav.itemUuid}">
            <div class="card-content">
                <h3 class="card-title">${fav.name}</h3>
                <button class="btn btn-danger remove-fav" data-uuid="${fav.itemUuid}" style="width:100%; margin-top:10px;">Entfernen</button>
            </div>
        </div>`).join('');

    addGridListeners();
    grid.querySelectorAll('.remove-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite((e.target as HTMLElement).dataset.uuid!);
        });
    });
}

function renderAdminPanel(users: any[]) {
    const div = document.getElementById('users-table');
    if(div) div.innerHTML = `
        <table class="table">
            <tr><th>User</th><th>Email</th><th>Rolle</th><th>Aktion</th></tr>
            ${users.map(u => `
                <tr>
                    <td>${u.username}</td>
                    <td>${u.email || '-'}</td>
                    <td>${u.isAdmin ? 'ADMIN' : 'User'}</td>
                    <td>${u.username !== currentUser?.username ? `<button class="btn btn-danger btn-sm del-user" data-id="${u.id}">Löschen</button>` : '-'}</td>
                </tr>`).join('')}
        </table>
    `;
    document.querySelectorAll('.del-user').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if(confirm("User löschen?")) {
                await fetch(`${API_URL}/admin/users?id=${(e.target as HTMLElement).dataset.id}`, { method: 'DELETE', headers: {'Authorization':`Bearer ${token}`} });
                fetchUsers();
            }
        });
    });
}

function addGridListeners() {
    document.querySelectorAll('.agent-clickable').forEach(img => {
        img.addEventListener('click', (e) => {
            showAgentDetail((e.currentTarget as HTMLElement).dataset.uuid!);
        });
    });
}

function showAgentDetail(uuid: string) {
    const agent = allAgents.find(a => a.uuid === uuid);
    if (!agent) return;

    const container = document.getElementById('agent-detail-content');
    if (!container) return;

    const isFav = myFavorites.some(f => f.itemUuid === uuid);
    
    const btnText = isFav ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen";
    const btnClass = isFav ? "btn-secondary" : "btn-primary";
    const btnIcon = isFav ? "💔" : "❤️";

    const portrait = agent.fullPortrait || agent.displayIcon || '';
    const name = agent.name || agent.displayName;
    const role = agent.role?.displayName || "Agent";

    container.innerHTML = `
        <div class="detail-container">
            
            <div class="detail-image-wrapper">
                <img src="${portrait}" class="detail-portrait" alt="${name}">
            </div>

            <div class="detail-content-wrapper">
                
                <div class="detail-header">
                    <h1 class="detail-name">${name}</h1>
                    <span class="detail-role">${role}</span>
                </div>

                ${token 
                    ? `<button id="detail-fav-btn" class="btn ${btnClass} detail-action-btn">
                         ${btnIcon} <span>${btnText}</span>
                       </button>`
                    : `<div style="padding:15px; background:rgba(255,70,85,0.1); border:1px solid #ff4655; color:white; text-align:center; border-radius:4px;">
                         🔒 <span style="font-weight:bold;">Logge dich ein</span>, um ${name} zu favorisieren.
                       </div>`
                }

                <div style="margin-top: 30px;"></div>

                <p class="detail-bio">
                    ${agent.description || "Keine Beschreibung verfügbar."}
                </p>

                <div class="abilities-section">
                    <h3>Fähigkeiten</h3>
                    <div class="abilities-grid">
                        ${agent.abilities ? agent.abilities.map((ab: any) => `
                            <div class="ability-box">
                                <div class="ability-top">
                                    ${ab.displayIcon ? `<img src="${ab.displayIcon}" class="ability-img">` : ''}
                                    <span class="ability-title">${ab.displayName}</span>
                                </div>
                                <p class="ability-text">${ab.description}</p>
                            </div>
                        `).join('') : '<p>Keine Fähigkeiten bekannt.</p>'}
                    </div>
                </div>

            </div>
        </div>
    `;

    const btn = document.getElementById('detail-fav-btn');
    if (btn) {
        btn.addEventListener('click', async () => {
            btn.innerText = "Verarbeite...";
            (btn as HTMLButtonElement).disabled = true;
            await toggleFavorite(uuid);
            showAgentDetail(uuid);
        });
    }

    switchView('agent-detail');
}

async function toggleFavorite(uuid: string) {
    if(!token) return;
    const existing = myFavorites.find(f => f.itemUuid === uuid);
    const agent = allAgents.find(a => a.uuid === uuid);

    try {
        if(existing) {
            await fetch(`${API_URL}/favorites?uuid=${uuid}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        } else if(agent) {
            await fetch(`${API_URL}/favorites`, {
                method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ agentUuid: agent.uuid, agentName: agent.name || agent.displayName, agentImage: agent.image || agent.displayIcon })
            });
        }
        await fetchFavorites();
        renderAgents(); renderFavorites();
    } catch(e) { console.error(e); }
}

function switchView(viewName: string) {
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
        (v as HTMLElement).style.display = ''; 
    });

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    const targetView = document.getElementById(`${viewName}-view`);
    
    if (targetView) {
        targetView.classList.add('active');
        targetView.style.display = 'block'; 
    } else {
        console.error(`Fehler: View mit ID '${viewName}-view' nicht gefunden!`);
    }

    const link = document.querySelector(`[data-view="${viewName}"]`);
    if(link) link.classList.add('active');

    if (viewName === 'admin') fetchUsers();
    
    window.scrollTo(0, 0);
}

function setupEventListeners() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchView((e.target as HTMLElement).dataset.view!);
        });
    });

    document.getElementById('back-to-agents')?.addEventListener('click', () => switchView('agents'));
    document.getElementById('login-btn')?.addEventListener('click', () => showAuthModal(true));
    document.getElementById('register-btn')?.addEventListener('click', () => showAuthModal(false));
    document.getElementById('profile-btn')?.addEventListener('click', showProfileModal);
    document.getElementById('logout-btn')?.addEventListener('click', logout);
    document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
    document.getElementById('btn-delete-account')?.addEventListener('click', deleteAccount);

    document.querySelectorAll('.close').forEach(c => c.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => (m as HTMLElement).style.display = 'none');
    }));
    window.onclick = (e) => {
        if((e.target as HTMLElement).classList.contains('modal')) (e.target as HTMLElement).style.display = 'none';
    };
}

function showAuthModal(isLogin: boolean) {
    const modal = document.getElementById('auth-modal')!;
    modal.style.display = 'flex';
    modal.dataset.mode = isLogin ? 'login' : 'register';
    document.getElementById('modal-title')!.textContent = isLogin ? 'Login' : 'Registrieren';
    (document.getElementById('auth-form') as HTMLFormElement).reset();
    document.getElementById('auth-error')!.textContent = '';
}

function showProfileModal() {
    const modal = document.getElementById('modal-profile')!;
    document.getElementById('profile-username-show')!.textContent = currentUser?.username || '';
    modal.style.display = 'flex';
}

async function handleAuth(e: Event) {
    e.preventDefault();
    const isLogin = document.getElementById('auth-modal')!.dataset.mode === 'login';
    const u = (document.getElementById('auth-username') as HTMLInputElement).value;
    const p = (document.getElementById('auth-password') as HTMLInputElement).value;
    
    const body = isLogin ? {username: u, password: p} : {username: u, password: p, email: u+'@fake.de', name: u};
    
    try {
        const res = await fetch(`${API_URL}/auth/${isLogin ? 'login' : 'register'}`, {
            method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body)
        });
        const data = await res.json();

        if(data.token) {
            localStorage.setItem('token', data.token);
            token = data.token;
            currentUser = { username: data.user.username, isAdmin: data.isAdmin };
            updateAuthUI();
            document.getElementById('auth-modal')!.style.display = 'none';
            await fetchFavorites(); renderAgents();
        } else if(!data.error) {
            alert("Registriert! Bitte einloggen."); showAuthModal(true);
        } else {
            document.getElementById('auth-error')!.textContent = data.error;
        }
    } catch(e) { document.getElementById('auth-error')!.textContent = "Fehler"; }
}

function logout() {
    localStorage.removeItem('token');
    token = null; currentUser = null; myFavorites = [];
    updateAuthUI(); renderAgents(); 
    document.getElementById('modal-profile')!.style.display = 'none';
    switchView('agents');
}

async function deleteAccount() {
    if(!confirm("Wirklich löschen?")) return;
    await fetch(`${API_URL}/auth/me`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    logout();
}

function updateAuthUI() {
    const auth = document.getElementById('auth-buttons')!;
    const info = document.getElementById('user-info')!;
    const fav = document.getElementById('favorites-link')!;
    const adm = document.getElementById('admin-link')!;

    if(token && currentUser) {
        auth.style.display = 'none'; info.style.display = 'flex';
        document.getElementById('username-display')!.textContent = currentUser.username;
        fav.style.display = 'block';
        adm.style.display = currentUser.isAdmin ? 'block' : 'none';
    } else {
        auth.style.display = 'flex'; info.style.display = 'none';
        fav.style.display = 'none'; adm.style.display = 'none';
    }
}