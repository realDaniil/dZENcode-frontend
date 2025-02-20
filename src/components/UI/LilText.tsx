import React, { ReactNode } from 'react';

export default function LilText({
  children,
  className = '',
  style
}: {  
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p className={className} style={{ fontSize: 12, color: 'gray', fontWeight: 600, lineHeight: '12px', ...style }}>
      {children}
    </p>
  );
}
