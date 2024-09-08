export const inputElements = [
  {
    type: "text",
    label: "Text Input",
    placeholder: "Enter text",
    description: (
      <>
        A single-line text input field.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text">
          See the MDN documentation for text input
        </a>
        .
      </>
    ),
    errorMessage: "This field is required",
    requiredMessage: "Text input is required",
    validationProperties: {
      minLength: 3,
      maxLength: 50,
    },
  },
  {
    type: "email",
    label: "Email Input",
    placeholder: "Enter email",
    description: (
      <>
        An input field for entering an email address.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email">
          See the MDN documentation for email input
        </a>
        .
      </>
    ),
    errorMessage: "Invalid email address",
    requiredMessage: "Email address is required",
  },
  {
    type: "password",
    label: "Password Input",
    placeholder: "Enter password",
    description: (
      <>
        A single-line text field where the input is obscured.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password">
          See the MDN documentation for password input
        </a>
        .
      </>
    ),
    errorMessage:
      "Password must be 8-128 characters and include uppercase, lowercase, number, and special character",
    requiredMessage: "Password is required",
    validationProperties: {
      minLength: 8,
      maxLength: 128,
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    },
  },
  {
    type: "number",
    label: "Number Input",
    placeholder: "Enter number",
    description: (
      <>
        An input field for entering a number.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number">
          See the MDN documentation for number input
        </a>
        .
      </>
    ),
    errorMessage: "Please enter a valid number between 20 and 50",
    requiredMessage: "Number input is required",
    validationProperties: {
      min: 20,
      max: 50,
    },
  },
  {
    type: "tel",
    label: "Telephone Input",
    placeholder: "Enter phone number",
    description: (
      <>
        An input field for entering a telephone number.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel">
          See the MDN documentation for telephone input
        </a>
        .
      </>
    ),
    errorMessage: "Invalid phone number format",
    requiredMessage: "Phone number is required",
    validationProperties: {
      minLength: 7,
      maxLength: 15,
    },
  },
  {
    type: "url",
    label: "URL Input",
    placeholder: "Enter URL",
    description: (
      <>
        An input field for entering a URL.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url">
          See the MDN documentation for URL input
        </a>
        .
      </>
    ),
    errorMessage: "Please enter a valid URL (including http:// or https://)",
    requiredMessage: "URL is required",
    validationProperties: {
      pattern: "https://.*.formfun.dev",
    },
  },
  {
    type: "date",
    label: "Date Input",
    placeholder: "YYYY-MM-DD",
    description: (
      <>
        An input control for entering a date.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date">
          See the MDN documentation for date input
        </a>
        .
      </>
    ),
    errorMessage: "Please enter a valid date in YYYY-MM-DD format",
    requiredMessage: "Date is required",
    validationProperties: {
      min: "1900-01-01",
      max: "2099-12-31",
    },
  },
  {
    type: "time",
    label: "Time Input",
    placeholder: "HH:MM",
    description: (
      <>
        An input control for entering a time value.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time">
          See the MDN documentation for time input
        </a>
        .
      </>
    ),
    errorMessage: "Please enter a valid time in 24-hour format (HH:MM)",
    requiredMessage: "Time is required",
    validationProperties: {
      min: "00:00",
      max: "23:59",
    },
  },
  {
    type: "color",
    label: "Color Input",
    description: (
      <>
        A control for specifying a color. By default the color is black so it
        always has a value.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color">
          See the MDN documentation for color input
        </a>
        .
      </>
    ),
    errorMessage: "Please select a valid color",
    requiredMessage: "Color selection is required",
  },
  {
    type: "textarea",
    label: "Multi-line Text Input",
    placeholder: "Enter long text here",
    description: (
      <>
        A multi-line text input control.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">
          See the MDN documentation for textarea
        </a>
        .
      </>
    ),
    errorMessage: "Please enter some text",
    requiredMessage: "Text area input is required",
    validationProperties: {
      minLength: 10,
      maxLength: 100,
    },
  },
  {
    type: "select",
    label: "Select Dropdown",
    description: (
      <>
        A control that provides a menu of options.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select">
          See the MDN documentation for select
        </a>
        .
      </>
    ),
    errorMessage: "Please select a valid option",
    requiredMessage: "Selection is required",
    options: [
      { value: "", label: "Select an option", disabled: true },
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
  {
    type: "multiselect",
    label: "Multi-Select Dropdown",
    description: (
      <>
        A control that provides a menu of options with multiple selection.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#multiple">
          See the MDN documentation for multi-select
        </a>
        .
      </>
    ),
    errorMessage: "Please select at least one option",
    requiredMessage: "At least one selection is required",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
    ],
    validationProperties: {
      minSelect: 1,
      maxSelect: 3,
    },
  },
  {
    type: "datalist",
    label: "Datalist Input",
    placeholder: "Type or select an option",
    description: (
      <>
        An input control with a predefined list of options to choose from.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist">
          See the MDN documentation for datalist
        </a>
        .
      </>
    ),
    errorMessage: "Please enter a valid option",
    requiredMessage: "This field is required",
    options: [
      { value: "", label: "Select an option" },
      { value: "Apple", label: "Apple" },
      { value: "Banana", label: "Banana" },
      { value: "Cherry", label: "Cherry" },
    ],
  },
];
