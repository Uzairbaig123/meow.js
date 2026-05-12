// =============================================
// MEOW.JS v1.1.0 - Cat Animation Library
// =============================================

const Meow = (function () {
    'use strict';

    const Meow = {};
    Meow.version = "1.1.0";

    Meow.purr = (msg) => console.log(`🐾 ${msg}`);
    Meow.meow = (msg = "Meow!") => alert(`🐱 ${msg}`);
    Meow.hiss = (msg) => console.error(`😾 ${msg}`);

    Meow.findPaw = (sel) => document.querySelector(sel);
    Meow.findPaws = (sel) => document.querySelectorAll(sel);

    Meow.chaseLaser = (selector, intensity = 0.18) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        document.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width/2) * intensity;
            const dy = (e.clientY - rect.top - rect.height/2) * intensity;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
        });
    };

    Meow.zoomies = (selector, duration = 4500, intensity = 900) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        let start = Date.now();
        const animate = () => {
            const elapsed = Date.now() - start;
            if (elapsed > duration) return;
            const x = Math.sin(elapsed/80) * intensity;
            const y = Math.cos(elapsed/120) * (intensity * 0.6);
            const rot = Math.sin(elapsed/40) * 35;
            el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
            requestAnimationFrame(animate);
        };
        el.style.transition = 'none';
        animate();
        Meow.purr("ZOOMIES!!!");
    };

    Meow.pounce = (selector) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        el.addEventListener('click', () => {
            el.style.transition = '0.2s';
            el.style.transform = 'scale(2) rotate(25deg)';
            setTimeout(() => el.style.transform = 'scale(1) rotate(0)', 250);
        });
    };

    Meow.tailWag = (selector, speed = 300) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        let a = 0, dir = 1;
        setInterval(() => {
            a += 12 * dir;
            if (a > 28 || a < -28) dir *= -1;
            el.style.transform = `rotate(${a}deg)`;
        }, speed);
    };

    Meow.stretch = (selector) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        el.style.transition = '1.4s';
        el.style.transform = 'scaleX(1.7) scaleY(0.65) rotate(-10deg)';
        setTimeout(() => el.style.transform = '', 1400);
    };

    Meow.knockOver = (selector) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        el.style.transition = '0.9s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        el.style.transform = 'rotate(95deg) translateY(40px)';
    };

    Meow.boop = (selector) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        el.addEventListener('click', (e) => {
            const paw = document.createElement('div');
            paw.innerHTML = '🐾';
            paw.style.cssText = `position:absolute;font-size:40px;left:${e.clientX-20}px;top:${e.clientY-20}px;pointer-events:none;`;
            document.body.appendChild(paw);
            setTimeout(() => { paw.style.transition = '0.7s'; paw.style.transform = 'scale(2.5)'; paw.style.opacity = '0'; }, 10);
            setTimeout(() => paw.remove(), 800);
        });
    };

    Meow.loaf = (selector) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        el.style.transition = '1.2s';
        el.style.borderRadius = '50% 50% 30% 30%';
        el.style.transform = 'scaleY(0.6)';
    };

    Meow.catnip = (selector, duration = 8000) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        Meow.zoomies(selector, duration, 1200);
        el.style.filter = 'hue-rotate(90deg) saturate(2)';
        setTimeout(() => el.style.filter = '', duration);
        Meow.purr("CATNIP ACTIVATED 😹");
    };

    Meow.meowSound = (type = 'short') => {
        try {
            const audio = new AudioContext();
            const osc = audio.createOscillator();
            const gain = audio.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(type === 'long' ? 420 : 680, audio.currentTime);
            gain.gain.value = 0.3;
            osc.connect(gain).connect(audio.destination);
            osc.start();
            setTimeout(() => osc.stop(), type === 'long' ? 800 : 180);
        } catch(e) {}
    };

    Meow.pawPrints = (count = 15) => {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const paw = document.createElement('div');
                paw.innerHTML = ['🐾','💕','🐟'][Math.floor(Math.random()*3)];
                paw.style.cssText = `position:absolute; font-size:28px; left:${Math.random()*100}vw; top:${Math.random()*100}vh; opacity:0; pointer-events:none;`;
                document.body.appendChild(paw);
                paw.animate([{ transform: 'translateY(0) scale(0.5)', opacity: 0 }, { transform: 'translateY(-120px) scale(1.2)', opacity: 1 }, { transform: 'translateY(-200px) scale(0.8)', opacity: 0 }], { duration: 1800 + Math.random()*1200 });
                setTimeout(() => paw.remove(), 4000);
            }, i * 60);
        }
    };

    Meow.carry = (selector) => {
        const el = Meow.findPaw(selector);
        if (!el) return;
        let isDragging = false, offsetX, offsetY;

        el.style.cursor = 'grab';
        el.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - el.getBoundingClientRect().left;
            offsetY = e.clientY - el.getBoundingClientRect().top;
            el.style.transition = 'none';
            el.style.zIndex = 9999;
            Meow.meowSound();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            el.style.left = `${e.clientX - offsetX}px`;
            el.style.top = `${e.clientY - offsetY}px`;
            el.style.position = 'fixed';
        });

        document.addEventListener('mouseup', () => { isDragging = false; });
    };

    Meow.fishRain = (count = 20) => {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const fish = document.createElement('div');
                fish.textContent = '🐟';
                fish.style.cssText = `position:fixed; font-size:32px; left:${Math.random()*100}vw; top:-50px;`;
                document.body.appendChild(fish);
                fish.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random()*720}deg)` }], {
                    duration: 2000 + Math.random() * 1500
                });
                setTimeout(() => fish.remove(), 5000);
            }, i * 35);
        }
        Meow.purr("It's raining fish! 🍣");
    };

    return Meow;
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Meow;
else window.Meow = Meow;
