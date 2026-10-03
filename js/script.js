function initImageMotion() {
  const style = document.createElement('style');
  style.textContent = `
    img {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      transform-style: preserve-3d;
      will-change: transform;
      cursor: pointer;
    }

    img:hover {
      box-shadow: 0 16px 30px rgba(0, 0, 0, 0.18);
    }
  `;
  document.head.appendChild(style);

  const images = document.querySelectorAll('img');

  images.forEach((img, index) => {
    let animationFrame = null;

    const animateFloat = () => {
      const t = performance.now() * 0.001;
      const x = Math.sin(t * 1.4 + index) * 7;
      const y = Math.cos(t * 1.2 + index) * 7;

      if (!img.matches(':hover')) {
        img.style.transform = `translate(${x}px, ${y}px) rotateX(0deg) rotateY(0deg) scale(1)`;
      }

      animationFrame = requestAnimationFrame(animateFloat);
    };

    img.addEventListener('pointermove', (event) => {
      const rect = img.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      const rotateY = x * 18;
      const rotateX = -y * 18;
      const translateX = x * 16;
      const translateY = y * 16;

      img.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    img.addEventListener('pointerleave', () => {
      img.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg) scale(1)';
    });

    img.addEventListener('pointerenter', () => {
      cancelAnimationFrame(animationFrame);
    });

    animationFrame = requestAnimationFrame(animateFloat);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImageMotion);
} else {
  initImageMotion();
}
