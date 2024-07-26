import {
  generateYesNoOutput,
  generateNumberOutput,
  generateSingleSelectOutput,
  generateMultiSelectOutput,
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
    initialConditions: [{ condition: "is greater than or equal to", value: 1 }],
    options: {
      maxConditions: 2,
      allowDecimals: false,
      conditionOptions: [
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
  single_select: {
    type: "single_select",
    initialQuestion: "What is your preferred work schedule?",
    initialAlias: "WorkSchedule",
    initialConditions: [{ condition: "is", answer: "" }],
    options: {
      maxConditions: 3,
      maxChoices: 7,
      conditionOptions: [
        { value: "is", label: "is" },
        { value: "is not", label: "is not" },
      ],
      answerOptions: [],
    },
    generateOutput: generateSingleSelectOutput,
  },
  multi_select: {
    type: "multi_select",
    initialQuestion: "Which of the following skills do you possess?",
    initialAlias: "Skills",
    initialConditions: [{ condition: "includes", answer: "" }],
    options: {
      maxConditions: 3,
      maxChoices: 7,
      conditionOptions: [
        { value: "is", label: "is" },
        { value: "is not", label: "is not" },
        { value: "includes", label: "includes" },
        { value: "does not include", label: "does not include" },
      ],
      answerOptions: [],
    },
    generateOutput: generateMultiSelectOutput,
  },
};
