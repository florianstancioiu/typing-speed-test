import { cn } from "tailwind-cn";

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const Button = ({ children, className }: ButtonProps) => {
  const baseClasses =
    "py-4 px-6 rounded-xl bg-blue-600 font-semibold text-white text-xl cursor-pointer";
  const mergedClasses = cn(
    baseClasses,
    typeof className !== undefined ? className : ""
  );

  return <button className={mergedClasses}>{children}</button>;
};

export default Button;
