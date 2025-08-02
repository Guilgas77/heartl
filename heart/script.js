// 🌟 Variáveis globais
let particles = [];
let gravity = 0.3;
let animating = false;
let slideIndex = 0;
let momentoIndex = 0;

// ❤️ Coração explosivo com som + música
function startInfiniteExplosions() {
  const heart = document.getElementById("heart");
  const message = document.getElementById("message");
  const somExplosao = document.getElementById("explosaoSom");
  const musica = document.getElementById("musicaAlianca");

  setInterval(() => {
    heart.classList.add("explodindo");
    message.style.opacity = 1;
    heart.style.pointerEvents = "none";

    somExplosao?.play();
    if (musica) {
      musica.currentTime = 0;
      musica.play();
    }

    particles = [];
    for (let i = 0; i < 200; i++) {
      particles.push(new Particle(
        window.innerWidth / 2,
        window.innerHeight / 2,
        `hsl(${Math.random() * 360}, 100%, 60%)`
      ));
    }

    setTimeout(() => {
      message.style.opacity = 0;
      heart.classList.remove("explodindo");
      heart.style.pointerEvents = "auto";
      document.getElementById("telaInicial").style.display = "none";
      mostrarSecao("envelope");
      abrirEnvelope3D();
    }, 4000);
  }, 6000); // a cada 6s
}

// 💌 Efeito 3D do envelope
function abrirEnvelope3D() {
  const envelope3D = document.getElementById("envelope3D");
  envelope3D.style.display = "block";
  setTimeout(() => {
    envelope3D.classList.add("open");
  }, 800);
}

// 🎇 Partícula animada
class Particle {
  constructor(x, y, color) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.color = color;
    this.alpha = 1;
    this.state = "exploding";
  }

  update() {
    if (this.state === "exploding") {
      this.vy += gravity;
      this.x += this.vx;
      this.y += this.vy;
      if (this.y > window.innerHeight - 60) this.state = "gathering";
    } else {
      this.x += (this.startX - this.x) * 0.05;
      this.y += (this.startY - this.y) * 0.05;
      this.alpha -= 0.01;
    }
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// 🚀 Inicialização
window.onload = () => {
  const canvasMatrix = document.getElementById("matrix");
  const canvasParticles = document.getElementById("canvas");
  const ctxMatrix = canvasMatrix.getContext("2d");
  const ctxParticles = canvasParticles.getContext("2d");

  function resizeCanvas() {
    canvasMatrix.width = canvasParticles.width = window.innerWidth;
    canvasMatrix.height = canvasParticles.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // 🩸 Coração caindo estilo "Matrix"
  const cols = Math.floor(canvasMatrix.width / 20);
  const drops = Array(cols).fill(1);
  setInterval(() => {
    ctxMatrix.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctxMatrix.fillRect(0, 0, canvasMatrix.width, canvasMatrix.height);
    ctxMatrix.fillStyle = "#ff0066";
    ctxMatrix.font = "20px Arial";
    for (let i = 0; i < drops.length; i++) {
      ctxMatrix.fillText("❤️", i * 20, drops[i] * 20);
      if (drops[i] * 20 > canvasMatrix.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 50);

  // 🌈 Animação das partículas
  function animateParticles() {
    ctxParticles.clearRect(0, 0, canvasParticles.width, canvasParticles.height);
    particles.forEach(p => {
      p.update();
      p.draw(ctxParticles);
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // 🍔 Menu hamburguer
  document.getElementById("hamburger")?.addEventListener("click", () => {
    const menuList = document.getElementById("menu-list");
    menuList.style.display = menuList.style.display === "block" ? "none" : "block";
  });

  // 💌 Abrir carta
  document.getElementById("abrirCarta")?.addEventListener("click", () => {
    mostrarSecao("cartaAberta");
  });

  // ⏫ Botão de topo
  document.getElementById("btnSubir")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 🧭 Função mostrar seções
  function mostrarSecao(id) {
    const todas = ["telaInicial", "envelope", "cartaAberta", "galeria", "momentos", "qrAcesso"];
    todas.forEach(sec => {
      const el = document.getElementById(sec);
      if (el) {
        el.classList.toggle("active", sec === id);
        el.classList.toggle("hidden", sec !== id);
      }
    });
    document.getElementById("telaInicial").style.display = id === "telaInicial" ? "flex" : "none";
  }

  document.getElementById("btnInicio")?.addEventListener("click", () => mostrarSecao("telaInicial"));
  document.getElementById("btnEnvelope")?.addEventListener("click", () => mostrarSecao("envelope"));
  document.getElementById("btnMomentos")?.addEventListener("click", () => mostrarSecao("galeria"));
  document.getElementById("btnQr")?.addEventListener("click", () => mostrarSecao("qrAcesso"));
  document.getElementById("irParaMomentos")?.addEventListener("click", () => mostrarSecao("momentos"));

  // ⏳ Temporizador até 2 de agosto
  function updateCountdown() {
    const contador = document.getElementById("contador");
    const agora = new Date();
    const destino = new Date(agora.getFullYear(), 7, 2); // mês 7 = agosto
    if (agora > destino) destino.setFullYear(agora.getFullYear() + 1);
    const diff = destino - agora;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    contador.textContent = `${dias} dias, ${horas} horas, ${minutos} minutos`;
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 📸 Galeria de fotos
  const slides = document.querySelectorAll("#galeria .slide");
  document.getElementById("prevFoto")?.addEventListener("click", () => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    slides[slideIndex].classList.add("active");
  });
  document.getElementById("nextFoto")?.addEventListener("click", () => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  });

  // 💕 Momentos especiais
  const momentoSlides = document.querySelectorAll("#momentos .slide");
  document.getElementById("prevMomento")?.addEventListener("click", () => {
    momentoSlides[momentoIndex].classList.remove("active");
    momentoIndex = (momentoIndex - 1 + momentoSlides.length) % momentoSlides.length;
    momentoSlides[momentoIndex].classList.add("active");
  });
  document.getElementById("nextMomento")?.addEventListener("click", () => {
    momentoSlides[momentoIndex].classList.remove("active");
    momentoIndex = (momentoIndex + 1) % momentoSlides.length;
    momentoSlides[momentoIndex].classList.add("active");
  });

  // 🔁 Reiniciar slides ao ativar seções
  function resetSlides() {
    slides.forEach(slide => slide.classList.remove("active"));
    momentoSlides.forEach(slide => slide.classList.remove("active"));
    slideIndex = momentoIndex = 0;
    slides[0]?.classList.add("active");
    momentoSlides[0]?.classList.add("active");
  }

  // 🔎 Observa mudanças nas seções galeria/momentos
  ["galeria", "momentos"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const observer = new MutationObserver(() => {
        if (el.classList.contains("active")) resetSlides();
      });
      observer.observe(el, { attributes: true });
    }
  });

  // 🧡 Inicia a sequência de animação infinita
  startInfiniteExplosions();
};
