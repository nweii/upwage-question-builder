"use client";
import React, { useState, useEffect } from "react";
import { TextInput, Button, Select, Checkbox } from "./FormComponents";
import ConditionInput from "./ConditionInput";
import { generateOutput } from "../utils/outputGenerators";

const QuestionType = ({
  type,
  initialQuestion,
  initialConditions,
  options,
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [isKeyQuestion, setIsKeyQuestion] = useState(false);
  const [conditions, setConditions] = useState(initialConditions);
  const [combinator, setCombinator] = useState("and");
  const [showDetails, setShowDetails] = useState(true);
  const [output, setOutput] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy");

  const maxConditions = options.maxConditions || 3;

  useEffect(() => {
    setOutput(
      generateOutput(
        type,
        question,
        isKeyQuestion,
        conditions,
        combinator,
        options,
      ),
    );
  }, [type, question, isKeyQuestion, conditions, combinator, options]);

  useEffect(() => {
    setCopyStatus("Copy");
  }, [output]);

  const handleAddCondition = () => {
    if (conditions.length < maxConditions && initialConditions.length > 0) {
      // Copy the first initial condition to create a new one
      const newCondition = { ...initialConditions[0] };
      setConditions([...conditions, newCondition]);
    }
  };

  const handleRemoveCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleConditionChange = (index, newValue) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], ...newValue };
    setConditions(newConditions);
  };

  const handleCopying = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Copied");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

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
      <div className="flex flex-row gap-4">
        <Checkbox
          label="Key question"
          checked={isKeyQuestion}
          onChange={(e) => setIsKeyQuestion(e.target.checked)}
        ></Checkbox>
        {options.renderAdditionalOptions && options.renderAdditionalOptions()}
      </div>
      <hr className="my-4" />
      <div className="my-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Qualifying Conditions</h3>
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="secondary"
          >
            {showDetails ? "Hide details" : "Show details"}
            <svg
              className={`ml-1 h-4 w-4 transform transition-transform ${showDetails ? "rotate-180" : ""}`}
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
                {index > 0 && (
                  <div className="my-2">
                    <Select
                      value={combinator}
                      onChange={(e) => setCombinator(e.target.value)}
                      options={[
                        { value: "and", label: "and" },
                        { value: "or", label: "or" },
                      ]}
                    />
                  </div>
                )}
                <ConditionInput
                  type={type}
                  condition={condition}
                  onChange={(newValue) =>
                    handleConditionChange(index, newValue)
                  }
                  onRemove={() => handleRemoveCondition(index)}
                  options={options}
                />
              </React.Fragment>
            ))}
            {conditions.length < maxConditions && (
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
      <hr className="my-4" />
      <div className="mt-4">
        <h3 className="mb-2 font-semibold">Output</h3>
        <textarea
          value={output}
          readOnly
          className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
          rows={3}
        />
        <Button onClick={handleCopying} variant="primary">
          {copyStatus}
        </Button>
      </div>
    </div>
  );
};

export default QuestionType;
