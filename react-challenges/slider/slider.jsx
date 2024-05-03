import { useRef } from "react";

import "./styles.css";

const SLIDES = new Array(10).fill(0).map((_, i) => i + 1);

export default function App() {
  const slider = useRef();

  const move = (dir) => {
    const curr = slider.current.scrollLeft;

    if (dir === "left") {
      slider.current.scroll({ left: curr - 400, behavior: "smooth" });
    }

    if (dir === "right") {
      slider.current.scroll({ left: curr + 400, behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      <h1>Slider</h1>

      <div className="slider-container">
        <div className="slider" ref={slider}>
          {SLIDES.map((number) => (
            <div className="slide">{number}</div>
          ))}

          <div className="navigation">
            <div className="left" onClick={() => move("left")}>
              {"<"}
            </div>
            <div className="right" onClick={() => move("right")}>
              {">"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
