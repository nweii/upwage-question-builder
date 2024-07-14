"use client";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Select,
  Button,
  Checkbox,
} from "../components/QuestionComponents";
import QuestionCard from "../components/QuestionCard";
import QualifyingConditions from "../components/QualifyingConditions";
import { generateNumberOutput } from "../utils/outputGenerators";

const comparisonOptions = [
  { value: "equals", label: "equals" },
  { value: "does not equal", label: "does not equal" },
  { value: "is greater than", label: "is greater than" },
  { value: "is less than", label: "is less than" },
  {
    value: "is greater than or equal to",
    label: "is greater than or equal to",
  },
  { value: "is less than or equal to", label: "is less than or equal to" },
];

const combinatorOptions = [
  { value: "and", label: "and" },
  { value: "or", label: "or" },
];

const NumberQuestion = () => {
  const [question, setQuestion] = useState(
    "About how many years of food service experience do you have?",
  );
  const [allowDecimals, setAllowDecimals] = useState(false);
  const [conditions, setConditions] = useState([
    { comparison: "is greater than or equal to", value: 1 },
  ]);
  const [combinator, setCombinator] = useState("and");
  const [output, setOutput] = useState("");
  const [showDetails, setShowDetails] = useState(true);

  const handleAddCondition = () => {
    if (conditions.length < 2) {
      // Add a new condition with default values
      setConditions([...conditions, { comparison: "equals", value: 0 }]);
    }
  };

  const handleRemoveCondition = (index) => {
    // Create a new array without the condition at the specified index
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleConditionChange = (index, field, value) => {
    setConditions(
      conditions.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    );
    // If i matches the target index:
    //   - Create a new object {...c} copying all properties of the current condition
    //   - Update the specified field with the new value: [field]: value
    //   - [field] uses the value of 'field' as the property name (computed property)
    // If i doesn't match, return the condition unchanged
  };

  // Update output whenever the question, decimal setting, conditions, or combinator changes
  useEffect(() => {
    setOutput(
      generateNumberOutput(question, allowDecimals, conditions, combinator),
    );
  }, [question, allowDecimals, conditions, combinator]);

  return (
    <QuestionCard question={question} setQuestion={setQuestion} output={output}>
      <div className="mb-4">
        <Checkbox
          label="Allow decimals"
          checked={allowDecimals}
          onChange={(e) => setAllowDecimals(e.target.checked)}
        />
      </div>
      <hr />
      <QualifyingConditions
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      >
        {conditions.map((condition, index) => (
          <React.Fragment key={index}>
            <div className="mt-2 flex items-center space-x-2">
              <span>Answer</span>
              <Select
                value={condition.comparison}
                onChange={(e) =>
                  handleConditionChange(index, "comparison", e.target.value)
                }
                options={comparisonOptions}
              />
              <TextInput
                value={condition.value}
                onChange={(e) =>
                  handleConditionChange(index, "value", e.target.value)
                }
                placeholder="Enter a number"
                type="number"
                step={allowDecimals ? "0.1" : "1"}
              />
              <Button
                onClick={() => handleRemoveCondition(index)}
                variant="delete"
              >
                Delete
              </Button>
            </div>
            {index === 0 && conditions.length > 1 && (
              <div className="mt-2">
                <Select
                  value={combinator}
                  onChange={(e) => setCombinator(e.target.value)}
                  options={combinatorOptions}
                />
              </div>
            )}
          </React.Fragment>
        ))}
        {conditions.length < 2 && (
          <Button
            onClick={handleAddCondition}
            variant="secondary"
            className="mt-2"
          >
            + Add condition
          </Button>
        )}
      </QualifyingConditions>
    </QuestionCard>
  );
};

export default NumberQuestion;
