// Preparación del canvas y contexto (tu código original)
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

// Ajusta tamaño del canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const stars = [];
const starCount = 200;

for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1 + 0.5,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';

  stars.forEach(star => {
    star.x += star.vx;
    star.y += star.vy;

    if (star.x < 0) star.x = canvas.width;
    else if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    else if (star.y > canvas.height) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < starCount; i++) {
    for (let j = i + 1; j < starCount; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

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


// Listener para el hotspot pantalla
const hotspot = document.getElementById("pantallaHotspot");
const laptop = document.getElementById('laptop');

hotspot.addEventListener("click", () => {
    laptop.classList.add('zoom-in');  // Zoom si tienes
    document.getElementById("transition").classList.add("active"); // Empieza transición

    setTimeout(() => {
        window.location.href = "sesion.html"; // Navega después de que termine la transición
    }, 2000); // 2 segundos, igual que la duración en CSS
});


