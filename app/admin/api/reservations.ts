import { format, addHours } from "date-fns"

export interface Reservation {
  id: string
  trainerId: string
  trainerName: string
  date: string
  time: string
  sessionDate: string
  sessionTime: string
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
      const reservationDate = new Date(date)
      reservationDate.setHours(Math.floor(Math.random() * 12) + 9, 0, 0, 0) // Random time between 9:00 and 20:00
      const sessionDate = addHours(reservationDate, Math.floor(Math.random() * 48) + 1) // Session 1-48 hours after reservation

      reservations.push({
        id: `res-${format(date, "yyyyMMdd")}-${i}`,
        trainerId: `trainer-${Math.floor(Math.random() * 3) + 1}`,
        trainerName: `トレーナー${String.fromCharCode(65 + Math.floor(Math.random() * 10))}`, // Random trainer name A-J
        date: format(reservationDate, "yyyy-MM-dd"),
        time: format(reservationDate, "HH:mm"),
        sessionDate: format(sessionDate, "yyyy-MM-dd"),
        sessionTime: format(sessionDate, "HH:mm"),
        storeId: `store-${Math.floor(Math.random() * 3) + 1}`,
        customerName: `Customer ${Math.floor(Math.random() * 100) + 1}`,
      })
    }
  }
  return reservations
}

const mockReservations = generateMockReservations()

export async function fetchReservations(): Promise<Reservation[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockReservations
}

