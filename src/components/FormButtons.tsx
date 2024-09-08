import type { Accessor } from "solid-js";
import { Button } from "./Button";

interface FormButtonsProps {
  elementType: string;
  formSubmitMessage: Accessor<string>;
}

export const FormButtons = ({
  elementType,
  formSubmitMessage,
}: FormButtonsProps) => {
  return (
    <div class="grid gap-2 md:flex md:flex-wrap md:items-center mt-4">
      <div class="flex flex-wrap gap-2">
        <Button variant="primary" type="submit" form={`form-${elementType}`}>
          Submit
        </Button>
        <Button variant="primary" type="reset" form={`form-${elementType}`}>
          Reset
        </Button>
      </div>
      <output>{formSubmitMessage() || <>&nbsp;</>}</output>
    </div>
  );
};
