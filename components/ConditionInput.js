"use client";
import React from "react";
import { Select, TextInput, Button } from "./FormComponents";

const ConditionInput = ({ type, condition, onChange, onRemove, options }) => {
  switch (type) {
    case "yes_no":
      return (
        <div className="mt-2 flex items-center space-x-2">
          <span>Answer</span>
          <Select
            value={condition.condition}
            onChange={(e) => onChange({ condition: e.target.value })}
            options={[
              { value: "is", label: "is" },
              { value: "is not", label: "is not" },
            ]}
          />
          <Select
            value={condition.answer}
            onChange={(e) => onChange({ answer: e.target.value })}
            options={[
              { value: "yes", label: "yes" },
              { value: "no", label: "no" },
              { value: "any", label: "any" },
            ]}
          />
          <Button onClick={onRemove} variant="delete">
            Delete
          </Button>
        </div>
      );
    case "number":
      return (
        <div className="mt-2 flex items-center space-x-2">
          <span>Answer</span>
          <Select
            value={condition.comparison}
            onChange={(e) => onChange({ comparison: e.target.value })}
            options={options.comparisonOptions}
          />
          <TextInput
            value={condition.value}
            onChange={(e) => onChange({ value: e.target.value })}
            type="number"
            step={options.allowDecimals ? "0.1" : "1"}
          />
          <Button onClick={onRemove} variant="delete">
            Delete
          </Button>
        </div>
      );
    case "multiple_choice":
      return (
        <div className="mt-2 flex items-center space-x-2">
          <span>Answer</span>
          <Select
            value={condition.modifier}
            onChange={(e) => onChange({ modifier: e.target.value })}
            options={
              options.isMultiSelect
                ? [
                    { value: "is", label: "is" },
                    { value: "is not", label: "is not" },
                    { value: "includes", label: "includes" },
                    { value: "does not include", label: "does not include" },
                  ]
                : [
                    { value: "is", label: "is" },
                    { value: "is not", label: "is not" },
                  ]
            }
          />
          <Select
            value={condition.answer}
            onChange={(e) => onChange({ answer: e.target.value })}
            options={options.choices.map((choice) => ({
              value: choice,
              label: choice,
            }))}
          />
          <Button onClick={onRemove} variant="delete">
            Delete
          </Button>
        </div>
      );
    default:
      return null;
  }
};

export default ConditionInput;
