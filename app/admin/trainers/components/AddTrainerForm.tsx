"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { createTrainer, type TrainerInput } from "../../api/trainers"

interface AddTrainerFormProps {
  onTrainerAdded: () => void
}

const availableDays = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"]

export function AddTrainerForm({ onTrainerAdded }: AddTrainerFormProps) {
  const [formData, setFormData] = useState<TrainerInput>({
    name: "",
    specialization: "",
    availability: [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTrainer(formData)
      onTrainerAdded()
      setFormData({ name: "", specialization: "", availability: [] })
    } catch (error) {
      console.error("Failed to add trainer:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availability: checked ? [...prev.availability, day] : prev.availability.filter((d) => d !== day),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">名前</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="specialization">専門分野</Label>
        <Input
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>稼働日</Label>
        <div className="space-y-2">
          {availableDays.map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox
                id={`day-${day}`}
                checked={formData.availability.includes(day)}
                onCheckedChange={(checked) => handleAvailabilityChange(day, checked as boolean)}
              />
              <Label htmlFor={`day-${day}`}>{day}</Label>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit">トレーナーを追加</Button>
    </form>
  )
}

