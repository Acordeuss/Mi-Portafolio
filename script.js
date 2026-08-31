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

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ==========================================
// 3. ENMARCADO AUTOMÁTICO DE NAVEGACIÓN (SCROLL SPY)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav a[href^='#']");

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
    });

    sections.forEach((section) => spyObserver.observe(section));
});

// ==========================================
// 4. CANVAS DE PARTÍCULAS MORADO CYBERNEÓN EN EL FONDO
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
            ctx.fillStyle = `rgba(176, 132, 245, ${this.opacity})`;
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
// 5. EFECTO DE TIPEADO EN VIVO PARA EL TERMINAL
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

window.addEventListener("DOMContentLoaded", typeCode);

// ==========================================
// 6. CONTROL DESPLEGABLE DEL VISOR DE CV
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle-cv-btn");
    const pdfWrapper = document.getElementById("pdf-wrapper");
    const pdfIframe = document.getElementById("pdf-iframe");
    const btnText = document.getElementById("toggle-btn-text");

    if (toggleBtn && pdfWrapper && pdfIframe) {
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            const isExpanded = pdfWrapper.classList.contains("expanded");

            if (isExpanded) {
                pdfWrapper.classList.remove("expanded");
                if (btnText) btnText.textContent = "Ver Curriculum en pantalla";
            } else {
                if (!pdfIframe.src) {
                    const dataSrc = pdfIframe.getAttribute("data-src");
                    if (dataSrc) pdfIframe.src = dataSrc;
                }
                pdfWrapper.classList.add("expanded");
                if (btnText) btnText.textContent = "Ocultar Curriculum";
            }
        });
    }
});

// ==========================================
// 7. ENVÍO DE FORMULARIO DE CONTACTO VÍA AJAX (FORMSPREE)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault(); // Evita la redirección a la página de Formspree

            // Deshabilita el botón temporalmente
            submitBtn.disabled = true;
            submitBtn.textContent = "Enviando...";

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Muestra el mensaje de agradecimiento
                    formStatus.style.display = "block";
                    formStatus.style.padding = "1rem";
                    formStatus.style.borderRadius = "8px";
                    formStatus.style.backgroundColor = "rgba(72, 187, 120, 0.15)";
                    formStatus.style.border = "1px solid #48bb78";
                    formStatus.style.color = "#48bb78";
                    formStatus.innerHTML = "<strong>¡Gracias por ponerte en contacto con el Portafolio de Carlos!</strong><br>Tu mensaje ha sido enviado exitosamente. Te responderé a la brevedad.";

                    // Reinicia los campos del formulario
                    contactForm.reset();
                } else {
                    throw new Error("Ocurrió un problema al enviar el mensaje.");
                }
            } catch (error) {
                // Manejo de errores
                formStatus.style.display = "block";
                formStatus.style.padding = "1rem";
                formStatus.style.borderRadius = "8px";
                formStatus.style.backgroundColor = "rgba(245, 101, 101, 0.15)";
                formStatus.style.border = "1px solid #f56565";
                formStatus.style.color = "#f56565";
                formStatus.innerHTML = 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo o escribe a <a href="mailto:acordeusleal@outlook.es" style="color: inherit; text-decoration: underline;">acordeusleal@outlook.es</a>.';
            } finally {
                // Restablece el estado del botón
                submitBtn.disabled = false;
                submitBtn.textContent = "Enviar Mensaje Directo";
            }
        });
    }
});