export const generateOutput = (
  type,
  question,
  alias,
  isKeyQuestion,
  conditions,
  options,
) => {
  const keyQuestionValue = isKeyQuestion ? "true" : "false";

  switch (type) {
    case "yes_no":
      return generateYesNoOutput(question, alias, keyQuestionValue, conditions);
    case "number":
      return generateNumberOutput(
        question,
        alias,
        keyQuestionValue,
        conditions,
        options.allowDecimals,
      );
    case "multiple_choice":
      return generateMultipleChoiceOutput(
        question,
        alias,
        keyQuestionValue,
        conditions,
        options.choices,
        options.isMultiSelect,
      );
    default:
      return "";
  }
};

const generateYesNoOutput = (question, alias, keyQuestionValue, conditions) => {
  if (conditions.length === 0) {
    return `qualifying,${keyQuestionValue},"${question}","${alias}",yes_no`;
  }
  const conditionString = conditions
    .map((c, index) => {
      const condStr = `${c.condition === "is" ? "" : "!"}${c.answer}`;
      return index === 0
        ? condStr
        : `${c.combinator === "or" ? "|" : "&"}${condStr}`;
    })
    .join("");
  return `qualifying,${keyQuestionValue},["${conditionString}"]"${question}","${alias}",yes_no`;
};

const generateNumberOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
  allowDecimals,
) => {
  if (conditions.length === 0) {
    return `qualifying,${keyQuestionValue},"${question}","${alias}",number`;
  }
  const conditionString = conditions
    .map((c, index) => {
      const operatorMap = {
        equals: "=",
        "does not equal": "!=",
        "is greater than": ">",
        "is less than": "<",
        "is greater than or equal to": ">=",
        "is less than or equal to": "<=",
      };
      const condStr = `${operatorMap[c.comparison] || "="}${c.value}`;
      return index === 0
        ? condStr
        : `${c.combinator === "or" ? "|" : "&"}${condStr}`;
    })
    .join("");
  return `qualifying,${keyQuestionValue},[${conditionString}]"${question}","${alias}",number`;
};

const generateMultipleChoiceOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
  choices,
  isMultiSelect,
) => {
  if (conditions.length === 0) {
    const choicesString = choices.map((choice) => `[+]${choice}`).join(",");
    return `qualifying,${keyQuestionValue},"${question}","${alias}",${isMultiSelect ? "multiple" : "single"}_choice,${choicesString}`;
  }

  const choicesWithConditions = choices.map((choice) => {
    let prefix = "+"; // Default prefix if no conditions match
    for (const condition of conditions) {
      if (condition.answer === choice) {
        switch (condition.modifier) {
          case "is":
          case "includes":
            prefix = "+";
            break;
          case "is not":
          case "does not include":
            prefix = "!";
            break;
          default:
            prefix = "+";
        }
        break; // Stop after first matching condition
      }
    }
    return `[${prefix}]${choice}`;
  });

  const choicesString = choicesWithConditions.join(",");

  // For single-select, we don't need to include the condition in brackets
  if (!isMultiSelect) {
    return `qualifying,${keyQuestionValue},"${question}","${alias}",single_choice,${choicesString}`;
  }

  // For multi-select, we include the condition in brackets
  const conditionString = conditions
    .map((c, index) => {
      let prefix;
      switch (c.modifier) {
        case "is":
        case "includes":
          prefix = "+";
          break;
        case "is not":
        case "does not include":
          prefix = "!";
          break;
        default:
          prefix = "+";
      }
      const condStr = `${prefix}"${c.answer}"`;
      return index === 0
        ? condStr
        : `${c.combinator === "or" ? "|" : "&"}${condStr}`;
    })
    .join("");

  return `qualifying,${keyQuestionValue},[${conditionString}]"${question}","${alias}",multiple_choice,${choicesString}`;
};
