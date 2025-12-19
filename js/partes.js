// Función para obtener parámetros de la URL
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
    const parteData = datos[parte];
    if (!parteData) {
        console.error('Parte no encontrada:', parte);
        return;
    }

    const summary = parteData.summary;
    const items = parteData.characters || parteData.stands || [];
    const isCharacters = !!parteData.characters;

    // Actualizar título de la página
    document.title = `JoJo's Bizarre Adventure - ${parte}`;

    // Actualizar header
    const header = document.querySelector('header h1');
    header.textContent = `${parte}`;

    // Actualizar imagen y título de la parte
    const partDiv = document.querySelector('.part');

    // Asignar imagen como fondo con parallax
    const imagenesPartes = {
        "Phantom Blood": "",
        "Battle Tendency": "",
        "Stardust Crusaders": "",
        "Vento Aureo": "",
        "Stone Ocean": "",
        "Steel Ball Run": "",
        "JoJolion": "",
        "The JoJoLands": ""
    };
    partDiv.style.backgroundImage = `url(${imagenesPartes[parte] || "assets/imgs/jojosBanner.jpg"})`;

    // Asignar mapa basado en la parte
    const mapasPartes = {
        "Phantom Blood": "https://static.jojowiki.com/images/thumb/2/29/latest/20210220034958/Phantom_Blood_Map_-_England.png/1000px-Phantom_Blood_Map_-_England.png",
        "Battle Tendency": "https://static.jojowiki.com/images/thumb/4/4d/latest/20210226072157/Battle_Tendency_Map_-_America_and_Europe.png/1000px-Battle_Tendency_Map_-_America_and_Europe.png",
        "Stardust Crusaders": "https://static.jojowiki.com/images/thumb/0/00/latest/20210308214524/Stardust_Crusaders_Map_-_Asia.png/1000px-Stardust_Crusaders_Map_-_Asia.png",
        "Diamond is Unbreakable": "https://static.jojowiki.com/images/thumb/3/3c/latest/20210309060010/Diamond_is_Unbreakable_Map_-_Morioh.png/1000px-Diamond_is_Unbreakable_Map_-_Morioh.png",
        "Vento Aureo": "https://static.jojowiki.com/images/thumb/5/51/latest/20210309041001/Vento_Aureo_Map_-_Italy.png/1000px-Vento_Aureo_Map_-_Italy.png",
        "Stone Ocean": "https://static.jojowiki.com/images/thumb/b/b2/latest/20210309024448/Stone_Ocean_Map_-_USA.png/1000px-Stone_Ocean_Map_-_USA.png",
        "Steel Ball Run": "https://static.jojowiki.com/images/thumb/8/80/latest/20210309222832/Steel_Ball_Run_Map_-_North_America.png/1000px-Steel_Ball_Run_Map_-_North_America.png",
        "JoJolion": "https://static.jojowiki.com/images/thumb/1/16/latest/20221212065725/Morioh_JJL_map.png/1000px-Morioh_JJL_map.png",
        "The JoJoLands": "https://static.jojowiki.com/images/thumb/c/c0/latest/20231219044452/Hawaii_Map.png/1000px-Hawaii_Map.png"
    };
    const mapaImg = document.getElementById('mapa-imagen');
    mapaImg.src = mapasPartes[parte] || "assets/imgs/jojosBanner.jpg";
    mapaImg.alt = `Mapa de ${parte}`;

    // Asignar manga basado en la parte
    const mangaPartes = {
        "Phantom Blood": "https://static.jojowiki.com/images/thumb/d/dc/latest/20210407134029/JoJo%27s_Bizarre_Adventure_The_Animation_Japanese_Poster.jpg/800px-JoJo%27s_Bizarre_Adventure_The_Animation_Japanese_Poster.jpg",
        "Battle Tendency": "https://static.jojowiki.com/images/1/15/latest/20240313005515/Volume_5.jpg",
        "Stardust Crusaders": "https://static.jojowiki.com/images/a/a9/latest/20191015214651/Volume_12.jpg",
        "Diamond is Unbreakable": "https://static.jojowiki.com/images/3/3d/latest/20191015213447/Volume_46.jpg",
        "Vento Aureo": "https://static.jojowiki.com/images/5/5e/latest/20191015215133/Volume_63.jpg",
        "Stone Ocean": "https://static.jojowiki.com/images/a/a6/latest/20191015214320/Volume_80.jpg",
        "Steel Ball Run": "https://static.jojowiki.com/images/2/24/latest/20240416031529/Volume_104.jpg",
        "JoJolion": "https://static.jojowiki.com/images/f/f0/latest/20250101131855/Volume_112.jpg",
        "The JoJoLands": "https://static.jojowiki.com/images/e/e8/latest/20251218030928/Volume_138.jpg"
    };
    const mangaImg = document.getElementById('manga-imagen');
    mangaImg.src = mangaPartes[parte] || "assets/imgs/jojosBanner.jpg";
    mangaImg.alt = `Portada del manga de ${parte}`;

    // Generar resumen
    const resumenP = document.querySelector('.info p');
    resumenP.textContent = summary;

    // Generar lista de personajes o stands
    const charactersList = document.getElementById('characters-list');
    charactersList.innerHTML = ''; // Limpiar contenido anterior

    if (items.length > 0) {
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'character-item';

            if (item.stand_images && item.stand_images.length > 0) {
                // Flip card for stands
                itemDiv.classList.add('flip-card');
                const flipInner = document.createElement('div');
                flipInner.className = 'flip-card-inner';

                // Front
                const front = document.createElement('div');
                front.className = 'flip-card-front';
                const img = document.createElement('img');
                img.src = item.user_images ? item.user_images[0] : 'assets/imgs/UserIcon.png';
                img.alt = item.user;
                img.style.width = '120px';
                const infoDiv = document.createElement('div');
                infoDiv.innerHTML = `
                    <h3>${item.user}</h3>
                    ${item.gender ? `<p>Género: ${item.gender}</p>` : ''}
                    ${item.hair_color ? `<p>Color de cabello: ${item.hair_color}</p>` : ''}
                    ${item.eye_color ? `<p>Color de ojos: ${item.eye_color}</p>` : ''}
                    ${item.type ? `<p>Tipo: ${item.type.join(', ')}</p>` : ''}
                `;
                front.appendChild(img);
                front.appendChild(infoDiv);

                // Back
                const back = document.createElement('div');
                back.className = 'flip-card-back';
                const standImg = document.createElement('img');
                standImg.src = item.stand_images[0];
                standImg.alt = item.stand;
                standImg.style.width = '120px';
                const standInfo = document.createElement('div');
                standInfo.innerHTML = `
                    <h3>${item.stand}</h3>
                    <p>Stand de ${item.user}</p>
                `;
                back.appendChild(standImg);
                back.appendChild(standInfo);

                flipInner.appendChild(front);
                flipInner.appendChild(back);
                itemDiv.appendChild(flipInner);
            } else {
                // Normal card
                const img = document.createElement('img');
                img.src = item.user_images ? item.user_images[0] : 'assets/imgs/UserIcon.png';
                img.alt = item.user || item.stand;
                img.style.width = '120px';

                const infoDiv = document.createElement('div');
                infoDiv.innerHTML = `
                    <h3>${item.user || item.stand}</h3>
                    ${item.gender ? `<p>Género: ${item.gender}</p>` : ''}
                    ${item.hair_color ? `<p>Color de cabello: ${item.hair_color}</p>` : ''}
                    ${item.eye_color ? `<p>Color de ojos: ${item.eye_color}</p>` : ''}
                    ${item.hamon !== undefined ? `<p>Hamon: ${item.hamon ? 'Sí' : 'No'}</p>` : ''}
                    ${item.type ? `<p>Tipo: ${item.type.join(', ')}</p>` : ''}
                `;

                itemDiv.appendChild(img);
                itemDiv.appendChild(infoDiv);
            }

            charactersList.appendChild(itemDiv);
        });
    } else {
        charactersList.innerHTML = '<p>No hay información disponible.</p>';
    }

    // Actualizar navegación lateral
    const asideLinks = document.querySelectorAll('aside a');
    asideLinks[0].href = 'escritorio.html'; // Escritorio
    asideLinks[1].href = '#res'; // Resumen
    asideLinks[2].href = '#characters-section'; // Personajes
    asideLinks[3].href = '#mapas'; // Localizaciones
    asideLinks[4].href = '#manga'; // Manga
    asideLinks[5].href = '#foot'; // Bajar
}

// Función principal para inicializar la página
async function inicializarPagina() {
    const parte = getURLParameter('part');
    if (!parte) {
        document.body.innerHTML = '<h1 style="color: white; text-align: center; margin-top: 50px;">Error: No se especificó una parte en la URL. Agrega ?part=NombreDeLaParte</h1>';
        return;
    }

    const datos = await cargarDatos();
    if (datos) {
        generarContenidoParte(parte, datos);
    } else {
        document.body.innerHTML = '<h1 style="color: white; text-align: center; margin-top: 50px;">Error: No se pudieron cargar los datos.</h1>';
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarPagina);
