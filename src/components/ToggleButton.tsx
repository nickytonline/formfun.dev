import { createSignal } from "solid-js";

interface ToggleButtonProps {
  ref?: HTMLButtonElement;
  initialState?: boolean;
  id?: string;
  onToggle: (event: Event) => void;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const [isOn, setIsOn] = createSignal(props.initialState || false);

  const handleToggle = (event: Event) => {
    const newState = !isOn();
    setIsOn(newState);

    if (props.onToggle) {
      props.onToggle(event);
    }
  };

  return (
    <button
      ref={props.ref}
      id={props.id}
      type="button"
      onClick={handleToggle}
      role="switch"
      aria-checked={isOn()}
      class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border hover:bg-gray-400 hover:aria-checked:bg-purple-400 ${
        isOn() ? "bg-purple-600" : "bg-gray-200"
      }`}
    >
      <span
        class={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isOn() ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};
