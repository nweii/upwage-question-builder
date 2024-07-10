"use client";
import React, { useState, useEffect } from "react";
import { TextInput, Select, Button } from "../components/QuestionComponents";
import { generateYesNoOutput } from "../utils/outputGenerators";

const YesNo = () => {
  const [question, setQuestion] = useState(
    "Are you currently at least 18 years old?",
  );
  const [hasQualifyingCondition, setHasQualifyingCondition] = useState(true);
  const [condition, setCondition] = useState("is");
  const [answer, setAnswer] = useState("yes");
  const [output, setOutput] = useState("");
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    setOutput(
      generateYesNoOutput(question, hasQualifyingCondition, condition, answer),
    );
  }, [question, hasQualifyingCondition, condition, answer]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
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
        {showDetails &&
          (hasQualifyingCondition ? (
            <div className="mt-2 flex items-center space-x-2">
              <span>Answer&nbsp;&nbsp;</span>
              <Select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                options={[
                  { value: "is", label: "is" },
                  { value: "is not", label: "is not" },
                ]}
              />
              <Select
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                options={[
                  { value: "yes", label: "yes" },
                  { value: "no", label: "no" },
                  { value: "any", label: "any" },
                ]}
              />
              <Button
                onClick={() => setHasQualifyingCondition(false)}
                variant="delete"
              >
                Delete
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setHasQualifyingCondition(true)}
              variant="secondary"
            >
              + Add condition
            </Button>
          ))}
      </div>
      <hr />
      <div className="mt-4">
        <h3 className="mb-2 font-semibold">Output</h3>
        <textarea
          value={output}
          readOnly
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-accent focus:outline-none"
          rows={3}
        />
      </div>
    </div>
  );
};

export default YesNo;
