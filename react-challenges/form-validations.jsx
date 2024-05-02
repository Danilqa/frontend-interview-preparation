import { useState, useMemo } from "react";

const isNumber = {
  validate: (value) => new RegExp("^[0-9]+$").test(value),
  errorMessage: "Should be number",
};

const isExist = {
  validate: (value) => value !== undefined,
  errorMessage: "Fill something here",
};

const validations = {
  loan: [isExist, isNumber],
  interesetRate: [isExist, isNumber],
  loanTerm: [isExist, isNumber],
};

function validate(state) {
  const nextErrors = {};
  for (const [key, value] of Object.entries(state)) {
    for (const rule of validations[key]) {
      if (!rule.validate(value)) {
        nextErrors[key] = rule.errorMessage;
        continue;
      }
    }
  }

  return nextErrors;
}

function calculateMorg(P, i, n) {
  return (P * (i * (1 + i) * n)) / ((1 + i) * n - 1);
}

export default function App() {
  const [state, setState] = useState({
    loan: 0,
    interesetRate: 0,
    loanTerm: 0,
  });

  const errors = useMemo(() => validate(state), [state]);
  const hasErrors = Object.keys(errors).length;

  function onChange(event) {
    const { name, value } = event.currentTarget;
    setState((prevState) => ({ ...prevState, [name]: Number(value) }));
  }

  const result = calculateMorg(state.loan, state.interesetRate, state.loanTerm);

  return (
    <div>
      <input value={state.loan} name="loan" onChange={onChange} />
      <div>{errors.loan}</div>
      <input
        value={state.interesetRate}
        name="interesetRate"
        onChange={onChange}
      />
      <div>{errors.interesetRate}</div>
      <input value={state.loanTerm} name="loanTerm" onChange={onChange} />
      <div>{errors.loanTerm}</div>
      {hasErrors ? "Please, fix errors" : result}
    </div>
  );
}
