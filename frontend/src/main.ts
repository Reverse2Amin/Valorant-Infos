// API Base URL
const API_URL = 'http://localhost:3000/api';

// State
let currentUser: { id: string; username: string; isAdmin: boolean } | null = null;
let agents: any[] = [];
let weapons: any[] = [];
let maps: any[] = [];
let favorites: any[] = [];

// Auth Token Management
function getToken(): string | null {
    return localStorage.getItem('token');
}

function setToken(token: string): void {
    localStorage.setItem('token', token);
}

function removeToken(): void {
    localStorage.removeItem('token');
}

// API Calls
async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = getToken();
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };
    }
    return fetch(url, options);
}

async function register(username: string, password: string): Promise<any> {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
}

async function login(username: string, password: string): Promise<any> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
}

async function deleteAccount(): Promise<any> {
    const response = await fetchWithAuth(`${API_URL}/auth/delete`, {
        method: 'DELETE',
    });
    return response.json();
}

async function fetchAgents(): Promise<void> {
    const response = await fetch(`${API_URL}/valorant/agents`);
    const data = await response.json();
    agents = data.data || [];
    renderAgents();
}

async function fetchWeapons(): Promise<void> {
    const response = await fetch(`${API_URL}/valorant/weapons`);
    const data = await response.json();
    weapons = data.data || [];
    renderWeapons();
}

async function fetchMaps(): Promise<void> {
    const response = await fetch(`${API_URL}/valorant/maps`);
    const data = await response.json();
    maps = data.data || [];
    renderMaps();
}

async function fetchFavorites(): Promise<void> {
    if (!currentUser) return;
    const response = await fetchWithAuth(`${API_URL}/favorites`);
    if (response.ok) {
        favorites = await response.json();
        renderFavorites();
    }
}

async function addFavorite(agentUuid: string, agentName: string): Promise<boolean> {
    const response = await fetchWithAuth(`${API_URL}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentUuid, agentName }),
    });
    return response.ok;
}

async function removeFavorite(agentUuid: string): Promise<boolean> {
    const response = await fetchWithAuth(`${API_URL}/favorites`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentUuid }),
    });
    return response.ok;
}

async function fetchUsers(): Promise<any[]> {
    const response = await fetchWithAuth(`${API_URL}/admin/users`);
    if (response.ok) {
        return response.json();
    }
    return [];
}

// UI Rendering
function renderAgents(): void {
    const grid = document.getElementById('agents-grid')!;
    grid.innerHTML = agents.map(agent => {
        const isFavorite = favorites.some(f => f.agentUuid === agent.uuid);
        return `
            <div class="card" data-agent-id="${agent.uuid}">
                ${currentUser ? `<button class="favorite-btn ${isFavorite ? 'active' : ''}" data-agent-uuid="${agent.uuid}" data-agent-name="${agent.displayName}">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>` : ''}
                <img src="${agent.displayIcon}" alt="${agent.displayName}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${agent.displayName}</h3>
                    <p class="card-subtitle">${agent.role?.displayName || 'Unknown'}</p>
                    <p class="card-description">${agent.description?.substring(0, 100)}...</p>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers
    document.querySelectorAll('.card[data-agent-id]').forEach(card => {
        card.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (!target.classList.contains('favorite-btn')) {
                const agentId = (card as HTMLElement).dataset.agentId!;
                showAgentDetail(agentId);
            }
        });
    });

    // Add favorite button handlers
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const button = e.currentTarget as HTMLElement;
            const agentUuid = button.dataset.agentUuid!;
            const agentName = button.dataset.agentName!;
            const isFavorite = button.classList.contains('active');

            if (isFavorite) {
                const success = await removeFavorite(agentUuid);
                if (success) {
                    button.classList.remove('active');
                    button.textContent = '🤍';
                    await fetchFavorites();
                }
            } else {
                const success = await addFavorite(agentUuid, agentName);
                if (success) {
                    button.classList.add('active');
                    button.textContent = '❤️';
                    await fetchFavorites();
                }
            }
        });
    });
}

function renderWeapons(): void {
    const grid = document.getElementById('weapons-grid')!;
    grid.innerHTML = weapons.map(weapon => `
        <div class="card">
            <img src="${weapon.displayIcon || weapon.killStreamIcon}" alt="${weapon.displayName}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${weapon.displayName}</h3>
                <p class="card-subtitle">Kategorie: ${weapon.category?.replace('EEquippableCategory::', '')}</p>
                ${weapon.weaponStats ? `
                    <p class="card-description">
                        Feuerrate: ${weapon.weaponStats.fireRate || 'N/A'}<br>
                        Magazin: ${weapon.weaponStats.magazineSize || 'N/A'}<br>
                        ${weapon.shopData ? `Preis: ${weapon.shopData.cost} Credits` : ''}
                    </p>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function renderMaps(): void {
    const grid = document.getElementById('maps-grid')!;
    grid.innerHTML = maps.map(map => `
        <div class="card">
            <img src="${map.splash}" alt="${map.displayName}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${map.displayName}</h3>
                <p class="card-description">
                    Koordinaten: ${map.coordinates || 'Unbekannt'}
                </p>
            </div>
        </div>
    `).join('');
}

function renderFavorites(): void {
    const grid = document.getElementById('favorites-grid')!;
    if (favorites.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary);">Du hast noch keine Favoriten.</p>';
        return;
    }

    const favoriteAgents = favorites.map(fav => {
        const agent = agents.find(a => a.uuid === fav.agentUuid);
        return agent;
    }).filter(Boolean);

    grid.innerHTML = favoriteAgents.map(agent => `
        <div class="card" data-agent-id="${agent.uuid}">
            <button class="favorite-btn active" data-agent-uuid="${agent.uuid}" data-agent-name="${agent.displayName}">❤️</button>
            <img src="${agent.displayIcon}" alt="${agent.displayName}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${agent.displayName}</h3>
                <p class="card-subtitle">${agent.role?.displayName || 'Unknown'}</p>
            </div>
        </div>
    `).join('');

    // Add handlers
    document.querySelectorAll('.card[data-agent-id]').forEach(card => {
        card.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (!target.classList.contains('favorite-btn')) {
                const agentId = (card as HTMLElement).dataset.agentId!;
                showAgentDetail(agentId);
            }
        });
    });

    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const button = e.currentTarget as HTMLElement;
            const agentUuid = button.dataset.agentUuid!;
            const success = await removeFavorite(agentUuid);
            if (success) {
                await fetchFavorites();
                renderAgents();
            }
        });
    });
}

function showAgentDetail(agentId: string): void {
    const agent = agents.find(a => a.uuid === agentId);
    if (!agent) return;

    const detailContent = document.getElementById('agent-detail-content')!;
    detailContent.innerHTML = `
        <div class="agent-detail">
            <div class="agent-header">
                <img src="${agent.fullPortrait || agent.displayIcon}" alt="${agent.displayName}" class="agent-portrait">
                <div class="agent-info">
                    <h2>${agent.displayName}</h2>
                    <p class="role">${agent.role?.displayName || 'Unknown Role'}</p>
                    <p class="description">${agent.description}</p>
                </div>
            </div>
            <div class="abilities">
                <h3>Fähigkeiten</h3>
                ${agent.abilities?.map((ability: any) => `
                    <div class="ability">
                        <div class="ability-header">
                            <img src="${ability.displayIcon}" alt="${ability.displayName}" class="ability-icon">
                            <span class="ability-name">${ability.displayName}</span>
                        </div>
                        <p class="ability-description">${ability.description}</p>
                    </div>
                `).join('') || '<p>Keine Fähigkeiten verfügbar.</p>'}
            </div>
        </div>
    `;

    switchView('agent-detail');
}

async function renderAdminPanel(): Promise<void> {
    const users = await fetchUsers();
    const tableContainer = document.getElementById('users-table')!;
    
    if (users.length === 0) {
        tableContainer.innerHTML = '<p style="color: var(--text-secondary); padding: 2rem;">Keine User gefunden oder keine Berechtigung.</p>';
        return;
    }

    tableContainer.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Favoriten</th>
                    <th>Erstellt am</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.username}</td>
                        <td>${user.isAdmin ? '<span class="admin-badge">ADMIN</span>' : 'User'}</td>
                        <td>${user._count?.favorites || 0}</td>
                        <td>${new Date(user.createdAt).toLocaleDateString('de-DE')}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// View Management
function switchView(viewName: string): void {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.add('active');
    }

    const targetLink = document.querySelector(`[data-view="${viewName}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    if (viewName === 'admin' && currentUser?.isAdmin) {
        renderAdminPanel();
    }
}

// Auth UI
function updateAuthUI(): void {
    const authButtons = document.getElementById('auth-buttons')!;
    const userInfo = document.getElementById('user-info')!;
    const favoritesLink = document.getElementById('favorites-link')!;
    const adminLink = document.getElementById('admin-link')!;

    if (currentUser) {
        authButtons.style.display = 'none';
        userInfo.style.display = 'flex';
        document.getElementById('username-display')!.textContent = currentUser.username;
        favoritesLink.style.display = 'block';
        
        if (currentUser.isAdmin) {
            adminLink.style.display = 'block';
        }

        fetchFavorites();
        renderAgents();
    } else {
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
        favoritesLink.style.display = 'none';
        adminLink.style.display = 'none';
        renderAgents();
    }
}

function showAuthModal(isLogin: boolean): void {
    const modal = document.getElementById('auth-modal')!;
    const modalTitle = document.getElementById('modal-title')!;
    const deleteSection = document.getElementById('delete-account-section')!;
    
    modalTitle.textContent = isLogin ? 'Login' : 'Registrieren';
    deleteSection.style.display = isLogin ? 'block' : 'none';
    
    modal.style.display = 'flex';
}

function hideAuthModal(): void {
    const modal = document.getElementById('auth-modal')!;
    modal.style.display = 'none';
    document.getElementById('auth-error')!.textContent = '';
    (document.getElementById('auth-form') as HTMLFormElement).reset();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check for existing token
    const token = getToken();
    if (token) {
        // Decode token to get user info (simple decode, not secure but ok for frontend)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            currentUser = {
                id: payload.userId,
                username: payload.username,
                isAdmin: payload.isAdmin,
            };
        } catch (e) {
            removeToken();
        }
    }

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = (e.currentTarget as HTMLElement).dataset.view!;
            switchView(view);
        });
    });

    // Back button
    document.getElementById('back-to-agents')!.addEventListener('click', () => {
        switchView('agents');
    });

    // Auth buttons
    document.getElementById('login-btn')!.addEventListener('click', () => showAuthModal(true));
    document.getElementById('register-btn')!.addEventListener('click', () => showAuthModal(false));
    document.getElementById('logout-btn')!.addEventListener('click', () => {
        currentUser = null;
        removeToken();
        favorites = [];
        updateAuthUI();
        switchView('agents');
    });

    // Modal close
    document.querySelector('.close')!.addEventListener('click', hideAuthModal);
    document.getElementById('auth-modal')!.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            hideAuthModal();
        }
    });

    // Auth form
    let isLoginMode = true;
    document.getElementById('login-btn')!.addEventListener('click', () => {
        isLoginMode = true;
        showAuthModal(true);
    });
    document.getElementById('register-btn')!.addEventListener('click', () => {
        isLoginMode = false;
        showAuthModal(false);
    });

    document.getElementById('auth-form')!.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = (document.getElementById('auth-username') as HTMLInputElement).value;
        const password = (document.getElementById('auth-password') as HTMLInputElement).value;
        const errorEl = document.getElementById('auth-error')!;

        try {
            const result = isLoginMode 
                ? await login(username, password)
                : await register(username, password);

            if (result.error) {
                errorEl.textContent = result.error;
            } else {
                setToken(result.token);
                currentUser = result.user;
                updateAuthUI();
                hideAuthModal();
            }
        } catch (error) {
            errorEl.textContent = 'Ein Fehler ist aufgetreten';
        }
    });

    // Delete account
    document.getElementById('delete-account-btn')!.addEventListener('click', async () => {
        if (!confirm('Bist du sicher? Diese Aktion kann nicht rückgängig gemacht werden!')) {
            return;
        }

        try {
            await deleteAccount();
            currentUser = null;
            removeToken();
            favorites = [];
            updateAuthUI();
            hideAuthModal();
            alert('Account wurde gelöscht');
        } catch (error) {
            alert('Fehler beim Löschen des Accounts');
        }
    });

    // Initial load
    updateAuthUI();
    fetchAgents();
    fetchWeapons();
    fetchMaps();
});