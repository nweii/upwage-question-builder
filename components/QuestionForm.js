"use client";
import React, { useState, useEffect, useRef } from "react";
import { TextInput, CustomSelect, Button, Checkbox } from "./FormComponents";
import ConditionInput from "./ConditionInput";
import { questionTypes } from "../config/questionTypes";

export const QuestionForm = ({ type }) => {
  const config = questionTypes[type];

  // State declarations
  const [question, setQuestion] = useState(config.initialQuestion);
  const [alias, setAlias] = useState(config.initialAlias);
  const [isKeyQuestion, setIsKeyQuestion] = useState(false);
  const [conditions, setConditions] = useState(config.initialConditions);
  const [output, setOutput] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [copyStatus, setCopyStatus] = useState("Copy");
  const [allowDecimals, setAllowDecimals] = useState(
    config.options.allowDecimals || false,
  );
  const [choices, setChoices] = useState(
    config.options.answerOptions || [{ value: "", label: "" }],
  );
  const [basicQuestionType, setBasicQuestionType] = useState("identifying");
  const [basicIdentifyingType, setBasicIdentifyingType] = useState("name");

  // Ref declarations for choice selection dropdown
  const newChoiceInputRef = useRef(null);
  const prevChoicesLengthRef = useRef(choices.length);

  // Event handlers and utility functions
  const choiceHandlers = {
    addChoice: () => {
      if (choices.length < config.options.maxChoices) {
        setChoices([...choices, { value: "", label: "" }]);
      }
    },
    removeChoice: (index) => {
      setChoices(choices.filter((_, i) => i !== index));
    },
    updateChoice: (index, field, value) => {
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
    },
    handleChoiceKeyDown: (event, index) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (
          index === choices.length - 1 &&
          choices[index].label.trim() !== ""
        ) {
          choiceHandlers.addChoice();
        }
        // we include the `!==""` because we only want this behavior after the user has typed something
      }
    },
  };

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

  const renderBasicTypeInputs = () => {
    return (
      <div className="mt-4 flex items-center gap-4">
        <div className="flex flex-col">
          <label className="mb-2 block font-bold">Type</label>
          <CustomSelect
            value={basicQuestionType}
            onChange={setBasicQuestionType}
            options={config.options.questionTypes}
          />
        </div>
        {basicQuestionType === "identifying" && (
          <div className="flex flex-col">
            <label className="mb-2 block font-bold">Identifying Type</label>
            <CustomSelect
              value={basicIdentifyingType}
              onChange={setBasicIdentifyingType}
              options={config.options.identifyingTypes}
            />
          </div>
        )}
      </div>
    );
  };

  const renderChoices = () => {
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

    return (
      <div className="mt-4">
        <div className="flex flex-col gap-2">
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex grow flex-row items-center gap-6">
                {type === "multi_select" ? <LittleRect /> : <LittleCircle />}
                <TextInput
                  value={choice.label}
                  onChange={(e) =>
                    choiceHandlers.updateChoice(index, "label", e.target.value)
                  }
                  onKeyDown={(e) =>
                    choiceHandlers.handleChoiceKeyDown(e, index)
                  }
                  placeholder={`Choice ${index + 1}`}
                  className="grow"
                  ref={index === choices.length - 1 ? newChoiceInputRef : null}
                />
              </div>
              <Button
                onClick={() => choiceHandlers.removeChoice(index)}
                variant="delete"
              >
                Remove
              </Button>
            </div>
          ))}
          {choices.length < config.options.maxChoices && (
            <Button
              onClick={choiceHandlers.addChoice}
              variant="secondary"
              className={choices.length && "ml-9"}
            >
              + Add answer choice
            </Button>
          )}
        </div>
      </div>
    );
  };

  // useEffect hooks
  useEffect(() => {
    if (type === "basic") {
      setOutput(
        config.generateOutput(
          question,
          alias,
          isKeyQuestion,
          basicQuestionType,
          basicIdentifyingType,
        ),
      );
    } else {
      setOutput(
        config.generateOutput(
          question,
          alias,
          isKeyQuestion,
          conditions,
          choices,
        ),
      );
    }
  }, [
    question,
    alias,
    isKeyQuestion,
    conditions,
    choices,
    config,
    type,
    basicQuestionType,
    basicIdentifyingType,
  ]);

  useEffect(() => {
    setCopyStatus("Copy");
  }, [output]);

  useEffect(() => {
    if (
      choices.length > prevChoicesLengthRef.current &&
      newChoiceInputRef.current
    ) {
      newChoiceInputRef.current.focus();
    }
    prevChoicesLengthRef.current = choices.length;
  }, [choices.length]);

  // Render function
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex grow flex-col">
            <label className="mb-2 block font-bold">Question</label>
            <TextInput
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 block w-full font-bold">Alias</label>
            <TextInput
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Enter alias"
              className="w-full"
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
      {type === "basic" && renderBasicTypeInputs()}
      {(type === "single_select" || type === "multi_select") && renderChoices()}
      {/* Show the qualifying conditions section for all types except Basic */}
      {type !== "basic" && (
        <>
          <hr />
          <div className="my-4">
            {/* Qualifying Conditions section */}
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold">Qualifying Conditions</h3>
              <Button
                onClick={() => setShowDetails(!showDetails)}
                variant="secondary"
                className={"text-right"}
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
                    key={index}
                    type={type}
                    condition={condition}
                    onChange={(newValue) =>
                      handleConditionChange(index, newValue)
                    }
                    onRemove={() => removeCondition(index)}
                    options={{
                      ...config.options,
                      answerOptions: choices,
                      allowDecimals: allowDecimals,
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
        </>
      )}
      <hr />
      {/* Output snippet section */}
      <div className="mt-4">
        <h3 className="mb-2 font-bold">Output</h3>
        <textarea
          value={output}
          readOnly
          className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm italic focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
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
