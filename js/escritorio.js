// ==========================
// APAGAR (TRANSICIÓN) - MEJORADO
// ==========================
const taskbarPower = document.getElementById('taskbarPower');

taskbarPower.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Feedback visual
    taskbarPower.style.transform = 'scale(0.9)';
    
    let shutdown = document.createElement('div');
    shutdown.className = 'shutdown-transition';
    shutdown.innerHTML = '<div class="shutdown-text">To be continued...</div>';
    document.body.appendChild(shutdown);
    setTimeout(() => location.href = 'index.html', 1400);
});

// Soporte para teclado
taskbarPower.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        taskbarPower.click();
    }
});


// ==========================
// SESIÓN DE USUARIO
// ==========================
const SESSION_KEY = 'jojos_session';
const taskbarUser = document.getElementById('taskbarUser');
const userLabel = document.getElementById('userLabel');

function getSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
    catch { return null; }
}

function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
}

function showUser() {
    const s = getSession();
    if (!s || !s.user) return;
    userLabel.textContent = s.guest ? 'Invitado' : s.user;
    taskbarUser.title = `Usuario: ${s.user}`;
}

taskbarUser.addEventListener('click', () => {
    const s = getSession();
    const name = s && s.user ? s.user : 'Invitado';
    if (confirm(`Cerrar sesión de "${name}" y volver al inicio?`)) {
        clearSession();
        location.href = 'sesion.html';
    }
});

showUser();


// ==========================
// ABRIR PARTES - MEJORADO PARA USABILIDAD
// ==========================
function abrirParte(parte) {
    // Feedback visual antes de navegar
    const botonActivo = document.querySelector('.desktop-icon.active');
    if (botonActivo) botonActivo.classList.remove('active');
    
    // Navegar
    location.href = `partes.html?part=${encodeURIComponent(parte)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const iconos = {
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

    Object.keys(iconos).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // Click handler
            el.addEventListener('click', () => abrirParte(iconos[id]));
            
            // Soporte para teclado (Enter)
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    abrirParte(iconos[id]);
                }
            });
            
            // Feedback visual al hacer click
            el.addEventListener('mousedown', () => {
                el.style.transform = 'scale(0.95)';
            });
            el.addEventListener('mouseup', () => {
                el.style.transform = '';
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        }
    });
});


// ==========================
// MÚSICA DE FONDO
// ==========================
const taskbarMusic = document.getElementById('taskbarMusic');
const youtubeAudio = document.getElementById('youtube-audio');

const MUSIC_KEY = 'jojos_music_settings';

// estado persistente
let musicState = JSON.parse(localStorage.getItem(MUSIC_KEY)) || {
    muted: true,
    volume: 60
};

let currentVolume = musicState.muted ? 0 : musicState.volume;
let targetVolume = currentVolume;
let fadeInterval = null;

// aplicar icono inicial
if (musicState.muted) taskbarMusic.classList.add('muted');

// guardar estado
function saveMusicState() {
    localStorage.setItem(MUSIC_KEY, JSON.stringify(musicState));
}

// enviar volumen a YouTube
function setYTVolume(vol) {
    youtubeAudio.contentWindow.postMessage(
        JSON.stringify({
            event: "command",
            func: "setVolume",
            args: [vol]
        }),
        "*"
    );
}

// fade suave
function fadeTo(volume) {
    clearInterval(fadeInterval);
    targetVolume = volume;

    fadeInterval = setInterval(() => {
        if (currentVolume === targetVolume) {
            clearInterval(fadeInterval);
            return;
        }
        currentVolume += currentVolume < targetVolume ? 2 : -2;
        currentVolume = Math.max(0, Math.min(100, currentVolume));
        setYTVolume(currentVolume);
    }, 30);
}

// primer click → activar sonido si estaba mute
document.addEventListener('click', () => {
    if (musicState.muted) {
        youtubeAudio.contentWindow.postMessage(
            '{"event":"command","func":"unMute","args":""}',
            "*"
        );
        fadeTo(musicState.volume);
        musicState.muted = false;
        taskbarMusic.classList.remove('muted');
        saveMusicState();
    }
}, { once: true });

// botón música (mute / unmute)
taskbarMusic.addEventListener('click', (e) => {
    e.stopPropagation();

    if (musicState.muted) {
        youtubeAudio.contentWindow.postMessage(
            '{"event":"command","func":"unMute","args":""}',
            "*"
        );
        fadeTo(musicState.volume);
        taskbarMusic.classList.remove('muted');
        musicState.muted = false;
    } else {
        fadeTo(0);
        youtubeAudio.contentWindow.postMessage(
            '{"event":"command","func":"mute","args":""}',
            "*"
        );
        taskbarMusic.classList.add('muted');
        musicState.muted = true;
    }

    saveMusicState();
});

// ==========================
//   VOLUMEN MÚSICA
// ==========================
// Puedes llamarlo desde un slider (0–100)
window.setMusicVolume = function (vol) {
    vol = Math.max(0, Math.min(100, vol));
    musicState.volume = vol;
    saveMusicState();

    if (!musicState.muted) fadeTo(vol);
};

const volumeSlider = document.getElementById('volumeSlider');

// valor inicial desde localStorage
volumeSlider.value = musicState.volume;

// cambiar volumen al mover el slider
volumeSlider.addEventListener('input', (e) => {
    const vol = parseInt(e.target.value, 10);

    setMusicVolume(vol); // función que YA tienes

    // si baja a 0 → mute visual
    if (vol === 0) {
        musicState.muted = true;
        taskbarMusic.classList.add('muted');
    } else {
        musicState.muted = false;
        taskbarMusic.classList.remove('muted');
    }

    saveMusicState();
});
