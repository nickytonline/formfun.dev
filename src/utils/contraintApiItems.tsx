export type ContstraintApiItem = (typeof constraintValidationAPI)[number];

const constraintValidationAPI = [
  {
    type: "property",
    name: "validationMessage",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage",
    description:
      "Returns a string with the validation message for the element.",
  },
  {
    type: "property",
    name: "validity",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity",
    description:
      "Returns a ValidityState object with the validity states of the element.",
  },
  {
    type: "property",
    name: "willValidate",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/willValidate",
    description:
      "Returns a boolean indicating if the element is a candidate for constraint validation.",
  },
  {
    type: "method",
    name: "checkValidity",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/checkValidity",
    description:
      "Returns true if the element's value has no validity problems; false otherwise. Triggers an invalid event on the element if invalid.",
  },
  {
    type: "method",
    name: "checkValidity",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/checkValidity",
    description:
      "Reports the validity of an form element. Returns true if the field is valid, false otherwise.",
  },
  {
    type: "method",
    name: "reportValidity",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/reportValidity",
    description:
      "Reports the validity of an form element. Returns true if the field is valid, false otherwise. On top that, if the element is invalid it displays the issue to the user in the browser so long as the event isn't canceled.",
  },
  {
    type: "method",
    name: "setCustomValidity",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity",
    description: "Sets a custom error message and marks the field as invalid.",
  },
] as const;

export default constraintValidationAPI;
