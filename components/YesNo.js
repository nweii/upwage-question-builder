"use client";
import React, { useState, useEffect } from "react";
import { Select, Button } from "../components/QuestionComponents";
import QuestionCard from "../components/QuestionCard";
import QualifyingConditions from "../components/QualifyingConditions";
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
    <QuestionCard question={question} setQuestion={setQuestion} output={output}>
      <hr />
      <QualifyingConditions
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      >
        {hasQualifyingCondition ? (
          <div className="mt-2 flex items-center space-x-2">
            <span>Answer</span>
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
        )}
      </QualifyingConditions>
    </QuestionCard>
  );
};

export default YesNo;
