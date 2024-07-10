export const generateYesNoOutput = (
  question,
  hasQualifyingCondition,
  condition,
  answer,
) => {
  if (hasQualifyingCondition) {
    return `qualifying,false,[=${condition === "is" ? "" : "!"}${answer === "any" ? '""yes""|""no""' : `\"\"${answer}\"\"`}]\"\"${question}\"\",yes_no`;
  } else {
    return `qualifying,false,\"\"${question}\"\",yes_no`;
  }
};

export const generateNumberOutput = (
  question,
  allowDecimals,
  conditions,
  combinator,
) => {
  const getOperator = (comparison) => {
    switch (comparison) {
      case "equals":
        return "=";
      case "does not equal":
        return "!=";
      case "is greater than":
        return ">";
      case "is less than":
        return "<";
      case "is greater than or equal to":
        return ">=";
      case "is less than or equal to":
        return "<=";
      default:
        return "=";
    }
  };

  const conditionString = conditions
    .map((c) => `${getOperator(c.comparison)}${c.value}`)
    .join(combinator === "and" ? "&" : "|");

  return `qualifying,false,[${conditionString}]"${question}",I9,number`;
};
