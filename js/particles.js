/**
 * particles.js - Cosmic Sky Blue Interactive Particle & Constellation Engine
 * Created for Randi's Dark Sky Portfolio
 */

(function () {
  const canvas = document.getElementById('space-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Configuration
  const STAR_COUNT = Math.min(Math.floor((width * height) / 9000), 120);
  const SHOOTING_STAR_INTERVAL = 4000; // ms
  const CONNECTION_DISTANCE = 110;
  const MOUSE_RADIUS = 150;

  const stars = [];
  const shootingStars = [];

  const mouse = {
    x: null,
    y: null,
    radius: MOUSE_RADIUS,
    isHovering: false
  };

  // Star Class
  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.4;
      this.baseAlpha = Math.random() * 0.7 + 0.3;
      this.alpha = this.baseAlpha;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinkleFactor = Math.random() * Math.PI;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      
      // Color palette: Sky Blue, Cyan, Ice White
      const colors = [
        'rgba(56, 189, 248,',  // sky-400
        'rgba(14, 165, 233,',  // sky-500
        'rgba(125, 211, 252,', // sky-300
        'rgba(224, 242, 254,', // sky-100
        'rgba(34, 211, 238,'   // cyan-400
      ];
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Twinkle effect
      this.twinkleFactor += this.twinkleSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.twinkleFactor) * 0.25;
      if (this.alpha < 0.1) this.alpha = 0.1;
      if (this.alpha > 1) this.alpha = 1;

      // Interactive mouse attraction/deflection
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          this.x -= (dx / dist) * force;
          this.y -= (dy / dist) * force;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorBase} ${this.alpha})`;
      ctx.shadowBlur = this.size > 1.4 ? 8 : 2;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Shooting Star Class
  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * (width * 0.8);
      this.y = Math.random() * (height * 0.4);
      this.length = Math.random() * 80 + 40;
      this.speed = Math.random() * 10 + 12;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // approx 45 degrees
      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;
      this.size = Math.random() * 1.8 + 1;
      this.alpha = 1;
      this.fade = Math.random() * 0.025 + 0.015;
      this.active = true;
    }

    update() {
      if (!this.active) return;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.fade;

      if (this.alpha <= 0 || this.x > width || this.y > height) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active) return;
      ctx.save();
      ctx.beginPath();
      const tailX = this.x - Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;

      const gradient = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0)');
      gradient.addColorStop(0.6, `rgba(56, 189, 248, ${this.alpha * 0.6})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${this.alpha})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = this.size;
      ctx.lineCap = 'round';
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();

      // Glowing head
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate Stars
  function initStars() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star());
    }
  }

  // Trigger shooting stars periodically
  function spawnShootingStar() {
    shootingStars.push(new ShootingStar());
    const nextSpawn = SHOOTING_STAR_INTERVAL + (Math.random() - 0.5) * 3000;
    setTimeout(spawnShootingStar, Math.max(2000, nextSpawn));
  }

  // Draw constellation connecting lines between nearby stars
  function drawConnections() {
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect star to mouse if near
      if (mouse.x !== null && mouse.y !== null) {
        const dx = stars[i].x - mouse.x;
        const dy = stars[i].y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS) {
          const alpha = (1 - dist / MOUSE_RADIUS) * 0.35;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle dark gradient background overlay for depth
    const bgGradient = ctx.createRadialGradient(
      width / 2, height * 0.3, 50,
      width / 2, height * 0.3, width * 0.8
    );
    bgGradient.addColorStop(0, 'rgba(8, 20, 48, 0.25)'); // deep sky dark
    bgGradient.addColorStop(1, 'rgba(3, 7, 18, 0)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Update and draw stars
    for (let star of stars) {
      star.update();
      star.draw();
    }

    // Connect constellation lines
    drawConnections();

    // Update & draw shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.update();
      s.draw();
      if (!s.active) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isHovering = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    mouse.isHovering = false;
  });

  // Touch support for mobile devices
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Init
  initStars();
  setTimeout(spawnShootingStar, 1500);
  animate();
})();
