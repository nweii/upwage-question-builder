export const generateOutput = (
  type,
  question,
  conditions,
  combinator,
  options,
) => {
  switch (type) {
    case "yes_no":
      return generateYesNoOutput(question, conditions, combinator);
    case "number":
      return generateNumberOutput(
        question,
        conditions,
        combinator,
        options.allowDecimals,
      );
    case "multiple_choice":
      return generateMultipleChoiceOutput(
        question,
        conditions,
        combinator,
        options.choices,
        options.isMultiSelect,
      );
    default:
      return "";
  }
};

const generateYesNoOutput = (question, conditions, combinator) => {
  if (conditions.length === 0) {
    return `qualifying,false,"${question}",I9,yes_no`;
  }
  const conditionString = conditions
    .map((c) => `${c.condition === "is" ? "" : "!"}\"${c.answer}\"`)
    .join(combinator === "and" ? "&" : "|");
  return `qualifying,false,["${conditionString}"]""${question}"",I9,yes_no`;
};

const generateNumberOutput = (
  question,
  conditions,
  combinator,
  allowDecimals,
) => {
  if (conditions.length === 0) {
    return `qualifying,false,"${question}",I9,number`;
  }
  const conditionString = conditions
    .map((c) => {
      let operator;
      switch (c.comparison) {
        case "equals":
          operator = "=";
          break;
        case "does not equal":
          operator = "!=";
          break;
        case "is greater than":
          operator = ">";
          break;
        case "is less than":
          operator = "<";
          break;
        case "is greater than or equal to":
          operator = ">=";
          break;
        case "is less than or equal to":
          operator = "<=";
          break;
        default:
          operator = "=";
      }
      return `${operator}${c.value}`;
    })
    .join(combinator === "and" ? "&" : "|");
  return `qualifying,false,[${conditionString}]""${question}"",I9,number`;
};

const generateMultipleChoiceOutput = (
  question,
  conditions,
  combinator,
  choices,
  isMultiSelect,
) => {
  if (conditions.length === 0) {
    return `qualifying,false,""${question}"",I9,${isMultiSelect ? "multiple" : "single"}_choice`;
  }
  const conditionString = conditions
    .map((c) => {
      let prefix;
      switch (c.modifier) {
        case "is":
          prefix = "";
          break;
        case "is not":
          prefix = "!";
          break;
        case "includes":
          prefix = "+";
          break;
        case "does not include":
          prefix = "-";
          break;
        default:
          prefix = "";
      }
      return `${prefix}"${c.answer}"`;
    })
    .join(combinator === "and" ? "&" : "|");
  return `qualifying,false,[${conditionString}]""${question}"",I9,${isMultiSelect ? "multiple" : "single"}_choice`;
};
