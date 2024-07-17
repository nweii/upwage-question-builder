import React from "react";
import { Button } from "./QuestionComponents";

const QualifyingConditions = ({ children, showDetails, setShowDetails }) => {
  return (
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
      {showDetails && children}
    </div>
  );
};

export default QualifyingConditions;
