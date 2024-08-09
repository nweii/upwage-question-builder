"use client";
import React, { useState, useEffect, useRef } from "react";
import { TextInput, CustomSelect, Button, Checkbox } from "./FormComponents";
import ConditionInput from "./ConditionInput";
import { questionTypes } from "../config/questionTypes";

const LittleCircle = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-black opacity-30 dark:stroke-white dark:opacity-40"
  >
    <circle cx="6" cy="6" r="5" strokeOpacity="1" strokeWidth="2" />
  </svg>
);

const LittleRect = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-black opacity-30 dark:stroke-white dark:opacity-40"
  >
    <rect
      x={1}
      y={1}
      width={10}
      height={10}
      rx={2}
      style={{ strokeOpacity: 1 }}
      strokeWidth={2}
    />
  </svg>
);

export const QuestionForm = ({ type }) => {
  const config = questionTypes[type];
  const [question, setQuestion] = useState(config.initialQuestion);
  const [alias, setAlias] = useState(config.initialAlias);
  const [isKeyQuestion, setIsKeyQuestion] = useState(false);
  const [conditions, setConditions] = useState(config.initialConditions);
  const [output, setOutput] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [copyStatus, setCopyStatus] = useState("Copy");
  const [allowDecimals, setAllowDecimals] = useState(
    config.options.allowDecimals,
  );
  const [choices, setChoices] = useState(
    config.options.answerOptions || [{ value: "", label: "" }],
  );

  useEffect(() => {
    setOutput(
      config.generateOutput(
        question,
        alias,
        isKeyQuestion,
        conditions,
        choices,
      ),
    );
  }, [question, alias, isKeyQuestion, conditions, config, choices]);

  useEffect(() => {
    setCopyStatus("Copy");
  }, [output]);

  const addCondition = () => {
    if (conditions.length < config.options.maxConditions) {
      setConditions([
        ...conditions,
        { ...config.initialConditions[0], combinator: "and" },
      ]);
    }
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleConditionChange = (index, newCondition) => {
    const newConditions = [...conditions];
    newConditions[index] = newCondition;
    setConditions(newConditions);
  };

  const handleCopying = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Copied ✔︎");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Choices are for multiple choice question types only
  const newChoiceInputRef = useRef(null);
  const prevChoicesLengthRef = useRef(choices.length);
  // focus the new input field when a choice is added
  useEffect(() => {
    if (
      choices.length > prevChoicesLengthRef.current &&
      newChoiceInputRef.current
    ) {
      newChoiceInputRef.current.focus();
    }
    // Update the ref with the current length for the next render
    prevChoicesLengthRef.current = choices.length;
  }, [choices.length]);

  const addChoice = () => {
    if (choices.length < config.options.maxChoices) {
      setChoices([...choices, { value: "", label: "" }]);
    }
  };

  const removeChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const updateChoice = (index, field, value) => {
    const newChoices = [...choices];
    newChoices[index] = { ...newChoices[index], [field]: value };
    if (field === "label") {
      newChoices[index].value = value;
    }
    setChoices(newChoices);

    // Update conditions that use this choice
    const newConditions = conditions.map((condition) => {
      if (condition.answer === choices[index].value) {
        return { ...condition, answer: value };
      }
      return condition;
    });
    setConditions(newConditions);
  };

  const handleChoiceKeyDown = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (index === choices.length - 1 && choices[index].label.trim() !== "") {
        addChoice();
      }
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex grow flex-col">
            <label className="mb-2 block font-semibold">Question</label>
            <TextInput
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 block font-semibold">Alias</label>
            <TextInput
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Enter alias"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Checkbox
            label="Key question"
            checked={isKeyQuestion}
            onChange={(e) => setIsKeyQuestion(e.target.checked)}
          />
          {config.options.renderAdditionalOptions &&
            config.options.renderAdditionalOptions(
              allowDecimals,
              setAllowDecimals,
            )}
        </div>
      </div>
      {(type === "multi_select" || type === "single_select") && (
        <div className="mt-4">
          <div className="flex flex-col gap-2">
            {choices.map((choice, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex grow flex-row items-center gap-6">
                  {type === "multi_select" ? <LittleRect /> : <LittleCircle />}
                  <TextInput
                    value={choice.label}
                    onChange={(e) =>
                      updateChoice(index, "label", e.target.value)
                    }
                    onKeyDown={(e) => handleChoiceKeyDown(e, index)}
                    placeholder={`Choice ${index + 1}`}
                    className="grow"
                    ref={
                      index === choices.length - 1 ? newChoiceInputRef : null
                    }
                  />
                </div>
                <Button onClick={() => removeChoice(index)} variant="delete">
                  Remove
                </Button>
              </div>
            ))}
            {choices.length < config.options.maxChoices && (
              <Button
                onClick={addChoice}
                variant="secondary"
                className={choices.length && "ml-9"}
              >
                + Add choice
              </Button>
            )}
          </div>
        </div>
      )}
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
              className={`ml-1 h-4 w-4 transform transition-transform ${
                showDetails ? "rotate-180" : ""
              }`}
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
          <div className="flex flex-col gap-2">
            {conditions.map((condition, index) => (
              <ConditionInput
                type={type}
                condition={condition}
                onChange={(newValue) => handleConditionChange(index, newValue)}
                onRemove={() => removeCondition(index)}
                options={{
                  ...config.options,
                  answerOptions: choices,
                }}
                index={index}
              />
            ))}
            {conditions.length < config.options.maxConditions && (
              <Button onClick={addCondition} variant="secondary">
                + Add condition
              </Button>
            )}
          </div>
        )}
      </div>
      <hr />
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

export default QuestionForm;
