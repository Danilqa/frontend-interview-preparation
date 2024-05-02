import { ChangeEvent, FormEvent, useState } from "react";

const formState = {
  country: {
    value: "",
  },
  town: {
    value: "",
    dependencies: ["country"],
  },
  sortCode: {
    value: "",
    dependencies: ["town"],
  },
  regNumber: {
    value: "",
    dependencies: ["town"],
  },
};

type FieldKey = keyof typeof formState;

export default function App() {
  const [state, setState] = useState(formState);
  const [isDisabled, setIsDisabled] = useState(false);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const toDelete: FieldKey[] = [];
    let toProcess = [name];

    while (toProcess.length) {
      const nextToProcess: FieldKey[] = [];
      for (const current of toProcess) {
        Object.entries(state).forEach(([key, value]) => {
          if ((value.dependencies || []).includes(current)) {
            toDelete.push(key);
            nextToProcess.push(key);
          }
        });
      }

      toProcess = nextToProcess;
    }

    toDelete.forEach((key) => {
      setState((prev) => ({
        ...prev,
        [key]: { ...prev[key], value: "" },
      }));
    });

    const rawValue = event.target.value;
    const value =
      rawValue && event.target.type === "number" ? Number(rawValue) : rawValue;

    setState((prevState) => ({
      ...prevState,
      [event.target.name]: {
        ...prevState[event.target.name as FieldKey],
        value,
      },
    }));
  }

  function onSubmit(event: FormEvent) {
    setIsDisabled(true);

    console.log({ state });
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <form onSubmit={(e: FormEvent) => e.preventDefault()}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          autoComplete="country"
          value={state.country.value}
          onChange={onChange}
        />
        <br />

        <label htmlFor="town">Town</label>
        <input
          id="town"
          name="town"
          autoComplete="town"
          value={state.town.value}
          onChange={onChange}
        />
        <br />

        <label htmlFor="sortCode">Sort Code</label>
        <input
          id="sortСode"
          name="sortCode"
          type="number"
          value={state.sortCode.value}
          onChange={onChange}
        />
        <br />

        <label htmlFor="regNumber">Reg Number</label>
        <input
          id="regNumber"
          value={state.regNumber.value}
          name="regNumber"
          onChange={onChange}
        />
        <br />

        <button type="submit" onClick={onSubmit} disabled={isDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
}
