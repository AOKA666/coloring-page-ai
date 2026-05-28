"use client";

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function Slider({ label, value, onChange }: SliderProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-gray-400">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-[#FF6B6B]
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150
          [&::-webkit-slider-thumb]:hover:scale-125
          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-[#FF6B6B]
          [&::-moz-range-thumb]:cursor-pointer
        "
        style={{
          background: `linear-gradient(to right, #FF6B6B 0%, #FF8E53 ${value}%, #E5E5E5 ${value}%, #E5E5E5 100%)`,
        }}
      />
    </div>
  );
}
