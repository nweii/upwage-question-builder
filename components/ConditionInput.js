import React from "react";
import {
  Select,
  TextInput,
  Button,
  Checkbox,
  MultiSelect,
} from "./FormComponents";

const ConditionInput = ({
  type,
  condition,
  options,
  onChange,
  onRemove,
  index,
}) => {
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
      case "multi_select":
        if (condition.condition === "includes any of") {
          return (
            <MultiSelect
              value={condition.answer || []}
              onChange={(selectedOptions) =>
                handleChange("answer", selectedOptions)
              }
              options={options.answerOptions}
              placeholder="Select choices"
            />
          );
        } else {
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
        }
      default:
        return null;
    }
  };

  const renderCombinator = () => {
    if (index === 0) return null; // do not show combinator if there are no conditions yet
    if (type === "multi_select" || type === "single_select") {
      return null;
    }
    return (
      <div className="my-2">
        <Select
          value={condition.combinator}
          onChange={(e) => handleChange("combinator", e.target.value)}
          options={[
            { value: "and", label: "and" },
            { value: "or", label: "or" },
          ]}
        />
      </div>
    );
  };

  return (
    <>
      {renderCombinator()}
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
    </>
  );
};

export default ConditionInput;
