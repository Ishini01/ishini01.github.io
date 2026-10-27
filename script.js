// =========================
// INTERSECTION OBSERVER (Reveal on scroll)
// =========================
const elements = document.querySelectorAll('.card, .project');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// =========================
// PARTICLES BACKGROUND
// =========================
document.addEventListener("DOMContentLoaded", function () {
    particlesJS("particles-js", {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#00ffff" }, // neon cyan
            shape: { type: "circle" },
            opacity: { value: 0.6, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00ffff",
                opacity: 0.4,
                width: 1
            },
            move: { enable: true, speed: 2 }
        },
        interactivity: {
            events: { onhover: { enable: true, mode: "repulse" } }
        },
        retina_detect: true
    });
});

// =========================
// CURSOR TRAIL EFFECT
// =========================
const cursorTrail = [];
const colors = ["#00ffff", "#00ff99", "#33ccff"]; // cyan/blue tones

document.addEventListener("mousemove", e => {
    const trail = {
        x: e.clientX,
        y: e.clientY,
        radius: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
    };
    cursorTrail.push(trail);
});

// Create canvas overlay
const canvas = document.createElement("canvas");
canvas.id = "cursorCanvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "999";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cursorTrail.length; i++) {
        const t = cursorTrail[i];
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${parseInt(t.color.slice(1,3),16)},${parseInt(t.color.slice(3,5),16)},${parseInt(t.color.slice(5,7),16)},${t.alpha})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = t.color;
        ctx.fill();
        t.alpha -= 0.03;
        t.radius *= 0.95;
    }

    for (let i = cursorTrail.length -1; i >=0; i--) {
        if(cursorTrail[i].alpha <=0) cursorTrail.splice(i,1);
    }

    requestAnimationFrame(animate);
}
animate();

// =========================
// TYPEWRITER EFFECT (Hero Heading)
// =========================
function typeWriter(element, text, speed=80) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

document.addEventListener("DOMContentLoaded", () => {
    const heroTitle = document.querySelector(".hero-text h1");
    const originalText = "WELCOME TO\nMY PORTFOLIO";
    heroTitle.innerHTML = "";
    typeWriter(heroTitle, originalText, 80);
});
