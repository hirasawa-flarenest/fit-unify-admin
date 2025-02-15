"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { fetchTrainers, type Trainer } from "../api/trainers"
import { AddTrainerForm } from "./components/AddTrainerForm"
import { Label } from "@/components/ui/label"

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)

  const loadTrainers = async () => {
    const fetchedTrainers = await fetchTrainers()
    setTrainers(fetchedTrainers)
  }

  useEffect(() => {
    loadTrainers()
  }, []) //This line was already correct.  The comment was unnecessary.

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleTrainerAdded = () => {
    setIsAddTrainerOpen(false)
    loadTrainers()
  }

  const handleTrainerDetails = (trainer: Trainer) => {
    setSelectedTrainer(trainer)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">トレーナー管理</h1>
      <div className="flex justify-between">
        <Input
          placeholder="トレーナー名または専門分野で検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog open={isAddTrainerOpen} onOpenChange={setIsAddTrainerOpen}>
          <DialogTrigger asChild>
            <Button>新規トレーナー追加</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規トレーナーの追加</DialogTitle>
            </DialogHeader>
            <AddTrainerForm onTrainerAdded={handleTrainerAdded} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-bold">ID</TableHead>
            <TableHead className="font-bold">名前</TableHead>
            <TableHead className="font-bold">専門分野</TableHead>
            <TableHead className="font-bold">稼働日</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTrainers.map((trainer, index) => (
            <TableRow
              key={trainer.id}
              className={`
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                hover:bg-gray-100 transition-colors
              `}
            >
              <TableCell>{trainer.id}</TableCell>
              <TableCell>
                <button className="text-blue-600 hover:underline" onClick={() => handleTrainerDetails(trainer)}>
                  {trainer.name}
                </button>
              </TableCell>
              <TableCell>{trainer.specialization}</TableCell>
              <TableCell>{trainer.availability.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={!!selectedTrainer} onOpenChange={() => setSelectedTrainer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTrainer?.name} の詳細</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">ID</Label>
              <span className="col-span-3">{selectedTrainer?.id}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">名前</Label>
              <span className="col-span-3">{selectedTrainer?.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">専門分野</Label>
              <span className="col-span-3">{selectedTrainer?.specialization}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">稼働日</Label>
              <span className="col-span-3">{selectedTrainer?.availability.join(", ")}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

