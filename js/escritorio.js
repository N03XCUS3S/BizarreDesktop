
// Apagar transición
document.querySelector('.taskbar-icon:last-child a').addEventListener('click', function(e) {
    e.preventDefault();
    let shutdown = document.createElement('div');
    shutdown.className = 'shutdown-transition';
    shutdown.innerHTML = '<div class="shutdown-text">Apagando...</div>';
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

// mostrar al cargar
showUser();

