import { createEffect, createSignal, For, Show, type Setter } from "solid-js";
import { ToggleButton } from "./ToggleButton";

interface ConstraintValidationPanelProps {
  inputRef:
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
    | undefined;
  setValidationMessage: Setter<string>;
}

const ConstraintValidationPanel = ({
  inputRef,
  setValidationMessage,
}: ConstraintValidationPanelProps) => {
  const [validationProps, setValidationProps] = createSignal<
    Record<string, any>
  >({});

  const updateValidationProps = () => {
    if (!inputRef) return;

    setValidationMessage(inputRef.validationMessage);

    const props: Record<string, { value: any; type: string }> = {
      required: { value: inputRef.required, type: "boolean" },
      ["validity.valid"]: {
        value: inputRef.validity.valid,
        type: "string",
      },
      validationMessage: {
        value: inputRef.validationMessage,
        type: "string",
      },
      willValidate: { value: inputRef.willValidate, type: "boolean" },
    };

    if (
      inputRef instanceof HTMLInputElement &&
      [
        "range",
        "number",
        "date",
        "month",
        "week",
        "time",
        "datetime-local",
      ].includes(inputRef.type)
    ) {
      if ("min" in inputRef) {
        props.min = { value: inputRef.min, type: "number" };
      }

      if ("max" in inputRef) {
        props.max = { value: inputRef.max, type: "number" };
      }

      if ("step" in inputRef) {
        props.step = { value: inputRef.step, type: "number" };
      }
    }

    if (
      (inputRef instanceof HTMLInputElement &&
        ["text", "email", "password", "tel", "url"].includes(inputRef.type)) ||
      inputRef instanceof HTMLTextAreaElement
    ) {
      if ("minLength" in inputRef && inputRef.maxLength !== -1) {
        props.minLength = { value: inputRef.minLength, type: "number" };
      }

      if ("maxLength" in inputRef && inputRef.maxLength !== -1) {
        props.maxLength = { value: inputRef.maxLength, type: "number" };
      }
    }

    if ("pattern" in inputRef) {
      props.pattern = { value: inputRef.pattern, type: "string" };
    }

    setValidationProps(props);
  };

  createEffect(() => {
    if (inputRef) {
      const resetValidationProps = () => {
        setTimeout(updateValidationProps);
      };

      updateValidationProps();

      const observer = new MutationObserver(updateValidationProps);
      observer.observe(inputRef, { attributes: true });

      inputRef.addEventListener("input", updateValidationProps);
      inputRef.addEventListener("change", updateValidationProps);
      inputRef.form?.addEventListener("reset", resetValidationProps);

      return () => {
        observer.disconnect();
        inputRef.removeEventListener("input", updateValidationProps);
        inputRef.removeEventListener("change", updateValidationProps);
        inputRef.form?.removeEventListener("reset", resetValidationProps);
      };
    }
  });

  const handleValueChange = (key: string, value: string) => {
    if (inputRef) {
      switch (key) {
        case "validationMessage":
          if (!inputRef.validity.valid) {
            inputRef.setCustomValidity(value);
            setValidationMessage(value);
          } else {
            inputRef.setCustomValidity("");
            setValidationMessage("");
          }
          break;
        case "min":
          if ("min" in inputRef) {
            inputRef.min = value;
          }
          break;
        case "max":
          if ("max" in inputRef) {
            inputRef.max = value;
          }
          break;
        case "step":
          if ("step" in inputRef) {
            inputRef.step = value;
          }
          break;
        case "pattern":
          if ("pattern" in inputRef) {
            inputRef.pattern = value;
          }
          break;
        case "required":
          inputRef.required = !inputRef.required;
          break;
      }
      updateValidationProps();
    }
  };

  const isEditable = (key: string) => {
    return [
      "min",
      "max",
      "minLength",
      "maxLength",
      "step",
      "pattern",
      "required",
    ].includes(key);
  };

  return (
    <div class="p-4 border rounded-md bg-gray-50 w-fit">
      <h2 class="text-lg font-semibold mb-2">Constraint Validation API</h2>
      <div class="flex flex-col gap-2 overflow-auto w-fit py-2 pr-2 max-h-48 md:max-h-full">
        <For each={Object.entries(validationProps())}>
          {([key, { value, type }]) => (
            <label class="grid grid-cols-2 gap-2">
              <span>{key}</span>
              {key === "required" ? (
                <ToggleButton
                  initialState={value}
                  onToggle={(event: Event) =>
                    handleValueChange(
                      key,
                      (event?.currentTarget as HTMLInputElement).value,
                    )
                  }
                />
              ) : (
                <input
                  type={type}
                  value={value}
                  onChange={(e) =>
                    handleValueChange(key, e.currentTarget.value)
                  }
                  class="border rounded px-1 w-full"
                  readOnly={!isEditable(key)}
                />
              )}
            </label>
          )}
        </For>
      </div>
    </div>
  );
};

export default ConstraintValidationPanel;
