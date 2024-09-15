import { createSignal, For } from "solid-js";
import { ToggleButton } from "./ToggleButton";
import ConstraintValidationPanel from "./ConstraintValidationPanel";
import { EditStatePanel, type InputState } from "./EditStatePanel";
import { FormButtons } from "./FormButtons";
import { CustomError } from "./CustomError";

interface SelectElementProps {
  type: string;
  label: string;
  options: { value: string; label: string }[];
  description: string;
  validationProperties: Record<string, string | number> | {};
}

const INPUT_STATES = ["editable", "readonly", "disabled"] as const;

export const SelectElement = ({
  type,
  label,
  options,
  description,
  validationProperties,
}: SelectElementProps) => {
  const [inputState, setInputState] = createSignal<InputState>("editable");
  const [builtinValidation, setBuiltinValidation] = createSignal(true);
  const [formSubmitMessage, setFormSubmitMessage] = createSignal("");
  const [userPseudos, setUserPseudos] = createSignal(false);
  const [validationMessage, setValidationMessage] = createSignal("");

  let inputRef: (HTMLInputElement & HTMLSelectElement) | undefined;
  let selectRef: (HTMLSelectElement & HTMLSelectElement) | undefined;

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

  const onReset = () => {
    setFormSubmitMessage("");
  };

  return (
    <>
      <form
        id={`form-${type}`}
        onSubmit={handleSubmit}
        onReset={onReset}
        class="grid gap-4 mb-4"
        {...(!builtinValidation() && { noValidate: true })}
      >
        <p>{description}</p>
        <div class="grid gap-2">
          <label for={type}>{label}</label>
          <span class="flex flex-wrap items-center gap-2">
            {type === "datalist" ? (
              <>
                <input
                  ref={inputRef}
                  list={`${type}-list`}
                  id={type}
                  class="rounded p-2 max-w-72 lg:max-w-96 min-w-72"
                  {...(inputState() === "readonly" && { readOnly: true })}
                  {...(inputState() === "disabled" && { disabled: true })}
                  onFocus={() => {
                    setFormSubmitMessage("");
                    inputRef?.setCustomValidity("");
                  }}
                  required
                  {...(userPseudos() && { ["data-user-pseudos"]: "true" })}
                  {...validationProperties}
                />
                <datalist id={`${type}-list`}>
                  <For each={options}>
                    {(option) => (
                      <option value={option.value}>{option.label}</option>
                    )}
                  </For>
                </datalist>
              </>
            ) : (
              <select
                id={type}
                ref={selectRef}
                {...(type === "multiselect" && { multiple: true })}
                {...(inputState() === "readonly" && { readOnly: true })}
                {...(inputState() === "disabled" && { disabled: true })}
                class="rounded p-2 max-w-72 lg:max-w-96"
                onFocus={() => {
                  setFormSubmitMessage("");
                }}
                required
                {...(userPseudos() && { ["data-user-pseudos"]: "true" })}
                {...validationProperties}
              >
                <For each={options}>
                  {(option) => (
                    <option value={option.value}>{option.label}</option>
                  )}
                </For>
              </select>
            )}
            <CustomError message={validationMessage} />
          </span>
        </div>
      </form>
      <ConstraintValidationPanel
        inputRef={selectRef ?? inputRef}
        setValidationMessage={setValidationMessage}
      />
      <div
        class={`grid gap-2 mt-2 lg:mt-4 md:flex-wrap ${type === "color" ? "hidden" : ""}`}
      >
        <EditStatePanel
          controlType={type}
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
