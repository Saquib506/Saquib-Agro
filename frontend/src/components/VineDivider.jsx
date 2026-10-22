// Signature element: an animated growing vine that draws itself across section breaks.
// Ties the platform's "growth" narrative into a reusable structural device.
export default function VineDivider({ flip = false }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10">
        <path
          d="M0,30 C150,60 300,0 450,30 C600,60 750,0 900,30 C1000,50 1100,10 1200,30"
          fill="none"
          stroke="#4CAF6D"
          strokeWidth="2"
          strokeLinecap="round"
          className="vine-path"
        />
        {[120, 340, 560, 780, 1000].map((x, i) => (
          <circle key={i} cx={x} cy={i % 2 === 0 ? 22 : 40} r="4" fill="#F4A833" />
        ))}
      </svg>
      <style>{`
        .vine-path {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: draw-vine 1.8s ease-out forwards;
        }
        @keyframes draw-vine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
