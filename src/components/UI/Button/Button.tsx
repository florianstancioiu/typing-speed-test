export type ButtonProps = {
  children: React.ReactNode;
};

const Button = ({ children }: ButtonProps) => {
  return <button className="py-4 px-6 rounded-xl">{children}</button>;
};

export default Button;
