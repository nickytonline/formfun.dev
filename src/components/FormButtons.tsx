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
    <div class="grid gap-2 md:flex md:flex-wrap md:items-center mt-2 lg:mt-4">
      <Button variant="primary" type="submit" form={`form-${elementType}`}>
        Submit
      </Button>
      <Button variant="primary" type="reset" form={`form-${elementType}`}>
        Reset
      </Button>
      <output>{formSubmitMessage() || <>&nbsp;</>}</output>
    </div>
  );
};
