// Apagar transición
document.querySelector('.taskbar-icon:last-child a').addEventListener('click', function(e) {
    e.preventDefault();
    let shutdown = document.createElement('div');
    shutdown.className = 'shutdown-transition';
    shutdown.innerHTML = '<div class="shutdown-text">To be continued...</div>';
    document.body.appendChild(shutdown);
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1400);
});

const SESSION_KEY = 'jojos_session';
const taskbarUser = document.getElementById('taskbarUser');
const userLabel = document.getElementById('userLabel');

function getSession(){
    try{ return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
    catch(e){ return null; }
}

function clearSession(){
    sessionStorage.removeItem(SESSION_KEY);
}

function showUser(){
    const s = getSession();
    if(!s || !s.user){
        userLabel.textContent = '';
        // si no hay sesión, se queda en escritorio pero no muestra usuario
        return;
    }
    userLabel.textContent = s.guest ? 'Invitado' : s.user;
    taskbarUser.title = `Usuario: ${s.user}`;
}

taskbarUser.addEventListener('click', ()=>{
    const s = getSession();
    const name = s && s.user ? s.user : 'Invitado';
    const ok = confirm(`Cerrar sesión de "${name}" y volver al inicio?`);
    if(ok){
        clearSession();
        location.href = 'index.html';
    }
});

// Función para abrir página de parte
function abrirParte(parte) {
    const url = `partes.html?part=${encodeURIComponent(parte)}`;
    location.href = url;
}

// Agregar event listeners a los iconos de las partes
document.addEventListener('DOMContentLoaded', function() {
    const iconosPartes = {
        'icon-phantom-blood': 'Phantom Blood',
        'icon-battle-tendency': 'Battle Tendency',
        'icon-stardust-crusaders': 'Stardust Crusaders',
        'icon-diamond-is-unbreakable': 'Diamond is Unbreakable',
        'icon-golden-wind': 'Vento Aureo',
        'icon-stone-ocean': 'Stone Ocean',
        'icon-steel-ball-run': 'Steel Ball Run',
        'icon-jojolion': 'JoJolion',
        'icon-the-jojolands': 'The JoJoLands'
    };

    Object.keys(iconosPartes).forEach(iconId => {
        const iconElement = document.getElementById(iconId);
        if (iconElement) {
            iconElement.addEventListener('click', function() {
                abrirParte(iconosPartes[iconId]);
            });
        }
    });
});

// mostrar al cargar
showUser();
