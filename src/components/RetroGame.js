import React, { useState, useEffect, useRef } from 'react';

const RetroGame = ({ language = 'de', darkMode = false }) => {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Spracheinstellungen
  const content = {
    de: {
      title: "Retro UX Runner",
      description: "Springe über die Hindernisse mit der Leertaste oder Tap/Klick",
      startButton: "Spiel starten",
      restartButton: "Erneut spielen",
      score: "Punktzahl",
      highScore: "Highscore",
      gameOver: "Game Over"
    },
    en: {
      title: "Retro UX Runner",
      description: "Jump over obstacles with spacebar or tap/click",
      startButton: "Start Game",
      restartButton: "Play Again",
      score: "Score",
      highScore: "High Score",
      gameOver: "Game Over"
    }
  };

  // Retro Sound spielen
  const playSound = (type) => {
    let audio;
    switch (type) {
      case 'jump':
        audio = new Audio('/assets/sounds/retro-jump.mp3');
        break;
      case 'hit':
        audio = new Audio('/assets/sounds/retro-hit.mp3');
        break;
      case 'point':
        audio = new Audio('/assets/sounds/retro-point.mp3');
        break;
      default:
        audio = new Audio('/assets/sounds/retro-click.mp3');
    }
    audio.volume = 0.2;
    audio.play();
  };

  // Spielstand zurücksetzen
  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
  };

  // Spiel starten
  const startGame = () => {
    playSound('click');
    setGameStarted(true);
    setGameOver(false);
  };

  // Spiel neu starten
  const restartGame = () => {
    playSound('click');
    resetGame();
    startGame();
  };

  // Spiellogik
  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Spielvariablen
    let animationId;
    let frameCount = 0;
    let obstacleInterval = 100; // Hindernisabstand (Frames)
    let speed = 5;
    let gravity = 0.6;

    // Spielelemente
    const player = {
      x: 50,
      y: canvas.height - 40,
      width: 20,
      height: 30,
      velocityY: 0,
      jumping: false,
      color: darkMode ? '#f97316' : '#ea580c' // Orange
    };

    const obstacles = [];

    // Animation für Spielerschritt
    const playerSprites = [
      { width: 20, height: 30 },
      { width: 20, height: 32 }
    ];
    let spriteIndex = 0;

    // Spieler zeichnen
    const drawPlayer = () => {
      // Aktuelle Sprite-Größe
      const sprite = playerSprites[spriteIndex];

      // Pixel-Art-Stil Spieler (Roboter im Retro-Stil)
      ctx.fillStyle = player.color;

      // Kopf
      ctx.fillRect(player.x, player.y - 10, sprite.width, 15);

      // Augen
      ctx.fillStyle = darkMode ? '#1f2937' : '#ffffff';
      ctx.fillRect(player.x + 5, player.y - 7, 4, 4);
      ctx.fillRect(player.x + 12, player.y - 7, 4, 4);

      // Körper
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x + 2, player.y + 5, sprite.width - 4, sprite.height - 15);

      // Beine (animiert)
      if (spriteIndex === 0) {
        ctx.fillRect(player.x + 4, player.y + 20, 5, 10);
        ctx.fillRect(player.x + 12, player.y + 20, 5, 10);
      } else {
        ctx.fillRect(player.x + 4, player.y + 20, 5, 12);
        ctx.fillRect(player.x + 12, player.y + 20, 5, 8);
      }
    };

    // Hindernis erstellen
    const createObstacle = () => {
      const height = 15 + Math.random() * 20;
      const obstacle = {
        x: canvas.width,
        y: canvas.height - height,
        width: 15,
        height: height,
        color: darkMode ? '#e5e7eb' : '#374151',
        passed: false
      };
      obstacles.push(obstacle);
    };

    // Hindernisse zeichnen
    const drawObstacles = () => {
      obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.color;

        // Verschiedene Hindernistypen
        if (obstacle.height > 25) {
          // Großes Hindernis
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

          // Details hinzufügen
          ctx.fillStyle = darkMode ? '#1f2937' : '#d1d5db';
          ctx.fillRect(obstacle.x + 3, obstacle.y + 5, obstacle.width - 6, 2);
          ctx.fillRect(obstacle.x + 3, obstacle.y + 10, obstacle.width - 6, 2);
        } else {
          // Kleines Hindernis
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

          // Spitzen oben
          ctx.beginPath();
          ctx.moveTo(obstacle.x, obstacle.y);
          ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y - 5);
          ctx.lineTo(obstacle.x + obstacle.width, obstacle.y);
          ctx.fill();
        }
      });
    };

    // Hintergrund zeichnen
    const drawBackground = () => {
      // Himmel
      ctx.fillStyle = darkMode ? '#1f2937' : '#e5e7eb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Boden
      ctx.fillStyle = darkMode ? '#374151' : '#9ca3af';
      ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

      // Pixel-Sterne (nur im Dark Mode)
      if (darkMode) {
        ctx.fillStyle = '#e5e7eb';
        for (let i = 0; i < 20; i++) {
          const x = (i * 50 + frameCount * 0.5) % canvas.width;
          const y = 20 + Math.sin(frameCount * 0.05 + i) * 10;
          ctx.fillRect(x, y, 2, 2);
        }
      }

      // Retro-Sonne/Mond
      ctx.fillStyle = darkMode ? '#e5e7eb' : '#f97316';
      ctx.beginPath();
      ctx.arc(canvas.width - 50, 50, 20, 0, Math.PI * 2);
      ctx.fill();

      // Retro-Pixel-Hügel im Hintergrund
      ctx.fillStyle = darkMode ? '#4b5563' : '#d1d5db';
      for (let i = 0; i < 3; i++) {
        const width = 150 + i * 50;
        const height = 30 + i * 10;
        const x = (i * 200 + frameCount * 0.5) % (canvas.width + width) - width;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - 10);
        ctx.lineTo(x + width / 2, canvas.height - height);
        ctx.lineTo(x + width, canvas.height - 10);
        ctx.fill();
      }

      // Score anzeigen
      ctx.fillStyle = darkMode ? '#e5e7eb' : '#111827';
      ctx.font = '18px monospace';
      ctx.fillText(`${content[language].score}: ${score}`, 10, 25);
      ctx.fillText(`${content[language].highScore}: ${highScore}`, 10, 50);
    };

    // Kollisionserkennung
    const checkCollision = () => {
      for (const obstacle of obstacles) {
        if (
          player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < obstacle.y + obstacle.height &&
          player.y + player.height > obstacle.y
        ) {
          return true;
        }

        // Punkt für übersprungenes Hindernis
        if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
          obstacle.passed = true;
          setScore(prev => prev + 1);
          if (score > 0 && score % 5 === 0) {
            playSound('point');
          }
        }
      }
      return false;
    };

    // Spieler springen lassen
    const jump = () => {
      if (!player.jumping) {
        player.velocityY = -12;
        player.jumping = true;
        playSound('jump');
      }
    };

    // Event-Listener für Tastatureingaben
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        jump();
      }
    };

    // Event-Listener für Mausklicks / Touch
    const handleClick = () => {
      jump();
    };

    // Event-Listener hinzufügen
    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleClick);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Hintergrund zeichnen
      drawBackground();

      // Spieler-Animation alle 10 Frames
      if (frameCount % 10 === 0 && !player.jumping) {
        spriteIndex = (spriteIndex + 1) % 2;
      }

      // Spieler-Physik
      player.velocityY += gravity;
      player.y += player.velocityY;

      // Boden-Kollision
      if (player.y > canvas.height - 40) {
        player.y = canvas.height - 40;
        player.velocityY = 0;
        player.jumping = false;
      }

      // Spieler zeichnen
      drawPlayer();

      // Neues Hindernis erstellen
      if (frameCount % obstacleInterval === 0) {
        createObstacle();

        // Schwierigkeit erhöhen
        obstacleInterval = Math.max(60, obstacleInterval - 1);
        speed = Math.min(10, speed + 0.1);
      }

      // Hindernisse bewegen und zeichnen
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= speed;

        // Hindernisse entfernen, die außerhalb des Bildschirms sind
        if (obstacles[i].x + obstacles[i].width < 0) {
          obstacles.splice(i, 1);
        }
      }
      drawObstacles();

      // Kollisionsprüfung
      if (checkCollision()) {
        playSound('hit');
        setGameOver(true);
        setHighScore(prev => Math.max(prev, score));
        cancelAnimationFrame(animationId);
        return;
      }

      frameCount++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleClick);
    };
  }, [gameStarted, gameOver, darkMode, language, score, highScore]);

  // Dynamische Stile basierend auf Dark/Light Mode
  const theme = {
    bg: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    text: darkMode ? 'text-gray-50' : 'text-gray-900',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    highlight: 'text-orange-500',
  };

  return (
    <div className={`${theme.cardBg} rounded-xl overflow-hidden shadow-lg border ${theme.border} transition-colors duration-300 max-w-lg mx-auto`}>
      <div className="p-4 text-center">
        <h3 className={`${theme.text} text-2xl font-bold mb-2`}>
          {content[language].title}
        </h3>

        <p className={`${theme.text} text-sm mb-4 opacity-80`}>
          {content[language].description}
        </p>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="w-full h-auto bg-gray-100 dark:bg-gray-800 cursor-pointer"
        />

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <button
              onClick={startGame}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full transition-all transform hover:scale-105 text-lg font-semibold"
            >
              {content[language].startButton}
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
            <h3 className="text-white text-2xl font-bold mb-4">
              {content[language].gameOver}
            </h3>
            <button
              onClick={restartGame}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full transition-all transform hover:scale-105 text-lg font-semibold"
            >
              {content[language].restartButton}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetroGame;