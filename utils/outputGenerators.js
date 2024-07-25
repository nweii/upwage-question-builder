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
      const operatorMap = {
        equals: "=",
        "does not equal": "!=",
        "is greater than": ">",
        "is less than": "<",
        "is greater than or equal to": ">=",
        "is less than or equal to": "<=",
      };
      const condStr = `${operatorMap[c.condition] || "="}${c.value}`;
      return index === 0
        ? condStr
        : `${c.combinator === "or" ? "|" : "&"}${condStr}`;
    })
    .join("");
  return `qualifying,${keyQuestionValue},[${conditionString}]"${question}","${alias}",number`;
};

export const generateMultipleChoiceSingleOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
  choices,
) => {
  if (!conditions || conditions.length === 0) {
    return `qualifying,${keyQuestionValue},"${question}","${alias}",single_select,${choices.join("|")}`;
  }
  const conditionString = conditions
    .map((c, index) => {
      const condStr = `${c.condition === "is" ? "" : "!"}${c.answer}`;
      return index === 0
        ? condStr
        : `${c.combinator === "or" ? "|" : "&"}${condStr}`;
    })
    .join("");
  return `qualifying,${keyQuestionValue},["${conditionString}"]"${question}","${alias}",single_select,${choices.join("|")}`;
};

export const generateMultipleChoiceMultiOutput = (
  question,
  alias,
  keyQuestionValue,
  conditions,
  choices,
) => {
  if (!conditions || conditions.length === 0) {
    return `qualifying,${keyQuestionValue},"${question}","${alias}",multi_select,${choices.join("|")}`;
  }
  const conditionString = conditions
    .map((c, index) => {
      const condStr = `${c.condition === "includes" ? "+" : "-"}${c.answer}`;
      return index === 0
        ? condStr
        : `${c.combinator === "or" ? "|" : "&"}${condStr}`;
    })
    .join("");
  return `qualifying,${keyQuestionValue},["${conditionString}"]"${question}","${alias}",multi_select,${choices.join("|")}`;
};
