"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createPlan, type PlanInput } from "../../api/plans"
import type { Store } from "../../api/types"

interface AddPlanFormProps {
  onPlanAdded: () => void
  stores: Store[]
}

export function AddPlanForm({ onPlanAdded, stores }: AddPlanFormProps) {
  const [formData, setFormData] = useState<PlanInput>({
    name: "",
    description: "",
    duration: "",
    prices: stores.map((store) => ({ storeId: store.id, price: 0 })),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createPlan(formData)
      onPlanAdded()
      setFormData({
        name: "",
        description: "",
        duration: "",
        prices: stores.map((store) => ({ storeId: store.id, price: 0 })),
      })
    } catch (error) {
      console.error("Failed to add plan:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePriceChange = (storeId: string, price: number) => {
    setFormData((prev) => ({
      ...prev,
      prices: prev.prices.map((p) => (p.storeId === storeId ? { ...p, price } : p)),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">プラン名</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="description">説明</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="duration">期間</Label>
        <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
      </div>
      <div>
        <Label>価格（店舗別）</Label>
        {stores.map((store) => (
          <div key={store.id} className="flex items-center space-x-2 mt-2">
            <Label htmlFor={`price-${store.id}`} className="w-1/3">
              {store.name}
            </Label>
            <Input
              id={`price-${store.id}`}
              type="number"
              value={formData.prices.find((p) => p.storeId === store.id)?.price || 0}
              onChange={(e) => handlePriceChange(store.id, Number(e.target.value))}
              required
            />
            <span>円</span>
          </div>
        ))}
      </div>
      <Button type="submit">プランを追加</Button>
    </form>
  )
}

