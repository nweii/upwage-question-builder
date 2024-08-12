import React from "react";
import { CustomSelect, TextInput, Button, Checkbox } from "./FormComponents";

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
          <CustomSelect
            value={condition.answer}
            onChange={(value) => handleChange("answer", value)}
            options={options.answerOptions}
            placeholder="Select an option"
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
          <CustomSelect
            value={condition.answer}
            onChange={(value) => handleChange("answer", value)}
            options={options.answerOptions}
            placeholder="Select an option"
          />
        );
      case "multi_select":
        if (condition.condition === "includes any of") {
          return (
            <CustomSelect
              value={condition.answer || []}
              onChange={(value) => handleChange("answer", value)}
              options={options.answerOptions}
              placeholder="Select options"
              multiple={true}
            />
          );
        } else {
          return (
            <CustomSelect
              value={condition.answer}
              onChange={(value) => handleChange("answer", value)}
              options={options.answerOptions}
              placeholder="Select an option"
            />
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
        <CustomSelect
          value={condition.combinator}
          onChange={(value) => handleChange("combinator", value)}
          options={[
            { value: "and", label: "and" },
            { value: "or", label: "or" },
          ]}
          placeholder="Select combinator"
        />
      </div>
    );
  };

  return (
    <>
      {renderCombinator()}
      <div className="flex flex-wrap items-center gap-2">
        <span>Answer</span>
        <CustomSelect
          value={condition.condition}
          onChange={(value) => handleChange("condition", value)}
          options={options.conditionOptions}
          placeholder="Select condition"
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
