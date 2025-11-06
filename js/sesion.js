
// Gestión simple de perfiles estáticos y navegación a escritorio.html
const SESSION_KEY = 'jojos_session';

function randomColor() {
    const hue = Math.floor(Math.random() * (320 - 270 + 1)) + 270;
    const nextHue = (hue + 20) % 360;

    const gradientTypes = ['linear', 'radial', 'conic'];
    const chosenType = gradientTypes[Math.floor(Math.random() * gradientTypes.length)];

    const saturation1 = 85;
    const saturation2 = 90;
    const lightness1 = 40;
    const lightness2 = 30;

    switch (chosenType) {
        case 'linear':
            const angle = Math.floor(Math.random() * 360);
            return `linear-gradient(${angle}deg, hsl(${hue} ${saturation1}% ${lightness1}%), hsl(${nextHue} ${saturation2}% ${lightness2}%))`;

        case 'radial':
            return `radial-gradient(circle at center, hsl(${hue} ${saturation1}% ${lightness1}%), hsl(${nextHue} ${saturation2}% ${lightness2}%))`;

        case 'conic':
            return `conic-gradient(from 0deg at center, hsl(${hue} 85% 40%) 0deg, hsl(${(hue + 10) % 360} 80% 45%) 72deg,hsl(${(hue + 20) % 360} 85% 35%) 144deg,hsl(${(hue + 30) % 360} 80% 50%) 216deg,hsl(${(hue + 40) % 360} 90% 38%) 288deg,hsl(${hue} 85% 40%) 360deg`
    }
}

// Perfiles persistentes en localStorage
const USERS_KEY = 'jojos_users';

function loadUsers() {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) {
        return JSON.parse(stored);
    } else {
        return {
            'Guest': { password: '', color: randomColor() }
        };
    }
}

function saveUsers() {
    localStorage.setItem(USERS_KEY, JSON.stringify(staticUsers));
}

let staticUsers = loadUsers();

// elementos DOM para añadir a la interfaz
const profilesContainer = document.getElementById('profilesContainer');
const profilesList = document.getElementById('profilesList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const createBtn = document.getElementById('createBtn');
const guestBtn = document.getElementById('guestBtn');

const createModal = document.getElementById('createModal');
const newUsername = document.getElementById('newUsername');
const newPassword = document.getElementById('newPassword');

const saveProfile = document.getElementById('saveProfile');
const createError = document.getElementById('createError');

let currentIndex = 0;
const profilesPerPage = 5;

function renderProfiles(){
    const users = staticUsers;
    const keys = Object.keys(users);
    const totalProfiles = keys.length;
    const start = currentIndex;
    const end = Math.min(start + profilesPerPage, totalProfiles);
    const visibleKeys = keys.slice(start, end);

    profilesList.innerHTML = '';
    visibleKeys.forEach(name => {
        const u = users[name];
        const card = document.createElement('div');
        card.className = 'profile';
        card.title = name;
        card.innerHTML = `
            <div class="avatar" style="background:${u.color||'#dfe'}">${name}</div>
        `;
        card.addEventListener('click', () => openPassw(name));
        profilesList.appendChild(card);
    });

    // Update navigation buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = end >= totalProfiles;
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
    createModal.classList.remove('hidden');
    newUsername.focus();
}

function closeCreate(){
    const createModal = document.getElementById('createModal');
    if(createModal) createModal.classList.add('hidden');
}

function createProfileHandler(){
    // validaciones simples para contraseña y nombre
    const name = (newUsername.value || '').trim().replace(" ","-");
    const passw = (newPassword.value || '').trim();
    if(!name || !passw){
        createError.textContent = 'Falta nombre o contraseña.';
        return;
    }
    if(staticUsers[name]){
        createError.textContent = 'Ese nombre ya existe.';
        return;
    }

    // Guardar la contraseña en el objeto de usuario
    // color aleatorio
    const color = randomColor();
    staticUsers[name] = { password: passw, color };
    saveUsers(); // Persistir en localStorage
    renderProfiles();
    closeCreate();
}


function proceedToDesktop(){
    // breve transición visual opcional (puedes adaptar)
    document.body.style.transition = 'opacity .35s';
    document.body.style.opacity = '0';
    setTimeout(()=> location.href = 'escritorio.html', 350);
}

// Navigation functions
function prevProfiles() {
    if (currentIndex > 0) {
        currentIndex -= profilesPerPage;
        renderProfiles();
    }
}

function nextProfiles() {
    const keys = Object.keys(staticUsers);
    if (currentIndex + profilesPerPage < keys.length) {
        currentIndex += profilesPerPage;
        renderProfiles();
    }
}

// eventos
prevBtn.addEventListener('click', prevProfiles);
nextBtn.addEventListener('click', nextProfiles);
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
