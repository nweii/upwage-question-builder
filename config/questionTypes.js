import {
  generateYesNoOutput,
  generateNumberOutput,
} from "../utils/outputGenerators";
import { Checkbox } from "../components/FormComponents";

export const questionTypes = {
  yes_no: {
    type: "yes_no",
    initialQuestion: "Are you currently at least 18 years old?",
    initialAlias: "Age",
    initialConditions: [{ condition: "is", answer: "yes" }],
    options: {
      maxConditions: 1,
      conditionOptions: [
        { value: "is", label: "is" },
        { value: "is not", label: "is not" },
      ],
      answerOptions: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    generateOutput: generateYesNoOutput,
  },
  number: {
    type: "number",
    initialQuestion:
      "About how many years of food service experience do you have?",
    initialAlias: "Exp",
    initialConditions: [
      { comparison: "is greater than or equal to", value: 1 },
    ],
    options: {
      maxConditions: 2,
      allowDecimals: false,
      comparisonOptions: [
        { value: "equals", label: "equals" },
        { value: "does not equal", label: "does not equal" },
        { value: "is greater than", label: "is greater than" },
        { value: "is less than", label: "is less than" },
        {
          value: "is greater than or equal to",
          label: "is greater than or equal to",
        },
        {
          value: "is less than or equal to",
          label: "is less than or equal to",
        },
      ],
      renderAdditionalOptions: (allowDecimals, setAllowDecimals) => (
        <Checkbox
          label="Allow decimals"
          checked={allowDecimals}
          onChange={(e) => setAllowDecimals(e.target.checked)}
        />
      ),
    },
    generateOutput: generateNumberOutput,
  },
};
