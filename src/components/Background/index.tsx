import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => (
  <div className="p-10 h-screen bg-black text-white">{children}</div>
);
