"use client";

// ============================================================
// FloatingObjects - Subtle background animations
// Gradient orbs that float slowly without hurting performance
// ============================================================

export function FloatingObjects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Gradient Orb 1 - Top Left */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,116,0.3) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
          animation: "float1 20s ease-in-out infinite",
        }}
      />

      {/* Gradient Orb 2 - Top Right */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,219,184,0.25) 0%, transparent 70%)",
          top: "10%",
          right: "-5%",
          animation: "float2 25s ease-in-out infinite",
        }}
      />

      {/* Gradient Orb 3 - Bottom Right */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(154,130,104,0.3) 0%, transparent 70%)",
          bottom: "15%",
          right: "10%",
          animation: "float3 22s ease-in-out infinite",
        }}
      />

      {/* CSS Keyframes */}
      <style>{`
        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) scale(0.95);
          }
          66% {
            transform: translate(25px, -25px) scale(1.05);
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(35px, 35px) scale(1.08);
          }
          66% {
            transform: translate(-30px, -20px) scale(0.92);
          }
        }

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .absolute {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
