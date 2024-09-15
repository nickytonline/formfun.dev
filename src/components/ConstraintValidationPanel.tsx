import { createEffect, createSignal, For, type Setter } from "solid-js";
import { ToggleButton } from "./ToggleButton";
import { Button } from "./Button";

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
  const [isValid, setIsValid] = createSignal<boolean | undefined>();
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
        type: "multiline",
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
        props.min = {
          value: inputRef.min,
          type: ["range", "number"].includes(inputRef.type)
            ? "number"
            : "string",
        };
      }

      if ("max" in inputRef) {
        props.max = {
          value: inputRef.min,
          type: ["range", "number"].includes(inputRef.type)
            ? "number"
            : "string",
        };
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
    if (!inputRef) {
      return;
    }

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
  });

  const handleValueChange = (key: string, value: string) => {
    if (inputRef) {
      switch (key) {
        case "validationMessage":
          if (!inputRef.validity.valid) {
            inputRef.setCustomValidity(value);
            setValidationMessage(value);
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
        case "minLength":
          if ("minLength" in inputRef) {
            inputRef.minLength = Number(value);
          }
          break;
        case "maxLength":
          if ("maxLength" in inputRef) {
            inputRef.maxLength = Number(value);
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
    const keys = [
      "min",
      "max",
      "minLength",
      "maxLength",
      "step",
      "pattern",
      "required",
    ];

    if (!inputRef?.validity.valid) {
      keys.push("validationMessage");
    }

    return keys.includes(key);
  };

  return (
    <div class="p-4 border rounded-md bg-gray-50 w-full md:w-fit lg:w-1/2 lg:max-w-5xl">
      <h2 class="text-lg font-semibold mb-2">Constraint Validation API</h2>
      <div class="grid gap-2 overflow-auto w-full md:w-fit lg:w-full py-2 px-2 max-h-60 md:max-h-full">
        <div class="grid sm:grid-cols-2 gap-2 items-center">
          <Button
            variant="primary"
            onClick={() => {
              setIsValid(inputRef?.reportValidity());
            }}
          >
            reportValidity()
          </Button>
          <input
            class="border rounded p-1 w-full"
            readonly
            value={`${isValid() === undefined ? "?" : isValid()}`}
          />
        </div>
        <div class="grid sm:grid-cols-2 gap-2 items-center">
          <Button
            variant="primary"
            onClick={() => {
              setIsValid(inputRef?.checkValidity());
            }}
          >
            checkValidity()
          </Button>
          <input
            class="border rounded p-1 w-full"
            readonly
            value={`${isValid() === undefined ? "?" : isValid()}`}
          />
        </div>
        <For each={Object.entries(validationProps())}>
          {([key, { value, type }]) => (
            <label class="grid sm:grid-cols-2 gap-2">
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
                <>
                  {type === "multiline" ? (
                    <textarea
                      value={value}
                      onChange={(event) =>
                        handleValueChange(key, event.currentTarget.value)
                      }
                      rows={4}
                      class="border rounded p-1 w-full"
                      readOnly={!isEditable(key)}
                    />
                  ) : (
                    <input
                      type={type}
                      value={value}
                      onChange={(event) =>
                        handleValueChange(key, event.currentTarget.value)
                      }
                      class="border rounded p-1 w-full"
                      readOnly={!isEditable(key)}
                    />
                  )}
                </>
              )}
            </label>
          )}
        </For>
      </div>
    </div>
  );
};

export default ConstraintValidationPanel;
