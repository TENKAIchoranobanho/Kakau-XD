// 🎈 BALÕES ESPALHADOS E RÁPIDOS 🎈
function createBalloons() {
    const canvas = document.getElementById('hearts');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const balloons = [];
    const balloonColors = [
        '🎈', '🎉', '🎊', '🎁', '✨', '🌟', '⭐', '💖', '💕', '🌸'
    ];
    
    // MAIS BALÕES (50 → ESPALHADOS pela tela)
    for(let i = 0; i < 50; i++) {
        balloons.push({
            x: Math.random() * canvas.width,
            y: canvas.height + (Math.random() * 200 + 100),  // ← MAIS ESPALHADOS verticalmente
            size: Math.random() * 25 + 20,
            speed: Math.random() * 2.5 + 1.5,  // ← 2X MAIS RÁPIDO (era 1.2 + 0.6)
            sway: (Math.random() - 0.5) * 0.03,  // ← MAIS MOVIMENTO LATERAL
            balloonType: balloonColors[Math.floor(Math.random() * balloonColors.length)],
            rotation: 0
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        balloons.forEach(balloon => {
            // MOVIMENTO MAIS FLUIDO E ESPALHADO
            balloon.x += Math.sin(balloon.y * 0.008 + Date.now() * 0.002) * 2.5;  // ← MAIS AMPLITUDE
            balloon.rotation += 0.08;  // ← ROTACIONA MAIS RÁPIDO
            
            // SUBE MAIS RÁPIDO
            balloon.y -= balloon.speed;
            
            // Reinicia ESPALHADO pela tela inteira
            if(balloon.y < -80) {
                balloon.y = canvas.height + (Math.random() * 300 + 100);  // ← SAI EM POSIÇÕES DIFERENTES
                balloon.x = Math.random() * canvas.width;  // ← POSIÇÃO X ALEATÓRIA
            }
            
            // Desenha com transparência variada
            ctx.save();
            ctx.translate(balloon.x, balloon.y);
            ctx.rotate(balloon.rotation);
            ctx.globalAlpha = 0.85 + Math.random() * 0.15;  // ← BRILHO VARIAVEL
            ctx.font = `${balloon.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.fillText(balloon.balloonType, 0, 0);
            ctx.restore();
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}

// Surpresa (igual)
function showSurprise() {
    document.getElementById('surpresa').classList.remove('hidden');
    document.querySelector('.botao-magia').style.display = 'none';
    createConfetti();
}

// Confetti (igual)
function createConfetti() {
    for(let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random()*360}, 70%, 60%)`;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.animation = `fall ${Math.random()*3 + 2}s linear forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

// CSS confetti (igual)
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializa
window.onload = () => {
    createBalloons();
    
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('hearts');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};