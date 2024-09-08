import { splitProps, type JSXElement, type JSX } from "solid-js";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  onClick?: (event: MouseEvent) => void;
  children: JSXElement;
}

export const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, ["variant", "onClick", "children"]);

  const getButtonClass = () => {
    const baseClass = "px-2 py-1 rounded-md w-fit transition-colors";
    const variantClass =
      local.variant === "secondary"
        ? "bg-gray-500 text-white hover:bg-gray-600"
        : "bg-purple-600 text-white hover:bg-purple-700";
    return `${baseClass} ${variantClass}`;
  };

  return (
    <button
      type={others.type || "button"}
      onClick={local.onClick}
      class={getButtonClass()}
      {...others}
    >
      {local.children}
    </button>
  );
};
