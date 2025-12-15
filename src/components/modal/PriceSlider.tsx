"use client";
import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

export function PriceSlider() {
  const [value, setValue] = useState<[number, number]>([0, 300000]);

  return (
    <Slider.Root
      className="relative flex w-full items-center pt-6"
      value={value}
      min={0}
      max={300000}
      step={1000}
      onValueChange={v => setValue(v as [number, number])}
    >
      {/* 트랙 */}
      <Slider.Track className="bg-border-sub relative h-2 w-full rounded-full">
        <Slider.Range className="bg-custom-orange absolute h-full rounded-full" />
      </Slider.Track>

      {/* 왼쪽 핸들 */}
      <Slider.Thumb className="bg-custom-orange border-custom-dark-brown block h-6 w-6 rounded-full border-3 active:scale-110" />

      {/* 오른쪽 핸들 */}
      <Slider.Thumb className="bg-custom-orange border-custom-dark-brown block h-6 w-6 rounded-full border-3 active:scale-110" />
    </Slider.Root>
  );
}
