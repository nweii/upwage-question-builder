export const generateYesNoOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
) => {
  if (!conditions || conditions.length === 0) {
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

const operatorMap = {
  equals: "=",
  "does not equal": "!=",
  "is greater than": ">",
  "is less than": "<",
  "is greater than or equal to": ">=",
  "is less than or equal to": "<=",
};

export const generateNumberOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
) => {
  if (!conditions || conditions.length === 0) {
    return `qualifying,${keyQuestionValue},"${question}","${alias}",number`;
  }
  const conditionString = conditions
    .map((c, index) => {
      const condStr = `${operatorMap[c.condition] || "="}${c.value}`;
      return index === 0
        ? condStr
        : `${c.combinator === "or" ? "|" : "&"}${condStr}`;
    })
    .join("");
  return `qualifying,${keyQuestionValue},[${conditionString}]"${question}","${alias}",number`;
};

export const generateSingleSelectOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
  choices,
) => {
  const choicesWithLogic = choices.map((choice) => {
    const condition = conditions.find((c) => c.answer === choice.value);
    let prefix = "";
    if (condition) {
      switch (condition.condition) {
        case "is":
          prefix = "[+]";
          break;
        case "is not":
          prefix = "[!]";
          break;
        default:
          prefix = "";
      }
    }
    return `"${prefix}${choice.value}"`;
  });

  return `qualifying,${keyQuestionValue},"${question}","${alias}",single_select${choicesWithLogic.length ? "," + choicesWithLogic : ""}`;
};

export const generateMultiSelectOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
  choices,
) => {
  const choicesWithLogic = choices.map((choice) => {
    const condition = conditions.find((c) =>
      c.condition === "includes any of"
        ? c.answer.includes(choice.value)
        : c.answer === choice.value,
    );
    let prefix = "";
    if (condition) {
      switch (condition.condition) {
        case "includes":
          prefix = "[*]";
          break;
        case "does not include":
          prefix = "[!]";
          break;
        case "includes any of":
          prefix = "[+]";
          break;
      }
    }
    return `"${prefix}${choice.value}"`;
  });

  return `qualifying,${keyQuestionValue},"${question}","${alias}",multi_select${choicesWithLogic.length ? "," + choicesWithLogic : ""}`;
};
