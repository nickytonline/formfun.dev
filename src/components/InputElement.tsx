import { createSignal } from "solid-js";
import { ToggleButton } from "./ToggleButton";
import ConstraintValidationPanel from "./ConstraintValidationPanel";
import { EditStatePanel } from "./EditStatePanel";
import { FormButtons } from "./FormButtons";

interface InputElementProps {
  type: string;
  label: string;
  placeholder: string;
  description: string;
  validationProperties: Record<string, string | number> | {};
}

const INPUT_STATES = ["editable", "readonly", "disabled"] as const;

type InputState = (typeof INPUT_STATES)[number];

export const InputElement = ({
  type,
  label,
  placeholder,
  description,
  validationProperties = {},
}: InputElementProps) => {
  const [inputState, setInputState] = createSignal<InputState>("editable");
  const [builtinValidation, setBuiltinValidation] = createSignal(true);
  const [formSubmitMessage, setFormSubmitMessage] = createSignal("");
  const [userPseudos, setUserPseudos] = createSignal(false);
  const [validationMessage, setValidationMessage] = createSignal("");

  let inputRef: HTMLInputElement | undefined;

  const handleInputStateChange = (newState: InputState) => {
    setFormSubmitMessage("");
    setInputState(newState);
  };

  const togglePseudos = () => {
    setFormSubmitMessage("");
    setUserPseudos(!userPseudos());
  };

  const toggleValidation = () => {
    setFormSubmitMessage("");
    setBuiltinValidation(!builtinValidation());
  };

  const handleSubmit = (event: Event) => {
    const form = event.currentTarget as HTMLFormElement;

    if (form && form.checkValidity()) {
      setFormSubmitMessage("✅ Form submitted successfully");
    } else {
      setFormSubmitMessage("❌ Form validation failed");
    }

    event.preventDefault();
  };

  return (
    <>
      <form
        id={`form-${type}`}
        onSubmit={handleSubmit}
        class="grid gap-4 mb-4"
        {...(!builtinValidation() && { noValidate: true })}
      >
        <p>{description}</p>
        <div class="form-element-container grid gap-2">
          <label for={type}>{label}</label>
          <span class="flex flex-wrap items-center gap-2">
            <input
              id={type}
              ref={inputRef}
              type={type}
              placeholder={placeholder}
              {...(inputState() === "readonly" && { readOnly: true })}
              {...(inputState() === "disabled" && { disabled: true })}
              class="rounded p-2 max-w-72 lg:max-w-96 min-w-72"
              onFocus={() => setFormSubmitMessage("")}
              required
              {...(userPseudos() && { ["data-user-pseudos"]: "true" })}
              {...validationProperties}
            />
            <span class="text-2xl user-interact invisible">
              {validationMessage()}
            </span>
          </span>
        </div>
      </form>
      <ConstraintValidationPanel
        inputRef={inputRef}
        setValidationMessage={setValidationMessage}
      />
      <div
        class={`grid gap-2 mt-2 lg:mt-4 md:flex-wrap ${type === "color" ? "hidden" : ""}`}
      >
        <EditStatePanel
          onEditStateChanged={handleInputStateChange}
          editStates={INPUT_STATES}
          currentState={inputState()}
        />
        <div class="flex gap-2">
          <label for={`toggle-button-${type}-pseudos`}>
            :user-* CSS pseudo-classes
          </label>
          <ToggleButton
            id={`toggle-button-${type}-pseudos`}
            onToggle={togglePseudos}
            initialState={userPseudos()}
          />
        </div>
        <div class="flex gap-2">
          <label for={`toggle-button-${type}-builtin`}>
            Built-in Validation
          </label>
          <ToggleButton
            id={`toggle-button-${type}-builtin`}
            onToggle={toggleValidation}
            initialState={builtinValidation()}
          />
        </div>
      </div>
      <FormButtons elementType={type} formSubmitMessage={formSubmitMessage} />
    </>
  );
};
