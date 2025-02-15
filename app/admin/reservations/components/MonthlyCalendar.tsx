import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  startOfWeek,
  endOfWeek,
} from "date-fns"
import { CalendarDay } from "./CalendarDay"
import type { Reservation } from "../../api/reservations"
import type { Trainer } from "../../api/trainers"

interface MonthlyCalendarProps {
  currentDate: Date
  reservations: Reservation[]
  trainers: Trainer[]
  selectedStores: string[]
  selectedTrainers: string[]
}

export function MonthlyCalendar({
  currentDate,
  reservations,
  trainers,
  selectedStores,
  selectedTrainers,
}: MonthlyCalendarProps) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"]

  // Assume each trainer has 8 available sessions per day
  const sessionsPerTrainer = 8

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-7 gap-px border-b border-gray-200">
        {weekdays.map((day) => (
          <div key={day} className="bg-gray-50 p-2 text-center font-semibold text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {days.map((day) => {
          const dayReservations = reservations.filter(
            (res) =>
              res.date === format(day, "yyyy-MM-dd") &&
              (selectedStores.length === 0 || selectedStores.includes(res.storeId || "")) &&
              (selectedTrainers.length === 0 || selectedTrainers.includes(res.trainerId)),
          )

          const dayTrainers = trainers.filter(
            (trainer) => selectedTrainers.length === 0 || selectedTrainers.includes(trainer.id),
          )

          const trainerCount = dayTrainers.length
          const maxAvailableSessions = trainerCount * sessionsPerTrainer - dayReservations.length

          return (
            <CalendarDay
              key={day.toString()}
              date={day}
              reservations={dayReservations}
              isCurrentMonth={isSameMonth(day, currentDate)}
              isToday={isToday(day)}
              trainerCount={trainerCount}
              maxAvailableSessions={maxAvailableSessions}
              isPreviousMonth={day < monthStart}
              isNextMonth={day > monthEnd}
            />
          )
        })}
      </div>
    </div>
  )
}

