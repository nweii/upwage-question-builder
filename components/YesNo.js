"use client";
import React from "react";
import QuestionType from "./QuestionType";

const YesNo = () => (
  <QuestionType
    type="yes_no"
    initialQuestion="Are you currently at least 18 years old?"
    initialConditions={[{ condition: "is", answer: "yes" }]}
    options={{
      maxConditions: 1,
    }}
  />
);

export default YesNo;
