import { ReactNode } from 'react';

export default function Card({
  children,
  className,
  style
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`card w-100 container shadow-sm border mb-3 d-flex flex-row align-items-center justify-content-between ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
