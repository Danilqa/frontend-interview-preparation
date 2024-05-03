import { useState, useCallback, useRef } from "react";

import "./App.css";

function debounce(fn, delayMs) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.call(this, ...args);
    }, delayMs);
  };
}

export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const abortController = useRef();

  const fetchData = useCallback(
    debounce((fetchQuery) => {
      if (abortController.current) {
        console.log("abort");
        abortController.current.abort();
      }

      if (fetchQuery.length < 3) {
        setData([]);
        return;
      }

      const controller = new AbortController();
      abortController.current = controller;

      fetch(`https://dummyjson.com/products/search?q=${fetchQuery}&limit=5`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((res) => res.products)
        .then(setData)
        .catch((err) => {
          if (err.name === "AbortError") {
            return;
          }

          console.error("Fetch error:", err);
        });
    }, 100),
    []
  );

  const onQueryChanged = (event) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    fetchData(nextQuery);
  };

  return (
    <div className="App">
      <div className="autocomplete">
        <input className="autocomplete__input" value={query} onChange={onQueryChanged} />
        {data.length ? (
          <div className="dropdown">
            {data.map((item) => <div key={item.id} className="dropdown__item">{item.title}</div>)}
          </div>
        ) : null}
      </div>
    </div>
  );
}
