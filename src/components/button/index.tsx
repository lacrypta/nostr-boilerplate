import type { MouseEventHandler } from "react";

export interface ButtonProps {
  onClick?: MouseEventHandler | undefined;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <div className={className}>
      <button
        className="link flex flex-row justify-center items-center pt-1 pb-1 p-3 md:p-4 lg:p-3 text-sm lg:text-base font-semibold transition-transform ease-in-out active:scale-95 active:bg-white/5"
        onClick={onClick}
      >
        <span className="z-10">
        {children}
        </span>
      </button>
    </div>
  );
};

export default Button;
