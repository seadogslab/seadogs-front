import React from "react";
import styles from "../../styles/button.module.css";
interface Props {
  onClick?: () => void;
  text?: string | React.ReactNode;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Button = ({ className, text, onClick, children, disabled }: Props) => {
  return (
    <button
      className={className ? `${className} ${styles.button}` : styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {text ?? children}
    </button>
  );
};

export default Button;
