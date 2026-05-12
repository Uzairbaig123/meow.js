// =============================================
// MEOW.JS v1.2.0 - Complete & Fixed Version
// =============================================

const Meow = (function () {
    'use strict';

    const Meow = {};
    Meow.version = "1.2.0";

    // Core
    Meow.purr = (msg) => console.log(`🐾 ${msg}`);
    Meow.meow = (msg = "Meow!") => alert(`🐱 ${msg}`);
    Meow.hiss = (msg) => console.error(`😾 ${msg}`);

    Meow.findPaw = (sel) => document.querySelector(sel);

    // Reset any ongoing animation
    Meow.reset = (selector) => {
        const el = Meow.findPaw(selector);
        if (el) {
            el.style.transition = '';
            el.style.transform = '';
            el.style.filter = '';
            el.style.position = '';
            el.style.left = '';
            el.style.top = '';
            el.style.zIndex = '';
        }
    };

    // ==================== ALL ANIMATIONS ====================

    Meow.chaseLaser = (selector, intensity = 0.18) => {
        Meow.reset(selector);
        const el = Meow.findPaw(selector);
        if (!el) return;
        const move = (e) => {
            const rect = el.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width / 2) * intensity;
            const dy = (e.clientY - rect.top - rect.height / 2) * intensity;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
        };
        document.addEventListener('mousemove', move);
        Meow.purr("Laser mode activated 🐱");
    };

    Meow.zoomies = (selector, duration = 3500, intensity = 850) => {
        Meow.reset(selector);
        const el = Meow.findPaw(selector);
        if (!el) return;
        let start = Date.now();
        const animate = () => {
            const elapsed = Date.now() - start;
            if (elapsed > duration) {
                Meow.reset(selector);
                return;
            }
            const x = Math.sin(elapsed / 60) * intensity;
            const y = Math.cos(elapsed / 90) * (intensity * 0.6);
            const rot = Math.sin(elapsed / 30) * 40;
            el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
            requestAnimationFrame(animate);
        };
        animate();
        Meow.purr("ZOOMIES ACTIVATED!!!");
    };

    Meow.catnip = (selector, duration = 7000) => {
        Meow.reset(selector);
        const el = Meow.findPaw(selector);
        if (!el) return;
        Meow.zoomies(selector, duration, 1400);
        el.style.filter = 'hue-rotate(120deg) saturate(3) brightness(1.3)';
        setTimeout(() => Meow.reset(selector), duration);
        Meow.purr("CATNIP MODE 😹");
    };

    Meow.pounce = (selector) => {
        Meow.reset(selector);
        const el = Meow.findPaw(selector);
        if (!el) return;
        el.style.transition = '0.2s ease';
        el.style.transform = 'scale(2.3) rotate(25deg)';
        setTimeout(() => Meow.reset(selector), 280);
    };

    Meow.tailWag = (selector, speed = 280) => {
        Meow.reset(selector);
        const el = Meow.findPaw(selector);
        if (!el) return;
        let angle = 0, direction = 1;
        const interval = setInterval(() => {
            angle += 14 * direction;
            if (angle > 32 || angle < -32) direction *= -1;
            el.style.transform = `rotate(${angle}deg)`;
        }, speed);
        setTimeout(() => clearInterval(interval), 8000);
    };

    Meow.stretch = (selector) => {
        Meow.reset(selector);
        const el = Meow.findPaw(selector);
        if (!el) return;
        el.style.transition = '1.5s';
        el.style.transform = 'scaleX(1.85) scaleY(0.6) rotate(-10deg)';
        setTimeout(() => Meow.reset(selector), 1600);
    };

    Meow.knockOver = (selector) => {
        Meow.reset(selector);
        const el = Meow.findPaw(selector);
        if (!el) return;
        el.style.transition = '0.9s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        el.style.transform = 'rotate(95deg) translateY(50px)';
        setTimeout(() => Meow.reset(selector), 2000);
    };

    Meow.loaf = (selector) => {
        Meow.reset(selector);
        const el = Meow.findPaw(selector);
        if (!el) return;
        el.style.transition = '1.3s';
        el.style.borderRadius = '50% 50% 35% 35%';
        el.style.transform = 'scaleY(0.62)';
        setTimeout(() => Meow.reset(selector), 3500);
    };

    Meow.boop = (selector) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        el.addEventListener('click', (e) => {
            const paw = document.createElement('div');
            paw.innerHTML = '🐾';
            paw.style.cssText = `position:absolute; font-size:48px; left:${e.clientX-25}px; top:${e.clientY-25}px; pointer-events:none; z-index:9999;`;
            document.body.appendChild(paw);
            paw.animate([
                { transform: 'scale(0.5) rotate(0deg)', opacity: 0 },
                { transform: 'scale(1.6) rotate(15deg)', opacity: 1 },
                { transform: 'scale(2.2) rotate(-10deg)', opacity: 0 }
            ], { duration: 700 });
            setTimeout(() => paw.remove(), 800);
        });
    };

    Meow.carry = (selector) => {
        Meow.reset(selector);
        const el = Meow.findPaw(selector);
        if (!el) return;
        let isDragging = false, offsetX, offsetY;

        el.style.cursor = 'grab';
        el.addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = el.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            el.style.transition = 'none';
            el.style.zIndex = 9999;
            Meow.meowSound();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            el.style.position = 'fixed';
            el.style.left = (e.clientX - offsetX) + 'px';
            el.style.top = (e.clientY - offsetY) + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                el.style.transition = '0.4s';
            }
        });
    };

    Meow.pawPrints = (count = 18) => {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const paw = document.createElement('div');
                paw.innerHTML = ['🐾', '💕', '🐟'][Math.floor(Math.random() * 3)];
                paw.style.cssText = `position:fixed; font-size:30px; left:${Math.random()*100}vw; top:${Math.random()*100}vh; opacity:0; pointer-events:none; z-index:9999;`;
                document.body.appendChild(paw);
                paw.animate([
                    { transform: 'translateY(0) scale(0.6)', opacity: 0 },
                    { transform: 'translateY(-180px) scale(1.4)', opacity: 1 },
                    { transform: 'translateY(-280px) scale(0.7)', opacity: 0 }
                ], { duration: 1400 + Math.random() * 900 });
                setTimeout(() => paw.remove(), 3000);
            }, i * 45);
        }
    };

    Meow.fishRain = (count = 22) => {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const fish = document.createElement('div');
                fish.textContent = '🐟';
                fish.style.cssText = `position:fixed; font-size:34px; left:${Math.random()*100}vw; top:-60px; pointer-events:none; z-index:9999;`;
                document.body.appendChild(fish);
                fish.animate([
                    { transform: 'translateY(0) rotate(0deg)' },
                    { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random()*800 - 400}deg)` }
                ], {
                    duration: 1800 + Math.random() * 1400,
                    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                });
                setTimeout(() => fish.remove(), 4000);
            }, i * 35);
        }
        Meow.purr("It's raining fish! 🍣");
    };

    Meow.meowSound = (type = 'short') => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(type === 'long' ? 450 : 720, ctx.currentTime);
            gain.gain.value = 0.25;
            osc.connect(gain).connect(ctx.destination);
            osc.start();
            setTimeout(() => osc.stop(), type === 'long' ? 650 : 140);
        } catch (e) {}
    };

    Meow.giveFact = () => {
        const facts = [
            "Cats sleep 70% of their lives 😴",
            "A group of cats is called a clowder 🐱",
            "Cats have 32 muscles in each ear 🎵",
            "Cats can jump 6 times their body length 🦘"
        ];
        const fact = facts[Math.floor(Math.random() * facts.length)];
        Meow.purr(fact);
        return fact;
    };

    return Meow;
})();

// Support global and module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Meow;
} else {
    window.Meow = Meow;
}
