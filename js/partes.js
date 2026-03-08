// ============================================
// JOJO'S DESKTOP - PARTES.JS
// Sistema de pestañas, modal y partículas
// ============================================

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

// ============================================
// SISTEMA DE PESTAÑAS (TABS)
// ============================================
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-tab]');
    const panels = document.querySelectorAll('.tab-panel');

    function activateTab(tabId) {
        // Desactivar todas las tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Desactivar todos los paneles
        panels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Activar la tab seleccionada
        const activeTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
        const activeLink = document.querySelector(`.sidebar-link[data-tab="${tabId}"]`);
        const activePanel = document.getElementById(`panel-${tabId}`);

        if (activeTab) {
            activeTab.classList.add('active');
            activeTab.setAttribute('aria-selected', 'true');
        }
        
        if (activeLink) {
            activeLink.classList.add('active');
        }

        if (activePanel) {
            activePanel.classList.add('active');
        }
    }

    // Event listeners para las tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            activateTab(tabId);
            
            // Actualizar URL sin recargar
            history.pushState(null, null, `#${tabId}`);
        });
    });

    // Event listeners para los enlaces del sidebar
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            activateTab(tabId);
            
            // Scroll suave al contenido
            const panel = document.getElementById(`panel-${tabId}`);
            if (panel) {
                setTimeout(() => {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });

    // Manejar navegación con teclado
    tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            let newIndex = index;
            
            if (e.key === 'ArrowRight') {
                newIndex = (index + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft') {
                newIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (e.key === 'Home') {
                newIndex = 0;
            } else if (e.key === 'End') {
                newIndex = tabs.length - 1;
            }
            
            if (newIndex !== index) {
                tabs[newIndex].focus();
                tabs[newIndex].click();
            }
        });
    });

    // Verificar hash URL al cargar
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        activateTab(hash);
    }
}

// ============================================
// SISTEMA DE MODAL DE PERSONAJES
// ============================================
function initCharacterModal() {
    const modal = document.getElementById('character-modal');
    if (!modal) return;
    
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');

    function openModal(characterData) {
        // Llenar datos básicos
        document.getElementById('modal-title').textContent = characterData.name || characterData.user || characterData.stand || '';
        document.getElementById('modal-character-name').textContent = characterData.stand || '';
        
        const modalImg = document.getElementById('modal-character-image');
        modalImg.src = characterData.image || characterData.user_images?.[0] || characterData.stand_images?.[0] || 'assets/imgs/UserIcon.png';
        modalImg.alt = characterData.name || characterData.user || '';

        // Mostrar imagen del Stand si existe
        const standContainer = document.querySelector('.modal-stand-container');
        if (standContainer) {
            if (characterData.stand && characterData.stand_images && characterData.stand_images.length > 0) {
                standContainer.innerHTML = `
                    <div class="modal-stand-label">Stand</div>
                    <img class="modal-stand-image" src="${characterData.stand_images[0]}" alt="${characterData.stand}">
                `;
                standContainer.style.display = 'block';
            } else {
                standContainer.style.display = 'none';
            }
        }

        // Construir los detalles dinámicamente - MOSTRAR TODO
        const modalDetails = document.getElementById('modal-details');
        let detailsHTML = '';
        
        // Nombre del personaje
        if (characterData.name || characterData.user) {
            detailsHTML += `
                <div class="modal-detail">
                    <span class="detail-label">Nombre</span>
                    <span class="detail-value">${characterData.name || characterData.user}</span>
                </div>
            `;
        }
        
        // Stand
        if (characterData.stand) {
            detailsHTML += `
                <div class="modal-detail">
                    <span class="detail-label">Stand</span>
                    <span class="detail-value">${characterData.stand}</span>
                </div>
            `;
        }
        
        // Tipo de Stand
        if (characterData.type && characterData.type.length > 0) {
            detailsHTML += `
                <div class="modal-detail">
                    <span class="detail-label">Tipo</span>
                    <span class="detail-value">${characterData.type.join(', ')}</span>
                </div>
            `;
        }
        
        // Género
        if (characterData.gender) {
            detailsHTML += `
                <div class="modal-detail">
                    <span class="detail-label">Género</span>
                    <span class="detail-value">${characterData.gender}</span>
                </div>
            `;
        }
        
        // Color de cabello
        if (characterData.hair_color) {
            detailsHTML += `
                <div class="modal-detail">
                    <span class="detail-label">Color de cabello</span>
                    <span class="detail-value">${characterData.hair_color}</span>
                </div>
            `;
        }
        
        // Color de ojos
        if (characterData.eye_color) {
            detailsHTML += `
                <div class="modal-detail">
                    <span class="detail-label">Color de ojos</span>
                    <span class="detail-value">${characterData.eye_color}</span>
                </div>
            `;
        }
        
        // Hamon (si existe)
        if (characterData.hamon !== undefined) {
            detailsHTML += `
                <div class="modal-detail">
                    <span class="detail-label">Hamon</span>
                    <span class="detail-value">${characterData.hamon ? 'Sí' : 'No'}</span>
                </div>
            `;
        }
        
        // Descripción
        if (characterData.description || characterData.summary) {
            detailsHTML += `
                <div class="modal-detail" style="flex: 1;">
                    <span class="detail-label">Descripción</span>
                    <p class="detail-text">${characterData.description || characterData.summary}</p>
                </div>
            `;
        }
        
        modalDetails.innerHTML = detailsHTML;

        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Enfocar cierre
        setTimeout(() => modalClose.focus(), 100);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Cerrar con botón
    modalClose.addEventListener('click', closeModal);

    // Cerrar con backdrop
    modalBackdrop.addEventListener('click', closeModal);

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Exponer función global para abrir modal
    window.openCharacterModal = openModal;
}

// ============================================
// SISTEMA DE MODAL DE MAPA
// ============================================
function initMapModal() {
    const mapModal = document.getElementById('map-modal');
    if (!mapModal) return;
    
    const mapModalClose = mapModal.querySelector('.modal-close');
    const mapModalBackdrop = mapModal.querySelector('.modal-backdrop');
    const mapaImagen = document.getElementById('mapa-imagen');

    function openMapModal() {
        const src = mapaImagen.src;
        const alt = mapaImagen.alt;
        
        document.getElementById('map-modal-image').src = src;
        document.getElementById('map-modal-image').alt = alt;
        
        mapModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => mapModalClose.focus(), 100);
    }

    function closeMapModal() {
        mapModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Click en la imagen del mapa
    if (mapaImagen) {
        mapaImagen.addEventListener('click', openMapModal);
        mapaImagen.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openMapModal();
            }
        });
    }

    // Cerrar con botón
    mapModalClose.addEventListener('click', closeMapModal);

    // Cerrar con backdrop
    mapModalBackdrop.addEventListener('click', closeMapModal);

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mapModal.classList.contains('active')) {
            closeMapModal();
        }
    });
}

// ============================================
// SISTEMA DE MODAL DE MANGA
// ============================================
function initMangaModal() {
    const mangaModal = document.getElementById('manga-modal');
    if (!mangaModal) return;
    
    const mangaModalClose = mangaModal.querySelector('.modal-close');
    const mangaModalBackdrop = mangaModal.querySelector('.modal-backdrop');
    const mangaImagen = document.getElementById('manga-imagen');

    function openMangaModal() {
        const src = mangaImagen.src;
        const alt = mangaImagen.alt;
        
        document.getElementById('manga-modal-image').src = src;
        document.getElementById('manga-modal-image').alt = alt;
        
        mangaModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => mangaModalClose.focus(), 100);
    }

    function closeMangaModal() {
        mangaModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Click en la imagen del manga
    if (mangaImagen) {
        mangaImagen.addEventListener('click', openMangaModal);
        mangaImagen.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openMangaModal();
            }
        });
    }

    // Cerrar con botón
    mangaModalClose.addEventListener('click', closeMangaModal);

    // Cerrar con backdrop
    mangaModalBackdrop.addEventListener('click', closeMangaModal);

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mangaModal.classList.contains('active')) {
            closeMangaModal();
        }
    });
}

// ============================================
// SISTEMA DE PARTÍCULAS
// ============================================
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                speedY: Math.random() * 0.5 + 0.1,
                speedX: (Math.random() - 0.5) * 0.3,
                color: Math.random() > 0.5 ? '#e91e63' : '#9c27b0'
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            
            // Mover partícula
            particle.y -= particle.speedY;
            particle.x += particle.speedX;
            
            // Reiniciar partícula cuando sale de la pantalla
            if (particle.y < 0) {
                particle.y = canvas.height;
                particle.x = Math.random() * canvas.width;
            }
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
        });

        // Dibujar conexiones entre partículas cercanas
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#e91e63';
                    ctx.globalAlpha = (1 - distance / 150) * 0.15;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        animationId = requestAnimationFrame(drawParticles);
    }

    // Redimensionar en resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    // Reducir motion si es preferido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        resizeCanvas();
        createParticles();
        drawParticles();
    } else {
        // Fondo estático para usuarios que prefieren menos movimiento
        ctx.fillStyle = '#070707';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// ============================================
// GENERAR CONTENIDO DE LA PÁGINA
// ============================================
function generarContenidoParte(parte, datos) {
    const parteData = datos[parte];
    if (!parteData) {
        console.error('Parte no encontrada:', parte);
        return;
    }

    const summary = parteData.summary;
    const items = parteData.characters || parteData.stands || [];
    const parteInfo = datos[parte];

    // Actualizar título de la página
    document.title = `JoJo's Bizarre Adventure - ${parte}`;

    // Actualizar título del banner
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
        pageTitle.textContent = parte;
    }

    // Asignar imagen de fondo del banner
    const banner = document.getElementById('banner');
    const imagenesPartes = {
        "Phantom Blood": "url('https://www.minitopia.com.au/cdn/shop/collections/jojo.jpg?v=1646364766')",
        "Battle Tendency": "url('https://i.ebayimg.com/images/g/aWkAAOSwUu5fw9NI/s-l1200.jpg')",
        "Stardust Crusaders": "url('https://preview.redd.it/jojo-stardust-crusaders-wallpaper-made-by-me-v0-sm4at7rczs6e1.png?auto=webp&s=d580bf1993ae9111c54bdf6ab91fa2bfe9856e2e')",
        "Diamond is Unbreakable": "url('https://i0.wp.com/tokusatsunetwork.com/wp-content/uploads/2016/09/pART-4-e1475082190499.jpg?fit=1200%2C676&ssl=1')",
        "Vento Aureo": "url('https://i.pinimg.com/736x/b3/b5/2a/b3b52aa5acca3ba0119f2672db7f1822.jpg')",
        "Stone Ocean": "url('https://i.redd.it/je3qcco4w1g71.jpg')",
        "Steel Ball Run": "url('https://www.akibagamers.it/wp-content/uploads/2025/04/jojo-steel-ball-run-anime.jpg')",
        "JoJolion": "url('https://i.pinimg.com/736x/18/f6/d9/18f6d94dcfdf53ca5852675066c95f1c.jpg')",
        "The JoJoLands": "url('https://rollingstoneindia.com/wp-content/uploads/2023/02/The_JOJOLaands_UJ_banner.jpg')"
    };
    
    if (banner && imagenesPartes[parte]) {
        banner.style.backgroundImage = imagenesPartes[parte];
    }

    // Asignar mapa
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
    
    // Buscar el contenedor de scroll o crear uno
    let mapaContainer = document.getElementById('mapa-imagen')?.parentElement;
    const mapaImg = document.getElementById('mapa-imagen');
    if (mapaImg) {
        mapaImg.src = mapasPartes[parte] || "assets/imgs/jojosBanner.jpg";
        mapaImg.alt = `Mapa de ${parte}`;
    }

    // Asignar manga
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
    if (mangaImg) {
        mangaImg.src = mangaPartes[parte] || "assets/imgs/jojosBanner.jpg";
        mangaImg.alt = `Portada del manga de ${parte}`;
    }

    // Generar resumen
    const resumenText = document.getElementById('resumen-text');
    if (resumenText) {
        resumenText.textContent = summary;
    }

    // Actualizar metadatos
    const añoText = document.getElementById('año-text');
    const capitulosText = document.getElementById('capitulos-text');
    if (parteInfo) {
        if (añoText) añoText.textContent = parteInfo.year || 'N/A';
        if (capitulosText) capitulosText.textContent = `${parteInfo.chapters || 0} capítulos`;
    }

    // Generar lista de personajes
    const charactersList = document.getElementById('characters-list');
    if (charactersList) {
        charactersList.innerHTML = '';

        if (items.length > 0) {
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'character-card';
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'listitem');

                const cardInner = document.createElement('div');
                cardInner.className = 'character-card-inner';

                // Front de la tarjeta
                const front = document.createElement('div');
                front.className = 'character-card-front';
                
                const imageContainer = document.createElement('div');
                imageContainer.className = 'character-image-container';
                
                const img = document.createElement('img');
                img.src = item.user_images?.[0] || item.images?.[0] || 'assets/imgs/UserIcon.png';
                img.alt = item.user || item.name || 'Personaje';
                img.loading = 'lazy';
                
                imageContainer.appendChild(img);
                
                const nameEl = document.createElement('h3');
                nameEl.className = 'character-name';
                nameEl.textContent = item.user || item.name || '';
                
                const standEl = document.createElement('span');
                standEl.className = 'character-stand';
                standEl.textContent = item.stand || item.type?.[0] || '';

                front.appendChild(imageContainer);
                front.appendChild(nameEl);
                front.appendChild(standEl);

                // Back de la tarjeta
                const back = document.createElement('div');
                back.className = 'character-card-back';
                
                const backName = document.createElement('h3');
                backName.className = 'character-name';
                backName.textContent = item.user || item.name || '';
                
                const description = document.createElement('p');
                description.className = 'character-description';
                description.textContent = item.description || item.summary || `Stand: ${item.stand || 'N/A'}`;
                
                const stats = document.createElement('div');
                stats.className = 'character-stats';
                
                if (item.stand) {
                    stats.innerHTML = `
                        <div class="stat-item">
                            <span class="stat-label">Stand</span>
                            <span class="stat-value">${item.stand}</span>
                        </div>
                    `;
                }
                
                if (item.type) {
                    stats.innerHTML += `
                        <div class="stat-item">
                            <span class="stat-label">Tipo</span>
                            <span class="stat-value">${item.type.join(', ')}</span>
                        </div>
                    `;
                }
                
                if (item.gender) {
                    stats.innerHTML += `
                        <div class="stat-item">
                            <span class="stat-label">Género</span>
                            <span class="stat-value">${item.gender}</span>
                        </div>
                    `;
                }

                const moreBtn = document.createElement('button');
                moreBtn.className = 'more-info-btn';
                moreBtn.textContent = 'Ver más detalles';
                // PASAR TODOS LOS DATOS AL MODAL
                moreBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (window.openCharacterModal) {
                        window.openCharacterModal({
                            name: item.user || item.name,
                            stand: item.stand,
                            type: item.type,
                            gender: item.gender,
                            hair_color: item.hair_color,
                            eye_color: item.eye_color,
                            hamon: item.hamon,
                            image: item.user_images?.[0] || item.images?.[0],
                            stand_images: item.stand_images,
                            description: item.description || item.summary
                        });
                    }
                });

                back.appendChild(backName);
                back.appendChild(description);
                back.appendChild(stats);
                back.appendChild(moreBtn);

                cardInner.appendChild(front);
                cardInner.appendChild(back);
                card.appendChild(cardInner);

                // Eventos de teclado para abrir modal
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (window.openCharacterModal) {
                            window.openCharacterModal({
                                name: item.user || item.name,
                                stand: item.stand,
                                type: item.type,
                                gender: item.gender,
                                hair_color: item.hair_color,
                                eye_color: item.eye_color,
                                hamon: item.hamon,
                                image: item.user_images?.[0] || item.images?.[0],
                                stand_images: item.stand_images,
                                description: item.description || item.summary
                            });
                        }
                    }
                });

                charactersList.appendChild(card);
            });
        } else {
            charactersList.innerHTML = '<p style="color: var(--blanco-80);">No hay información disponible.</p>';
        }
    }
}

// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================
async function inicializarPagina() {
    const parte = getURLParameter('part');
    
    if (!parte) {
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; flex-direction: column; gap: 20px;">
                <h1 style="color: white; text-align: center;">Error: No se especificó una parte</h1>
                <p style="color: #aaa; text-align: center;">Agrega ?part=NombreDeLaParte a la URL</p>
                <a href="escritorio.html" style="color: #e91e63; text-decoration: none; padding: 15px 30px; border: 2px solid #e91e63; border-radius: 30px;">Volver al escritorio</a>
            </div>
        `;
        return;
    }

    // Inicializar funcionalidades
    initTabs();
    initCharacterModal();
    initMapModal();
    initMangaModal();
    initParticles();

    // Cargar datos
    const datos = await cargarDatos();
    if (datos) {
        generarContenidoParte(parte, datos);
    } else {
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; flex-direction: column; gap: 20px;">
                <h1 style="color: white; text-align: center;">Error: No se pudieron cargar los datos</h1>
                <a href="escritorio.html" style="color: #e91e63; text-decoration: none; padding: 15px 30px; border: 2px solid #e91e63; border-radius: 30px;">Volver al escritorio</a>
            </div>
        `;
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarPagina);
