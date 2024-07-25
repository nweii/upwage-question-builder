import React from "react";
import { Select, TextInput, Button } from "./FormComponents";

const ConditionInput = ({ type, condition, options, onChange, onRemove }) => {
  const handleChange = (field, value) => {
    onChange({ ...condition, [field]: value });
  };

  const renderInput = () => {
    switch (type) {
      case "yes_no":
        return (
          <Select
            value={condition.answer}
            onChange={(e) => handleChange("answer", e.target.value)}
            options={options.answerOptions}
          />
        );
      case "number":
        return (
          <TextInput
            value={condition.value}
            onChange={(e) => handleChange("value", e.target.value)}
            type={options.allowDecimals ? "number" : "text"}
            step={options.allowDecimals ? "0.01" : "1"}
          />
        );
      case "single_select":
      case "multi_select":
        return (
          <Select
            value={condition.answer}
            onChange={(e) => handleChange("answer", e.target.value)}
            options={options.answerOptions}
          >
            <option value="" disabled>
              Select choice
            </option>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span>Answer</span>
      <Select
        value={condition.condition}
        onChange={(e) => handleChange("condition", e.target.value)}
        options={options.conditionOptions}
      />
      {renderInput()}
      <Button onClick={onRemove} variant="delete">
        Remove
      </Button>
    </div>
  );
};

export default ConditionInput;
