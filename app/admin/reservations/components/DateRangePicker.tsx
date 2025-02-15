"use client"
import { DatePicker } from "./DatePicker"

interface DateRangePickerProps {
  fromDate: Date | null
  toDate: Date | null
  onFromChange: (date: Date | null) => void
  onToChange: (date: Date | null) => void
  fromLabel: string
  toLabel: string
}

export function DateRangePicker({
  fromDate,
  toDate,
  onFromChange,
  onToChange,
  fromLabel,
  toLabel,
}: DateRangePickerProps) {
  return (
    <div className="flex items-center space-x-4">
      <DatePicker date={fromDate} onDateChange={onFromChange} label={fromLabel} />
      <DatePicker date={toDate} onDateChange={onToChange} label={toLabel} />
    </div>
  )
}

