
// Gestión simple de perfiles estáticos y navegación a escritorio.html
const SESSION_KEY = 'jojos_session';

// Perfiles estáticos (modificables en memoria)
let staticUsers = {
    'Guest': { initial: 'G', password: '', color: 'linear-gradient(135deg,#fbe1ad,#7a64b7)' }
};

// elementos DOM para añadir a la interfaz
const profilesContainer = document.getElementById('profilesContainer');
const createBtn = document.getElementById('createBtn');
const guestBtn = document.getElementById('guestBtn');

const createModal = document.getElementById('createModal');
const newUsername = document.getElementById('newUsername');
const newPassword = document.getElementById('newPassword');
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
        card.addEventListener('click', () => openPassw(name));
        profilesContainer.appendChild(card);
    });
}

const passwModal = document.getElementById('passwModal');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const loginBtn = document.getElementById('loginBtn');
let currentLoginUser = null;

function openPassw(name){
    currentLoginUser = name;
    loginError.textContent = '';
    loginPassword.value = '';
    passwModal.classList.remove('invisible');
    loginPassword.focus();
}

function closePassw(){
    passwModal.classList.add('invisible');
}

function loginUser(){
    const name = currentLoginUser;
    const passw = loginPassword.value;
    const user = staticUsers[name];

    if (!user || user.password !== passw) {
        loginError.textContent = 'Contraseña incorrecta.';
        return;
    }
    
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
    newPassword.value = '';
    newInitial.value = '';
    createModal.classList.remove('hidden');
    newUsername.focus();
}

function closeCreate(){
    const createModal = document.getElementById('createModal');
    if(createModal) createModal.classList.add('hidden');
}

function createProfileHandler(){
    // validaciones simples para contraseña y nombre 
    const name = (newUsername.value || '').trim();
    const passw = (newPassword.value || '').trim();
    if(!name || !passw){
        createError.textContent = 'Falta nombre o contraseña.';
        return;
    }
    if(staticUsers[name]){
        createError.textContent = 'Ese nombre ya existe.';
        return;
    }

    const init = (newInitial.value || name.charAt(0) || '').toUpperCase();

    // Guardar la contraseña en el objeto de usuario
    // color aleatorio pastel
    const hue = Math.floor(Math.random()*360);
    const color = `linear-gradient(135deg,hsl(${hue} 70% 85%), hsl(${(hue+30)%360} 80% 75%))`;
    staticUsers[name] = { initial: init, password: passw, color };
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
loginBtn.addEventListener('click', loginUser);

// cerrar modal
const cancelCreate = document.getElementById('cancelCreate');
if(cancelCreate) cancelCreate.addEventListener('click', closeCreate);

const cancelLogin = document.getElementById('cancelLogin');
if(cancelLogin) cancelLogin.addEventListener('click', closePassw);

// cerrar modal con ESC
window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeCreate();
});

// guardar perfil
if(saveProfile) saveProfile.addEventListener('click', createProfileHandler);
loginPassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loginUser();
});


// init
(function init(){
    renderProfiles();
})();
