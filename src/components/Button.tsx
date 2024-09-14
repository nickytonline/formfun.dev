import { splitProps, type JSX } from "solid-js";

interface ButtonProps
  extends Omit<
    JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "class"
  > {
  variant: "primary" | "secondary";
}

export const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, ["variant", "onClick", "children"]);

  const getButtonClass = () => {
    const baseClass =
      "px-2.5 py-1.5 rounded-md w-fit transition-colors w-full sm:w-fit";
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
