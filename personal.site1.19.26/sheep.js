// Konami Code Easter Egg: Grazing Sheep
// Up, Up, Down, Down, Left, Right, Left, Right, B, A

(function() {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'KeyB', 'KeyA'
  ];
  
  let konamiIndex = 0;
  let sheepActive = false;
  
  // Sheep colors: mostly dark with a few light ones
  const sheepColors = [
    '#2B2D2E', // charcoal (most common)
    '#2B2D2E',
    '#2B2D2E',
    '#4A4A4A', // dark grey
    '#4A4A4A',
    '#6B705C', // warm grey
    '#E8E4DD', // cream/white (rare)
    '#FFFEF9', // white (rare)
  ];
  
  function createSheep(yPosition, delay, color, size, speed) {
    const sheep = document.createElement('div');
    sheep.className = 'easter-sheep';
    
    // Simple, cute sheep silhouette
    const headColor = (color === '#FFFEF9' || color === '#E8E4DD') ? '#2B2D2E' : '#1a1a1a';
    
    sheep.innerHTML = `
      <svg viewBox="0 0 64 44" width="${size}" height="${size * 0.6875}">
        <!-- Body (fluffy cloud shape) -->
        <ellipse cx="32" cy="24" rx="20" ry="12" fill="${color}"/>
        <circle cx="18" cy="22" r="8" fill="${color}"/>
        <circle cx="28" cy="18" r="9" fill="${color}"/>
        <circle cx="38" cy="17" r="9" fill="${color}"/>
        <circle cx="46" cy="22" r="8" fill="${color}"/>
        <circle cx="24" cy="26" r="7" fill="${color}"/>
        <circle cx="40" cy="26" r="7" fill="${color}"/>
        <!-- Head -->
        <ellipse cx="52" cy="20" rx="7" ry="6" fill="${headColor}"/>
        <!-- Ear -->
        <ellipse cx="48" cy="14" rx="3" ry="5" fill="${headColor}"/>
        <!-- Eye -->
        <circle cx="54" cy="18" r="1.5" fill="#FFFEF9"/>
        <!-- Legs -->
        <rect x="22" y="32" width="3" height="10" rx="1" fill="${headColor}"/>
        <rect x="30" y="32" width="3" height="10" rx="1" fill="${headColor}"/>
        <rect x="38" y="32" width="3" height="10" rx="1" fill="${headColor}"/>
      </svg>
    `;
    
    sheep.style.cssText = `
      position: fixed;
      left: -${size + 20}px;
      top: ${yPosition}%;
      z-index: 99999;
      pointer-events: none;
      animation: sheepGraze${Math.round(speed)}s ${speed}s linear ${delay}s forwards;
      opacity: 0;
    `;
    
    return sheep;
  }
  
  function releaseFlock() {
    if (sheepActive) return;
    sheepActive = true;
    
    // Add keyframe animations to document
    const style = document.createElement('style');
    style.id = 'sheep-styles';
    
    // Create slightly different animation variants for natural movement
    let keyframes = '';
    for (let speed = 18; speed <= 28; speed++) {
      const grazePoints = [
        Math.random() * 5 + 12,
        Math.random() * 5 + 40,
        Math.random() * 5 + 70
      ];
      keyframes += `
        @keyframes sheepGraze${speed}s {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          3% { opacity: 1; }
          ${grazePoints[0]}% { transform: translateX(${grazePoints[0]}vw) translateY(4px); }
          ${grazePoints[0] + 2}% { transform: translateX(${grazePoints[0] + 2}vw) translateY(0); }
          ${grazePoints[1]}% { transform: translateX(${grazePoints[1]}vw) translateY(5px); }
          ${grazePoints[1] + 2}% { transform: translateX(${grazePoints[1] + 2}vw) translateY(1px); }
          ${grazePoints[2]}% { transform: translateX(${grazePoints[2]}vw) translateY(3px); }
          ${grazePoints[2] + 2}% { transform: translateX(${grazePoints[2] + 2}vw) translateY(0); }
          97% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 100px)) translateY(0); opacity: 0; }
        }
      `;
    }
    
    style.textContent = keyframes + `
      .easter-sheep {
        filter: drop-shadow(2px 3px 2px rgba(0,0,0,0.2));
      }
    `;
    document.head.appendChild(style);
    
    // Create container
    const pasture = document.createElement('div');
    pasture.id = 'sheep-pasture';
    pasture.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 99999;
      overflow: hidden;
    `;
    document.body.appendChild(pasture);
    
    // Release the flock! (8-12 sheep)
    const flockSize = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < flockSize; i++) {
      const yPosition = 55 + (Math.random() * 30); // Bottom portion of screen
      const delay = Math.random() * 4; // Staggered start
      const color = sheepColors[Math.floor(Math.random() * sheepColors.length)];
      const size = 45 + Math.random() * 35; // Varying sizes for depth
      const speed = 18 + Math.floor(Math.random() * 11); // 18-28 seconds
      
      const sheep = createSheep(yPosition, delay, color, size, speed);
      pasture.appendChild(sheep);
    }
    
    // Clean up after all sheep have crossed
    setTimeout(() => {
      pasture.remove();
      style.remove();
      sheepActive = false;
    }, 36000);
  }
  
  // Listen for Konami code
  document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        releaseFlock();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  // Secret click trigger: clicking the copyright 5 times quickly
  let copyrightClicks = 0;
  let copyrightTimer = null;
  
  document.addEventListener('click', (e) => {
    if (e.target.textContent && 
        (e.target.textContent.includes('©') || 
         e.target.textContent.includes('Erin Percival Carter'))) {
      copyrightClicks++;
      clearTimeout(copyrightTimer);
      copyrightTimer = setTimeout(() => { copyrightClicks = 0; }, 2000);
      
      if (copyrightClicks >= 5) {
        releaseFlock();
        copyrightClicks = 0;
      }
    }
  });
})();
