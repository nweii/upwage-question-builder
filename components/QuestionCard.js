import React from "react";
import { TextInput, Button } from "./QuestionComponents";

const QuestionCard = ({ children, question, setQuestion, output }) => {
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
      {children}
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

export default QuestionCard;
