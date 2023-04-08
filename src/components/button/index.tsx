import type { MouseEventHandler } from "react";

export interface ButtonProps {
  onClick?: MouseEventHandler | undefined;
  children: React.ReactNode;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="flex flex-col rounded-xl bg-white/10 p-5 text-lg text-white transition-transform ease-in-out hover:bg-white/20 active:scale-95 active:bg-white/5"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
