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
    name: "reportValidity",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/reportValidity",
    description:
      "Reports invalid field(s) using events. Returns true if all fields are valid, false otherwise.",
  },
  {
    type: "method",
    name: "setCustomValidity",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity",
    description: "Sets a custom error message and marks the field as invalid.",
  },
] as const;

export default constraintValidationAPI;
