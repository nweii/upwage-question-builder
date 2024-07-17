export const generateOutput = (
  type,
  question,
  alias,
  isKeyQuestion,
  conditions,
  combinator,
  options,
) => {
  const keyQuestionValue = isKeyQuestion ? "true" : "false"; // convert to string

  switch (type) {
    case "yes_no":
      return generateYesNoOutput(
        question,
        alias,
        keyQuestionValue,
        conditions,
        combinator,
      );
    case "number":
      return generateNumberOutput(
        question,
        alias,
        keyQuestionValue,
        conditions,
        combinator,
        options.allowDecimals,
      );
    case "multiple_choice":
      return generateMultipleChoiceOutput(
        question,
        alias,
        keyQuestionValue,
        conditions,
        combinator,
        options.choices,
        options.isMultiSelect,
      );
    default:
      return "";
  }
};

const generateYesNoOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
  combinator,
) => {
  if (conditions.length === 0) {
    return `qualifying,${keyQuestionValue},"${question}",""${alias}"",yes_no`;
  }
  const conditionString = conditions
    .map((c) => `${c.condition === "is" ? "" : "!"}${c.answer}`)
    .join(combinator === "and" ? "&" : "|");
  return `qualifying,${keyQuestionValue},[""${conditionString}""]""${question}"",""${alias}"",yes_no`;
};

const generateNumberOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
  combinator,
  allowDecimals,
) => {
  if (conditions.length === 0) {
    return `qualifying,${keyQuestionValue},"${question}",""${alias}"",number`;
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
  return `qualifying,${keyQuestionValue},[${conditionString}]""${question}"",""${alias}"",number`;
};

const generateMultipleChoiceOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
  combinator,
  choices,
  isMultiSelect,
) => {
  if (conditions.length === 0) {
    return `qualifying,${keyQuestionValue},""${question}"",""${alias}"",${isMultiSelect ? "multiple" : "single"}_choice`;
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
  return `qualifying,${keyQuestionValue},[${conditionString}]""${question}"",""${alias}"",${isMultiSelect ? "multiple" : "single"}_choice`;
};
