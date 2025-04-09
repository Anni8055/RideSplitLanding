import { Calendar } from "lucide-react";
import { useEffect } from "react";

interface UberDateSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function UberDateSelect({ value, onChange }: UberDateSelectProps) {
  // Set default date to today if not already set
  useEffect(() => {
    if (!value) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      onChange(formattedDate);
    }
  }, [value, onChange]);

  return (
    <div className="relative">
      <div className="absolute left-3 top-3 text-gray-400">
        <Calendar className="h-5 w-5" />
      </div>
      <input 
        type="date"
        className="w-full pl-10 py-[1.45rem] bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 font-medium"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}