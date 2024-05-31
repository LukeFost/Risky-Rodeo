"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

interface DoubleSliderProps {
  minValue: number;
  maxValue: number;
  onValueChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
}

const DoubleSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DoubleSliderProps
>(({ className, minValue, maxValue, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
  const [values, setValues] = React.useState<[number, number]>([minValue, maxValue]);

  React.useEffect(() => {
    setValues([minValue, maxValue]);
  }, [minValue, maxValue]);

  const handleChange = (newValues: [number, number]) => {
    setValues(newValues);
    onValueChange(newValues);
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      value={values}
      onValueChange={handleChange}
      min={min}
      max={max}
      step={step}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});

DoubleSlider.displayName = SliderPrimitive.Root.displayName;

export { DoubleSlider };
