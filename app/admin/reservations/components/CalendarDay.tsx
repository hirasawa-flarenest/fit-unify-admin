import { format, isSaturday, isSunday } from "date-fns"
import type { Reservation } from "../../api/reservations"

// This is a placeholder function. In a real application, you would implement
// proper holiday detection logic, possibly using a library or API.
const isHoliday = (date: Date): boolean => {
  // Example logic: consider January 1st as a holiday
  return date.getMonth() === 0 && date.getDate() === 1
}

// This is a placeholder function. In a real application, you would implement
// proper closed day detection logic based on your business rules.
const isClosedDay = (date: Date): boolean => {
  // Example logic: consider the gym closed on the first Monday of each month
  return date.getDay() === 1 && date.getDate() <= 7
}

interface CalendarDayProps {
  date: Date
  reservations: Reservation[]
  isCurrentMonth: boolean
  isToday: boolean
  trainerCount: number
  maxAvailableSessions: number
  isPreviousMonth: boolean
  isNextMonth: boolean
}

export function CalendarDay({
  date,
  reservations,
  isCurrentMonth,
  isToday,
  trainerCount,
  maxAvailableSessions,
  isPreviousMonth,
  isNextMonth,
}: CalendarDayProps) {
  const isHolidayDate = isHoliday(date)
  const isClosed = isClosedDay(date)

  const dayClasses = `p-2 ${
    isCurrentMonth ? "bg-white" : "bg-gray-50"
  } hover:bg-gray-100 transition-colors border-r border-b border-gray-200 relative`

  const dateClasses = `text-sm font-semibold text-center ${
    isClosed
      ? "text-gray-400"
      : isToday
        ? "text-blue-600"
        : isSunday(date) || isHolidayDate
          ? "text-red-800"
          : isSaturday(date)
            ? "text-blue-800"
            : isCurrentMonth
              ? "text-gray-900"
              : "text-gray-400"
  }`

  return (
    <div className={`${dayClasses} h-32 flex flex-col ${isClosed ? "bg-gray-200" : ""}`}>
      <div className={dateClasses}>{format(date, "d")}</div>
      {!isClosed && (
        <div className="mt-1 space-y-2 text-xs font-medium">
          <div className="text-blue-800 py-0.5">トレーナー: {trainerCount}</div>
          <div className="text-yellow-800 py-0.5">予約: {reservations.length}</div>
          <div className="text-red-800 py-0.5">空き枠数：{maxAvailableSessions}件</div>
        </div>
      )}
      {isClosed && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
          <span className="text-gray-600 font-bold">休業日</span>
        </div>
      )}
    </div>
  )
}

