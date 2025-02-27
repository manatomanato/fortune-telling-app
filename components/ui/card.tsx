

import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div className={`border p-4 rounded shadow ${className}`} {...props}>
      {children}
    </div>
  );
};

// CardContent を追加
export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};