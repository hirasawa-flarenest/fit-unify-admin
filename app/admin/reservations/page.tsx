"use client"

import { useState, useEffect } from "react"
import { format, addMonths, subMonths, parse } from "date-fns"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, List } from "lucide-react"
import { fetchTrainers, type Trainer } from "../api/trainers"
import { fetchReservations, type Reservation } from "../api/reservations"
import { MonthlyCalendar } from "./components/MonthlyCalendar"
import { FilterBar } from "./components/FilterBar"
import { SelectedFilters } from "./components/SelectedFilters"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DatePicker } from "./components/DatePicker"
import { Label } from "@/components/ui/label"

const mockStores = [
  { id: "1", name: "店舗A" },
  { id: "2", name: "店舗B" },
  { id: "3", name: "店舗C" },
]

export default function ReservationsPage() {
  const [currentView, setCurrentView] = useState<"monthly" | "weekly" | "daily">("monthly")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selectedStores, setSelectedStores] = useState<string[]>([])
  const [selectedTrainers, setSelectedTrainers] = useState<string[]>([])
  const [viewType, setViewType] = useState<"calendar" | "list">("calendar")
  const [reservationDateTime, setReservationDateTime] = useState<Date | null>(null)
  const [sessionDateTime, setSessionDateTime] = useState<Date | null>(null)
  const [selectedTrainer, setSelectedTrainer] = useState("")
  const [customerFilter, setCustomerFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    const loadData = async () => {
      const [fetchedTrainers, fetchedReservations] = await Promise.all([fetchTrainers(), fetchReservations()])
      setTrainers(fetchedTrainers)
      setReservations(fetchedReservations)
    }
    loadData()
  }, [])

  const handlePreviousMonth = () => setCurrentDate((prev) => subMonths(prev, 1))
  const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1))

  const handleRemoveStore = (storeId: string) => {
    setSelectedStores(selectedStores.filter((id) => id !== storeId))
  }

  const handleRemoveTrainer = (trainerId: string) => {
    setSelectedTrainers(selectedTrainers.filter((id) => id !== trainerId))
  }

  const handleClearAllFilters = () => {
    setSelectedStores([])
    setSelectedTrainers([])
    setReservationDateTime(null)
    setSessionDateTime(null)
    setSelectedTrainer("")
    setCustomerFilter("")
  }

  const filteredReservations = reservations.filter((reservation) => {
    const reservationDate = parse(reservation.date, "yyyy-MM-dd", new Date())
    const sessionDate = parse(reservation.sessionDate, "yyyy-MM-dd", new Date())
    const dateMatch =
      (!reservationDateTime || reservationDate >= reservationDateTime) &&
      (!sessionDateTime || sessionDate >= sessionDateTime)
    const trainerMatch = !selectedTrainer || reservation.trainerId === selectedTrainer
    const customerMatch =
      !customerFilter || reservation.customerName.toLowerCase().includes(customerFilter.toLowerCase())
    return dateMatch && trainerMatch && customerMatch
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredReservations.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold">予約管理</h1>
            <Tabs value={viewType} onValueChange={(value: "calendar" | "list") => setViewType(value)}>
              <TabsList>
                <TabsTrigger value="calendar">
                  <Calendar className="w-4 h-4 mr-2" />
                  カレンダー表示
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List className="w-4 h-4 mr-2" />
                  リスト表示
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {viewType === "calendar" && (
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex items-center space-x-4">
              <Select
                value={currentView}
                onValueChange={(value: "monthly" | "weekly" | "daily") => setCurrentView(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="表示期間" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">月別</SelectItem>
                  <SelectItem value="weekly">週別</SelectItem>
                  <SelectItem value="daily">日別</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center bg-secondary rounded-lg">
                <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold px-4">{format(currentDate, "yyyy年M月")}</span>
                <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <FilterBar
              stores={mockStores}
              trainers={trainers}
              selectedStores={selectedStores}
              selectedTrainers={selectedTrainers}
              onStoreChange={setSelectedStores}
              onTrainerChange={setSelectedTrainers}
            />
          </div>
        )}
      </div>

      <SelectedFilters
        selectedStores={selectedStores}
        selectedTrainers={selectedTrainers}
        stores={mockStores}
        trainers={trainers}
        onRemoveStore={handleRemoveStore}
        onRemoveTrainer={handleRemoveTrainer}
        onClearAll={handleClearAllFilters}
      />

      {viewType === "list" && (
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col min-w-[150px]">
              <Label htmlFor="reservationDateTime" className="mb-1">
                予約日時
              </Label>
              <DatePicker
                id="reservationDateTime"
                date={reservationDateTime}
                onDateChange={setReservationDateTime}
                label="予約日時を選択"
                showTime={true}
                className="w-full"
              />
            </div>
            <div className="flex flex-col min-w-[150px]">
              <Label htmlFor="sessionDateTime" className="mb-1">
                セッション日時
              </Label>
              <DatePicker
                id="sessionDateTime"
                date={sessionDateTime}
                onDateChange={setSessionDateTime}
                label="セッション日時を選択"
                showTime={true}
                className="w-full"
              />
            </div>
            <div className="flex flex-col min-w-[150px]">
              <Label htmlFor="trainerSelect" className="mb-1">
                指名トレーナー
              </Label>
              <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                <SelectTrigger id="trainerSelect" className="w-full">
                  <SelectValue placeholder="トレーナーを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全て</SelectItem>
                  {trainers.map((trainer) => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <Label htmlFor="customerSearch" className="mb-1">
                顧客名
              </Label>
              <Input
                id="customerSearch"
                placeholder="顧客名で検索"
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handleClearAllFilters} variant="outline">
              フィルターをクリア
            </Button>
          </div>
        </div>
      )}

      {viewType === "calendar" && (
        <div className="mt-6">
          {currentView === "monthly" && (
            <MonthlyCalendar
              currentDate={currentDate}
              reservations={filteredReservations}
              trainers={trainers}
              selectedStores={selectedStores}
              selectedTrainers={selectedTrainers}
            />
          )}
          {currentView === "weekly" && <div>Weekly calendar view (to be implemented)</div>}
          {currentView === "daily" && <div>Daily calendar view (to be implemented)</div>}
        </div>
      )}
      {viewType === "list" && (
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>予約日時</TableHead>
                <TableHead>セッション日時</TableHead>
                <TableHead>指名トレーナー</TableHead>
                <TableHead>予約者氏名</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{`${reservation.date} ${reservation.time}`}</TableCell>
                  <TableCell>{`${reservation.sessionDate} ${reservation.sessionTime}`}</TableCell>
                  <TableCell>{reservation.trainerName}</TableCell>
                  <TableCell>{reservation.customerName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex flex-col items-center">
            <div className="flex justify-center space-x-2">
              <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                前へ
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  variant={currentPage === page ? "secondary" : "outline"}
                >
                  {page}
                </Button>
              ))}
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                次へ
              </Button>
            </div>
            <div className="text-sm text-gray-700 mt-2">
              {filteredReservations.length}件中 {indexOfFirstItem + 1}~
              {Math.min(indexOfLastItem, filteredReservations.length)}件を表示
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

