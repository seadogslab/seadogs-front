import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => (
  <div className="p-10  bg-black text-white">{children}</div>
);
