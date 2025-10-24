function openWindow(id) {
    const win = document.getElementById(id);
    win.classList.remove('hidden', 'minimized');
    bringToFront(win);
}
function closeWindow(id) {
    document.getElementById(id).classList.add('hidden');
}
function maximizeWindow(id) {
    const win = document.getElementById(id);
    win.classList.toggle('maximized');
    bringToFront(win);
}
function minimizeWindow(id) {
    const win = document.getElementById(id);
    win.classList.add('minimized');
}

// Z-index dinámico para ventanas
let zIndexCounter = 200;
function bringToFront(win) {
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
}

// Drag & drop para ventanas (smooth)
let dragData = null;
let lastX = 0, lastY = 0;
document.querySelectorAll('.window-header').forEach(header => {
    header.addEventListener('mousedown', function(e) {
        const win = header.parentElement;
        if (win.classList.contains('maximized')) return;
        bringToFront(win);
        dragData = {
            win,
            offsetX: e.clientX - win.offsetLeft,
            offsetY: e.clientY - win.offsetTop
        };
        lastX = win.offsetLeft;
        lastY = win.offsetTop;
        win.style.transition = 'none';
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', stopDrag);
    });
});
function dragMove(e) {
    if (!dragData) return;
    let x = e.clientX - dragData.offsetX;
    let y = e.clientY - dragData.offsetY;
    // Limitar dentro del escritorio 
    x = Math.max(0, Math.min(window.innerWidth - dragData.win.offsetWidth, x));
    y = Math.max(0, Math.min(window.innerHeight - dragData.win.offsetHeight, y));
    // para que las ventanas se muevan suavemente
    lastX += (x - lastX) * 0.3;
    lastY += (y - lastY) * 0.3;
    dragData.win.style.left = lastX + 'px';
    dragData.win.style.top = lastY + 'px';
}
function stopDrag() {
    if (dragData) {
        dragData.win.style.transition = '';
    }
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', stopDrag);
    dragData = null;
}

// Abrir ventanas desde iconos
document.getElementById('icon-phantom-blood').addEventListener('click', function() {
    openWindow('window-phantom-blood');
});
document.getElementById('icon-battle-tendency').addEventListener('click', function() {
    openWindow('window-battle-tendency');
});
document.getElementById('icon-stardust-crusaders').addEventListener('click', function() {
    openWindow('window-stardust-crusaders');
});
document.getElementById('icon-diamond-is-unbreakable').addEventListener('click', function() {
    openWindow('window-diamond-is-unbreakable');
});
document.getElementById('icon-golden-wind').addEventListener('click', function() {
    openWindow('window-golden-wind');
});
document.getElementById('icon-stone-ocean').addEventListener('click', function() {
    openWindow('window-stone-ocean');
});
document.getElementById('icon-steel-ball-run').addEventListener('click', function() {
    openWindow('window-steel-ball-run');
});
document.getElementById('icon-jojolion').addEventListener('click', function() {
    openWindow('window-jojolion');
});
document.getElementById('icon-the-jojolands').addEventListener('click', function() {
    openWindow('window-the-jojolands');
});

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