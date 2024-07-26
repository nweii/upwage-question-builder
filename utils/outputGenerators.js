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
      if (condition.condition === "is") {
        prefix = "+";
      } else if (condition.condition === "is not") {
        prefix = "!";
      }
    }
    return `"[${prefix}]${choice.value}"`;
  });

  return `qualifying,${keyQuestionValue},"${question}","${alias}",single_select,${choicesWithLogic.join(",")}`;
};

export const generateMultiSelectOutput = (
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
        case "includes":
          prefix = "+";
          break;
        case "is not":
        case "does not include":
          prefix = "!";
          break;
      }
    }
    return `"[${prefix}]${choice.value}"`;
  });

  return `qualifying,${keyQuestionValue},"${question}","${alias}",multi_select,${choicesWithLogic.join(",")}`;
};
