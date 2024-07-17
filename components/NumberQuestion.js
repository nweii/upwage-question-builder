"use client";
import React, { useState } from "react";
import QuestionType from "./QuestionType";
import { Checkbox } from "./FormComponents";

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

const NumberQuestion = () => {
  const [allowDecimals, setAllowDecimals] = useState(false);

  return (
    <QuestionType
      type="number"
      initialQuestion="About how many years of food service experience do you have?"
      initialConditions={[
        { comparison: "is greater than or equal to", value: 1 },
      ]}
      options={{
        allowDecimals,
        comparisonOptions,
        maxConditions: 3, // This is optional as 3 is the default
        renderAdditionalOptions: () => (
          <Checkbox
            label="Allow decimals"
            checked={allowDecimals}
            onChange={(e) => setAllowDecimals(e.target.checked)}
          />
        ),
      }}
    />
  );
};

export default NumberQuestion;
