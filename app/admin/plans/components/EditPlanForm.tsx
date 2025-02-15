"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updatePlan, type Plan, type PlanInput } from "../../api/plans"
import type { Store } from "../../api/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlusCircle, X } from "lucide-react"

interface EditPlanFormProps {
  plan: Plan
  stores: Store[]
  onPlanUpdated: () => void
}

export function EditPlanForm({ plan, stores, onPlanUpdated }: EditPlanFormProps) {
  const [formData, setFormData] = useState<PlanInput>({
    name: plan.name,
    description: plan.description,
    duration: plan.duration,
    prices: plan.prices,
  })
  const [isAddStoreModalOpen, setIsAddStoreModalOpen] = useState(false)
  const [availableStores, setAvailableStores] = useState(
    stores.filter((store) => !formData.prices.some((price) => price.storeId === store.id)),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updatePlan(plan.id, formData)
      onPlanUpdated()
    } catch (error) {
      console.error("Failed to update plan:", error)
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

  const handleAddStore = (storeId: string) => {
    setFormData((prev) => ({
      ...prev,
      prices: [...prev.prices, { storeId, price: 0 }],
    }))
    setAvailableStores((prev) => prev.filter((store) => store.id !== storeId))
    setIsAddStoreModalOpen(false)
  }

  const handleRemoveStore = (storeId: string) => {
    setFormData((prev) => ({
      ...prev,
      prices: prev.prices.filter((price) => price.storeId !== storeId),
    }))
    const removedStore = stores.find((store) => store.id === storeId)
    if (removedStore) {
      setAvailableStores((prev) => [...prev, removedStore])
    }
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
        <div className="flex justify-between items-center mb-2">
          <Label>価格（店舗別）</Label>
          <Button type="button" variant="outline" size="sm" onClick={() => setIsAddStoreModalOpen(true)}>
            <PlusCircle className="w-4 h-4 mr-2" />
            店舗を追加
          </Button>
        </div>
        {formData.prices.map(({ storeId, price }) => {
          const store = stores.find((s) => s.id === storeId)
          return (
            <div key={storeId} className="flex items-center space-x-2 mt-2">
              <Label htmlFor={`price-${storeId}`} className="w-1/3">
                {store?.name}
              </Label>
              <Input
                id={`price-${storeId}`}
                type="number"
                value={price}
                onChange={(e) => handlePriceChange(storeId, Number(e.target.value))}
                required
              />
              <span>円</span>
              <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveStore(storeId)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )
        })}
      </div>
      <Button type="submit">プランを更新</Button>
      <Dialog open={isAddStoreModalOpen} onOpenChange={setIsAddStoreModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>店舗一覧</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {availableStores.map((store) => (
              <div key={store.id} className="flex justify-between items-center p-2 border rounded">
                <span>{store.name}</span>
                <Button type="button" size="sm" onClick={() => handleAddStore(store.id)}>
                  追加
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </form>
  )
}

