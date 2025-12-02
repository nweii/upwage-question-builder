# Upwage Question Builder

Question-building tool for Upwage LLM-powered screeners. Specify your question and its qualifying answer conditions to receive an easy-to-copy, logic-laden string of the question.

- Support for multiple question types: Basic, Yes/No, Number, Single Select, Multi Select
- Dynamic form generation based on question type
- Conditional logic for qualifying answers
- Output generation in a specific format for LLM processing

## Structure

- `QuestionForm.js`: The core component for building questions
- `ConditionInput.js`: Component for inputting qualifying conditions
- `FormComponents.js`: Various form input components (TextInput, NumberInput, CustomSelect, etc.)
- `questionTypes.js`: Configuration for different question types and their default properties
- `outputGenerators.js`: Functions for generating output strings based on question type

## To Do

- [x] Fix combinator behavior (currently changes all combinators to the same value)
- [x] Add checkbox to specify whether key question status
- [x] Add text field to specify short question alias
- [x] Add multiple choice question types (single and multi select)
- [x] Reduce repetitive areas
- [x] Make decimals checkbox functional
- [x] Make basic form type

## Stack

- Next.js
- React
- Tailwind CSS
- Shadcn for tabs UI
- Lucide for icons

## Development

- **Install dependencies**: `bun install`
- **Run dev server**: `bun run dev`
- **Build for production**: `bun run build`
- **Start production server**: `bun run start`
- **Run linting**: `bun run lint`
