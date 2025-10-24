
// Gestión simple de perfiles estáticos y navegación a escritorio.html
const SESSION_KEY = 'jojos_session';

// Perfiles estáticos (modificables en memoria)
let staticUsers = {
    'Usuario1': { initial: 'U', color: 'linear-gradient(135deg,#ffffff,#cfefff)' },
    'Usuario2': { initial: 'V', color: 'linear-gradient(135deg,#ffffff,#cfefff)' }
};

const profilesContainer = document.getElementById('profilesContainer');
const createBtn = document.getElementById('createBtn');
const guestBtn = document.getElementById('guestBtn');

const createModal = document.getElementById('createModal');
const newUsername = document.getElementById('newUsername');
const newInitial = document.getElementById('newInitial');
const saveProfile = document.getElementById('saveProfile');
const createError = document.getElementById('createError');

function renderProfiles(){
    const users = staticUsers;
    profilesContainer.innerHTML = '';
    const keys = Object.keys(users);
    keys.forEach(name => {
        const u = users[name];
        const card = document.createElement('div');
        card.className = 'profile';
        card.title = name;
        card.innerHTML = `
            <div class="avatar" style="background:${u.color||'#dfe'}">${u.initial || name.charAt(0).toUpperCase()}</div>
            <div class="username">${name}</div>
        `;
        card.addEventListener('click', () => loginUser(name));
        profilesContainer.appendChild(card);
    });
}

function loginUser(name){
    const session = { user: name, guest: false };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    proceedToDesktop();
}

function guestLogin(){
    const session = { user: 'Invitado', guest: true };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    proceedToDesktop();
}

function openCreate(){
    createError.textContent = '';
    newUsername.value = '';
    newInitial.value = '';
    createModal.classList.remove('hidden');
    newUsername.focus();
}

function closeCreate(){
    const createModal = document.getElementById('createModal');
    if(createModal) createModal.classList.add('hidden');
}

function createProfileHandler(){
    const name = (newUsername.value || '').trim();
    if(!name){
        createError.textContent = 'Introduce un nombre de usuario.';
        return;
    }
    if(staticUsers[name]){
        createError.textContent = 'Ese nombre ya existe.';
        return;
    }
    const init = (newInitial.value || name.charAt(0) || '').toUpperCase();
    // color aleatorio pastel
    const hue = Math.floor(Math.random()*360);
    const color = `linear-gradient(135deg,hsl(${hue} 70% 85%), hsl(${(hue+30)%360} 80% 75%))`;
    staticUsers[name] = { initial: init, color };
    renderProfiles();
    closeCreate();
}

function proceedToDesktop(){
    // breve transición visual opcional (puedes adaptar)
    document.body.style.transition = 'opacity .35s';
    document.body.style.opacity = '0';
    setTimeout(()=> location.href = 'escritorio.html', 350);
}

// eventos
createBtn.addEventListener('click', openCreate);
guestBtn.addEventListener('click', guestLogin);

// cerrar modal
const cancelCreate = document.getElementById('cancelCreate');
if(cancelCreate) cancelCreate.addEventListener('click', closeCreate);

// cerrar modal con ESC
window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeCreate();
});

// guardar perfil
if(saveProfile) saveProfile.addEventListener('click', createProfileHandler);

// init
(function init(){
    renderProfiles();
})();
