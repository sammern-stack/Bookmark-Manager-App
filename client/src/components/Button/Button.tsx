import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit";
  disabled: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type,
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button type={type} className="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
