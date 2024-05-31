import React, { useState, useEffect, useRef } from "react";

interface DoubleSliderProps {
  minValue: number;
  maxValue: number;
  onValueChange: (values: [number, number]) => void;
}

const DoubleSlider: React.FC<DoubleSliderProps> = ({
  minValue: initialMinValue,
  maxValue: initialMaxValue,
  onValueChange,
}) => {
  const [minValue, setMinValue] = useState<number>(initialMinValue);
  const [maxValue, setMaxValue] = useState<number>(initialMaxValue);
  const minGap = 0;
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const sliderMaxValue = 100;

  useEffect(() => {
    fillColor();
  }, [minValue, maxValue]);

  useEffect(() => {
    onValueChange([minValue, maxValue]);
  }, [minValue, maxValue, onValueChange]);

  const slideOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (maxValue - value <= minGap) {
      setMinValue(maxValue - minGap);
    } else {
      setMinValue(value);
    }
  };

  const slideTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value - minValue <= minGap) {
      setMaxValue(minValue + minGap);
    } else {
      setMaxValue(value);
    }
  };

  const fillColor = () => {
    const percent1 = (minValue / sliderMaxValue) * 100;
    const percent2 = (maxValue / sliderMaxValue) * 100;
    if (sliderTrackRef.current) {
      sliderTrackRef.current.style.background = `linear-gradient(to right, var(--muted) ${percent1}%, var(--primary) ${percent1}%, var(--primary) ${percent2}%, var(--muted) ${percent2}%)`;
    }
  };

  return (
    <div className="wrapper p-10 bg-card rounded-lg">
      <div className="values bg-primary text-primary-foreground font-medium text-lg text-center py-2 rounded mb-6">
        <span id="range1">{minValue}</span>
        <span> &dash; </span>
        <span id="range2">{maxValue}</span>
      </div>
      <div className="container relative h-24">
        <div
          ref={sliderTrackRef}
          className="slider-track absolute w-full h-1 top-1/2 -translate-y-1/2 rounded-full bg-muted"
        ></div>
        <input
          type="range"
          min="0"
          max="100"
          value={minValue}
          id="slider-1"
          onChange={slideOne}
          className="absolute w-full h-0 -top-1.5 bg-transparent appearance-none pointer-events-none"
        />
        <input
          type="range"
          min="0"
          max="100"
          value={maxValue}
          id="slider-2"
          onChange={slideTwo}
          className="absolute w-full h-0 -top-1.5 bg-transparent appearance-none pointer-events-none"
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 1.7em;
            width: 1.7em;
            background-color: var(--primary);
            cursor: pointer;
            margin-top: -9px;
            pointer-events: auto;
            border-radius: 50%;
          }
          input[type="range"]::-moz-range-thumb {
            height: 1.7em;
            width: 1.7em;
            cursor: pointer;
            border-radius: 50%;
            background-color: var(--primary);
            pointer-events: auto;
            border: none;
          }
          input[type="range"]::-ms-thumb {
            height: 1.7em;
            width: 1.7em;
            cursor: pointer;
            border-radius: 50%;
            background-color: var(--primary);
            pointer-events: auto;
          }
        `}</style>
      </div>
    </div>
  );
};

export default DoubleSlider;
