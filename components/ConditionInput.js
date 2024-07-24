import React from "react";
import { Select, TextInput, Button } from "./FormComponents";

const ConditionInput = ({ condition, options, onChange, onRemove }) => {
  const handleChange = (field, value) => {
    onChange({ ...condition, [field]: value });
  };

  return (
    <div className="flex items-center space-x-2">
      <span>Answer</span>
      <Select
        value={condition.condition || condition.comparison}
        onChange={(e) =>
          handleChange(
            options.conditionOptions ? "condition" : "comparison",
            e.target.value,
          )
        }
        options={options.conditionOptions || options.comparisonOptions}
      />
      {options.answerOptions ? (
        <Select
          value={condition.answer}
          onChange={(e) => handleChange("answer", e.target.value)}
          options={options.answerOptions}
        />
      ) : (
        <TextInput
          value={condition.value}
          onChange={(e) => handleChange("value", e.target.value)}
          type={options.allowDecimals ? "number" : "text"}
          step={options.allowDecimals ? "0.01" : "1"}
        />
      )}
      <Button onClick={onRemove} variant="delete">
        Remove
      </Button>
    </div>
  );
};

export default ConditionInput;
