import React, { useMemo } from 'react';

interface PetalConfig {
  id: number;
  left: number;       // percentage 0 - 100
  size: number;       // width/height in px
  duration: number;   // seconds
  delay: number;      // seconds
  initialRotation: number;
  swayDistance: number;
  opacity: number;
  blur?: number;      // px blur for depth-of-field
  variant: 1 | 2 | 3; // shape variant
}

export const FlowerPetals: React.FC = () => {
  // Generate consistent pseudo-random petals with staggered positions and negative delays for immediate natural distribution
  const petals: PetalConfig[] = useMemo(() => {
    return [
      // Left side field
      { id: 1, left: 4, size: 48, duration: 15, delay: -2, initialRotation: 25, swayDistance: 25, opacity: 0.85, blur: 0, variant: 1 },
      { id: 2, left: 12, size: 64, duration: 19, delay: -8, initialRotation: 80, swayDistance: -20, opacity: 0.75, blur: 0.8, variant: 2 },
      { id: 3, left: 22, size: 36, duration: 14, delay: -5, initialRotation: -45, swayDistance: 30, opacity: 0.9, blur: 0, variant: 3 },
      { id: 4, left: 28, size: 52, duration: 17, delay: -12, initialRotation: 140, swayDistance: -25, opacity: 0.8, blur: 0, variant: 1 },
      { id: 5, left: 8, size: 76, duration: 22, delay: -15, initialRotation: 200, swayDistance: 35, opacity: 0.65, blur: 1.5, variant: 2 },

      // Center field
      { id: 6, left: 38, size: 42, duration: 16, delay: -3, initialRotation: 15, swayDistance: 20, opacity: 0.85, blur: 0, variant: 3 },
      { id: 7, left: 46, size: 56, duration: 20, delay: -10, initialRotation: -70, swayDistance: -30, opacity: 0.8, blur: 0.5, variant: 1 },
      { id: 8, left: 54, size: 38, duration: 13, delay: -6, initialRotation: 95, swayDistance: 25, opacity: 0.9, blur: 0, variant: 2 },
      { id: 9, left: 62, size: 68, duration: 21, delay: -14, initialRotation: -30, swayDistance: -20, opacity: 0.7, blur: 1.2, variant: 3 },

      // Right side field
      { id: 10, left: 70, size: 44, duration: 15, delay: -1, initialRotation: 40, swayDistance: 30, opacity: 0.88, blur: 0, variant: 1 },
      { id: 11, left: 78, size: 60, duration: 18, delay: -7, initialRotation: 120, swayDistance: -25, opacity: 0.82, blur: 0.6, variant: 2 },
      { id: 12, left: 86, size: 40, duration: 14, delay: -11, initialRotation: -50, swayDistance: 35, opacity: 0.9, blur: 0, variant: 3 },
      { id: 13, left: 92, size: 72, duration: 23, delay: -4, initialRotation: 65, swayDistance: -30, opacity: 0.75, blur: 1.4, variant: 1 },
      { id: 14, left: 96, size: 50, duration: 16, delay: -9, initialRotation: 180, swayDistance: 20, opacity: 0.85, blur: 0, variant: 2 },
      { id: 15, left: 82, size: 34, duration: 12, delay: -13, initialRotation: -110, swayDistance: -15, opacity: 0.92, blur: 0, variant: 3 },
      { id: 16, left: 16, size: 40, duration: 15, delay: -16, initialRotation: 45, swayDistance: 20, opacity: 0.88, blur: 0, variant: 1 },
    ];
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {/* SVG Filters & Gradient Definitions */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Main Rose Petal Gradient */}
          <linearGradient id="sakhiPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F3" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FFC2D1" stopOpacity="0.92" />
            <stop offset="75%" stopColor="#FF8FA3" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#FF6B8B" stopOpacity="0.85" />
          </linearGradient>

          {/* Deep Petal Gradient for contrast */}
          <linearGradient id="sakhiPetalDeep" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFE5EC" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFADC2" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#FB6F92" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E0466C" stopOpacity="0.8" />
          </linearGradient>

          {/* Soft Highlight for Petal Rib / Curvature */}
          <linearGradient id="sakhiPetalHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#FFE4EC" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF9AB3" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Static Ambient Petals anchored to edges (Hero framing like reference) */}
      <div className="absolute top-12 -right-8 w-44 h-44 opacity-80 rotate-12 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(251,111,146,0.25)]">
          <path
            d="M 50,5 C 75,20 95,50 82,78 C 68,98 32,96 18,74 C 5,50 25,20 50,5 Z"
            fill="url(#sakhiPetalGrad)"
          />
          <path
            d="M 50,15 C 68,28 78,50 70,70"
            stroke="url(#sakhiPetalHighlight)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute top-[28%] -right-12 w-56 h-56 opacity-75 -rotate-45 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_12px_24px_rgba(251,111,146,0.2)]">
          <path
            d="M 45,8 C 72,15 92,42 85,72 C 75,95 38,98 22,78 C 8,58 18,25 45,8 Z"
            fill="url(#sakhiPetalDeep)"
          />
        </svg>
      </div>

      <div className="absolute bottom-16 -right-6 w-48 h-48 opacity-85 rotate-[110deg] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(251,111,146,0.25)]">
          <path
            d="M 50,5 C 75,20 95,50 82,78 C 68,98 32,96 18,74 C 5,50 25,20 50,5 Z"
            fill="url(#sakhiPetalGrad)"
          />
        </svg>
      </div>

      <div className="absolute top-[60%] -left-10 w-40 h-40 opacity-55 rotate-[30deg] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(251,111,146,0.15)]">
          <path
            d="M 50,5 C 75,20 95,50 82,78 C 68,98 32,96 18,74 C 5,50 25,20 50,5 Z"
            fill="url(#sakhiPetalGrad)"
          />
        </svg>
      </div>

      {/* Floating Dynamic Falling Petals */}
      {petals.map((p) => {
        return (
          <div
            key={p.id}
            className="absolute animate-petal-fall"
            style={{
              left: `${p.left}%`,
              top: '-10%',
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
              filter: p.blur ? `blur(${p.blur}px)` : 'none',
              transform: `rotate(${p.initialRotation}deg)`,
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_6px_14px_rgba(251,111,146,0.3)]"
            >
              {p.variant === 1 && (
                <>
                  {/* Organic Rose / Cherry Blossom Petal */}
                  <path
                    d="M 50,5 C 75,18 95,45 84,74 C 72,96 32,96 18,74 C 5,48 24,18 50,5 Z"
                    fill="url(#sakhiPetalGrad)"
                  />
                  <path
                    d="M 50,14 C 65,28 72,48 66,66"
                    stroke="url(#sakhiPetalHighlight)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </>
              )}

              {p.variant === 2 && (
                <>
                  {/* Flared Curved Petal with Soft Fold */}
                  <path
                    d="M 45,8 C 72,16 92,42 85,70 C 76,94 36,98 20,78 C 6,56 18,22 45,8 Z"
                    fill="url(#sakhiPetalDeep)"
                  />
                  <path
                    d="M 45,18 C 60,30 68,52 60,70"
                    stroke="url(#sakhiPetalHighlight)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </>
              )}

              {p.variant === 3 && (
                <>
                  {/* Delicately Tapered Sakura Petal */}
                  <path
                    d="M 50,8 C 78,25 90,56 78,82 C 65,98 35,98 22,82 C 10,56 22,25 50,8 Z"
                    fill="url(#sakhiPetalGrad)"
                  />
                  <path
                    d="M 50,18 C 52,40 50,65 48,78"
                    stroke="url(#sakhiPetalHighlight)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </>
              )}
            </svg>
          </div>
        );
      })}
    </div>
  );
};
