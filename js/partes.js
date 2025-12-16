on// Función para obtener parámetros de la URL
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Función para cargar datos desde data.json
async function cargarDatos() {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error cargando datos:', error);
        return null;
    }
}

// Función para generar el contenido de la página de partes
function generarContenidoParte(parte, datos) {
    const stands = datos[parte];
    if (!stands) {
        console.error('Parte no encontrada:', parte);
        return;
    }

    // Actualizar título de la página
    document.title = `JoJo's Bizarre Adventure - ${parte}`;

    // Actualizar header
    const header = document.querySelector('header h1');
    header.textContent = `Parte: ${parte}`;

    // Actualizar imagen y título de la parte
    const partDiv = document.querySelector('.part');
    const tituloH2 = partDiv.querySelector('h2');
    const imagen = partDiv.querySelector('img');

    tituloH2.textContent = parte;

    // Asignar imagen basada en la parte (usando lógica simple)
    const imagenesPartes = {
        "Stardust Crusaders": "assets/imgs/stardustCrusaders.png",
        "Diamond is Unbreakable": "assets/imgs/crazyDiamond.png",
        "Vento Aureo": "assets/imgs/goldenWind.png",
        "Stone Ocean": "assets/imgs/stoneOcean.png"
    };
    imagen.src = imagenesPartes[parte] || "assets/imgs/jojosBanner.jpg";
    imagen.alt = `Imagen de ${parte}`;

    // Generar resumen con información de los stands
    const resumenP = document.querySelector('.info p');
    const numStands = stands.length;
    const standNames = stands.slice(0, 5).map(s => s.stand).join(', ');
    resumenP.textContent = `Esta parte presenta ${numStands} stands. Algunos stands destacados incluyen: ${standNames}${numStands > 5 ? ' y más...' : '.'}`;

    // Actualizar navegación lateral
    const asideLinks = document.querySelectorAll('aside a');
    asideLinks[0].href = 'escritorio.html'; // Inicio
    asideLinks[1].href = '#res'; // Resumen
    asideLinks[2].href = '#foot'; // Bajar (asumiendo que hay un footer)
}

// Función principal para inicializar la página
async function inicializarPagina() {
    const parte = getURLParameter('part');
    if (!parte) {
        console.error('No se especificó una parte en la URL');
        return;
    }

    const datos = await cargarDatos();
    if (datos) {
        generarContenidoParte(parte, datos);
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarPagina);
