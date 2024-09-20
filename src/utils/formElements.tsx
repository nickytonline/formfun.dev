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
    type: "search",
    label: "Search Input",
    placeholder: "Search...",
    description: (
      <>
        An input field for entering search queries.{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search">
          See the MDN documentation for search input
        </a>
        .
      </>
    ),
    errorMessage: "Invalid search query",
    requiredMessage: "Search query is required",
    validationProperties: {
      minLength: 2,
      maxLength: 100,
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
  // ... (rest of the array remains unchanged)
];
