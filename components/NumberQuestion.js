"use client";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Select,
  Button,
  Checkbox,
} from "../components/QuestionComponents";
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
      setConditions([...conditions, { comparison: "equals", value: 0 }]);
    }
  };

  const handleRemoveCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleConditionChange = (index, field, value) => {
    setConditions(
      conditions.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    );
  };

  // Update output whenever the question, decimal setting, conditions, or combinator changes
  useEffect(() => {
    setOutput(
      generateNumberOutput(question, allowDecimals, conditions, combinator),
    );
  }, [question, allowDecimals, conditions, combinator]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-4">
        <label className="mb-2 block font-semibold">Question 1</label>
        <div className="flex items-center">
          <TextInput
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
          />
          <Button disabled variant="delete" className="ml-2">
            Delete
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Checkbox
          label="Allow decimals"
          checked={allowDecimals}
          onChange={(e) => setAllowDecimals(e.target.checked)}
        />
      </div>
      <hr />
      <div className="my-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Qualifying Conditions</h3>
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="secondary"
          >
            {showDetails ? "Hide details" : "Show details"}
            <svg
              className={`ml-1 h-4 w-4 transform ${showDetails ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </div>
        {showDetails && (
          <>
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
          </>
        )}
      </div>
      <hr />
      <div className="mt-4">
        <h3 className="mb-2 font-semibold">Output</h3>
        <textarea
          value={output}
          readOnly
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
          rows={3}
        />
      </div>
    </div>
  );
};

export default NumberQuestion;
