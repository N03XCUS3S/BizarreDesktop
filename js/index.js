document.getElementById('goBtn').addEventListener('click', function (e) {
  e.preventDefault();
  const laptop = document.getElementById('laptop');
  laptop.classList.add('zoom-in');
  //2 timeouts para iniciar la animacion y transicion hacia la pagina sesion.html
  setTimeout(() => {
    const transition = document.getElementById('transition');
    transition.classList.add('active');
    setTimeout(() => {
      window.location.href = 'sesion.html';
    }, 700);
  }, 800);
});

//preparacion del canvas y el contexto
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

//adapta el tamaño del cambas al ancho y alto de la pagina
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// variable para almacenar las estrellas y posteriormente la cantidad de estrellas
const stars = [];
const starCount = 200;

//bucle que crea las 200 estrellas dandoles altura ancho tamaño variable y velocidad
for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1 + 0.5, // tamaño entre 0.9 y 1.9 px
    vx: (Math.random() - 0.5) * 1,  // velocidad en X
    vy: (Math.random() - 0.5) * 1   // velocidad en Y
  });
}

//funcion para dibujar las estrellas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //limpia el canvas antes de pintar encima
  ctx.fillStyle = 'white';

  stars.forEach(star => {
    // actualizacion de posición por velocidad
    star.x += star.vx;
    star.y += star.vy;

    //rebote / reposicionamiento en bordes
    if (star.x < 0) star.x = canvas.width;
    else if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    else if (star.y > canvas.height) star.y = 0;

    // Dibujar estrella
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // Dibujar líneas entre estrellas cercanas
  // el bucle recorre las estrellas por pares (siendo unicos siempre)
  for (let i = 0; i < starCount; i++) {
    for (let j = i + 1; j < starCount; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      //evalua si la distancia para dibujar la linea es correcta(100 en este caso)
      // y en caso de serlo crea la linea de color blanco y con una transparencia basada en dist
      if (dist < 100) {
        ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 100})`;
        ctx.lineWidth = 0.3;
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();
