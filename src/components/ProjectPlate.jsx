import { useEffect, useRef } from 'react';
import { observePlate, motifFor, languageColor } from '../lib/art';

/**
 * ProjectPlate — a deterministic technical artwork rendered on canvas.
 * No image is shipped or fetched; the motif is derived from the repo name.
 */
export default function ProjectPlate({ repo }) {
  const canvasRef = useRef(null);
  const name = repo?.name ?? '';
  const language = repo?.language ?? '';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !name) return undefined;
    return observePlate(canvas, { name, language });
  }, [name, language]);

  return (
    <div className="art-frame">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Generated technical artwork for ${name || 'project'}`}
      />
      <span
        className="chip"
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 3,
          background: 'rgba(6,8,12,0.72)',
          backdropFilter: 'blur(8px)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: 'var(--tracking-wide)',
          textTransform: 'uppercase',
          fontSize: 'var(--text-2xs)',
          color: languageColor(language),
          borderColor: 'rgba(255,255,255,0.12)',
        }}
      >
        {motifFor(name)}
      </span>
    </div>
  );
}
