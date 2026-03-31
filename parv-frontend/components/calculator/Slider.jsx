'use client'

export function Slider({ label, value, min, max, step, onChange, unit }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium">{label}</label>
                <span className="text-sm font-semibold">
                    {unit === "₹" ? "₹" : ""}{value.toLocaleString("en-IN")}{unit !== "₹" ? ` ${unit}` : ""}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-500/70 via-cyan-400/70 to-emerald-400/70 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
