import React from 'react';

interface Props {
  onClick: () => void;
  title: string;
  disabled?: boolean;
}

export default ({ title, onClick, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className="bg-white text-black p-5 disabled:opacity-50"
    >
      {title}
    </button>
  );
};
