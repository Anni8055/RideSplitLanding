import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface UberTimeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function UberTimeSelect({ value, onChange }: UberTimeSelectProps) {
  // Set default to "now" if no value provided
  useEffect(() => {
    if (!value) {
      onChange("now");
    }
  }, [value, onChange]);

  return (
    <div className="relative">
      <div className="absolute left-3 top-3 z-10 text-gray-400">
        <Clock className="h-5 w-5" />
      </div>
      <select
        className="w-full pl-10 py-[1.45rem] appearance-none bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 font-medium cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ 
          backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem top 50%",
          backgroundSize: "0.65rem auto",
          paddingRight: "2.5rem"
        }}
      >
        <option value="now" className="font-medium">Now</option>
        <option value="15_min" className="font-medium">In 15 minutes</option>
        <option value="30_min" className="font-medium">In 30 minutes</option>
        <option value="45_min" className="font-medium">In 45 minutes</option>
        <option disabled className="text-gray-400 bg-gray-100">───────────────</option>
        <option value="05:00" className="font-medium">5:00 AM</option>
        <option value="06:00" className="font-medium">6:00 AM</option>
        <option value="07:00" className="font-medium">7:00 AM</option>
        <option value="08:00" className="font-medium">8:00 AM</option>
        <option value="09:00" className="font-medium">9:00 AM</option>
        <option value="09:30" className="font-medium">9:30 AM</option>
        <option value="10:00" className="font-medium">10:00 AM</option>
        <option value="10:30" className="font-medium">10:30 AM</option>
        <option value="11:00" className="font-medium">11:00 AM</option>
        <option value="11:30" className="font-medium">11:30 AM</option>
        <option value="12:00" className="font-medium">12:00 PM</option>
        <option value="12:30" className="font-medium">12:30 PM</option>
        <option value="13:00" className="font-medium">1:00 PM</option>
        <option value="13:30" className="font-medium">1:30 PM</option>
        <option value="14:00" className="font-medium">2:00 PM</option>
        <option value="14:30" className="font-medium">2:30 PM</option>
        <option value="15:00" className="font-medium">3:00 PM</option>
        <option value="15:30" className="font-medium">3:30 PM</option>
        <option value="16:00" className="font-medium">4:00 PM</option>
        <option value="16:30" className="font-medium">4:30 PM</option>
        <option value="17:00" className="font-medium">5:00 PM</option>
        <option value="17:30" className="font-medium">5:30 PM</option>
        <option value="18:00" className="font-medium">6:00 PM</option>
        <option value="18:30" className="font-medium">6:30 PM</option>
        <option value="19:00" className="font-medium">7:00 PM</option>
        <option value="19:30" className="font-medium">7:30 PM</option>
        <option value="20:00" className="font-medium">8:00 PM</option>
        <option value="20:30" className="font-medium">8:30 PM</option>
        <option value="21:00" className="font-medium">9:00 PM</option>
        <option value="21:30" className="font-medium">9:30 PM</option>
        <option value="22:00" className="font-medium">10:00 PM</option>
      </select>
    </div>
  );
}