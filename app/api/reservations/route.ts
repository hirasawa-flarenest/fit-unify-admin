import { NextResponse } from "next/server"
import { format } from "date-fns"

export interface Reservation {
  id: string
  trainerId: string
  date: string
  time: string
  storeId: string
  customerName: string
}

const generateMockReservations = (): Reservation[] => {
  const reservations: Reservation[] = []
  const startDate = new Date(2025, 1, 1) // February 1, 2025
  const endDate = new Date(2025, 1, 28) // February 28, 2025

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const numReservations = Math.floor(Math.random() * 5) + 1 // 1 to 5 reservations per day
    for (let i = 0; i < numReservations; i++) {
      reservations.push({
        id: `res-${format(date, "yyyyMMdd")}-${i}`,
        trainerId: `trainer-${Math.floor(Math.random() * 3) + 1}`,
        date: format(date, "yyyy-MM-dd"),
        time: `${Math.floor(Math.random() * 12) + 9}:00`, // Random time between 9:00 and 20:00
        storeId: `store-${Math.floor(Math.random() * 3) + 1}`,
        customerName: `Customer ${Math.floor(Math.random() * 100) + 1}`,
      })
    }
  }
  return reservations
}

const mockReservations = generateMockReservations()

export async function GET() {
  return NextResponse.json(mockReservations)
}

