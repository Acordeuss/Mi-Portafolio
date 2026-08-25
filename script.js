// ==========================================
// 1. MENÚ RESPONSIVO MÓVIL
// ==========================================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}

// ==========================================
// 2. REVEAL ANIMATION (SCROLL REVEAL)
// ==========================================
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// ==========================================
// 3. CANVAS DE PARTÍCULAS CYBERNEÓN EN EL FONDO
// ==========================================
const canvas = document.getElementById("bg-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(220, 20, 60, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 45; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// ==========================================
// 4. EFECTO DE TIPEADO EN VIVO PARA EL TERMINAL
// ==========================================
const codeText = `class DevRegional:
    def __init__(self):
        self.lider = "Carlos Leal Téllez"
        self.zona = "Los Lagos, Chile"
        self.fuerte = ["Python", "Java (POO)", "SQL", "JavaScript"]
        self.en_proceso = ["Kotlin"]

dev = DevRegional()
$ status_check --target "Industria Salmonera"
>> Sistema listo para desarrollo local y automatización.`;

let codeIndex = 0;
const speed = 25; // Velocidad de tipeado en ms
const targetElement = document.getElementById("typewriter-code");

function typeCode() {
    if (targetElement && codeIndex < codeText.length) {
        targetElement.innerText = codeText.substring(0, codeIndex + 1);
        codeIndex++;
        setTimeout(typeCode, speed);
    }
}

// Inicia el tipeado dinámico cuando la página termina de cargar
window.addEventListener("DOMContentLoaded", typeCode);