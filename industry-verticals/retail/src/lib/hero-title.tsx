import { Fragment, type ReactNode } from 'react';

/**
 * Renders hero headline text with optional **accent** segments (shown in `text-accent`).
 * Example: `Trusted **AI-powered** automation`
 */
export function parseAccentTitleMarkers(raw: string): ReactNode {
  if (!raw) {
    return null;
  }
  const pieces = raw.split(/(\*\*[^*]+\*\*)/g);
  return pieces.map((piece, i) => {
    const m = piece.match(/^\*\*([^*]+)\*\*$/);
    if (m) {
      return (
        <span key={i} className="text-accent font-extrabold">
          {m[1]}
        </span>
      );
    }
    return <Fragment key={i}>{piece}</Fragment>;
  });
}
