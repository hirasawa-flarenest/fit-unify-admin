"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createStore, type StoreInput } from "../../api/stores"

interface AddStoreFormProps {
  onStoreAdded: () => void
}

export function AddStoreForm({ onStoreAdded }: AddStoreFormProps) {
  const [formData, setFormData] = useState<StoreInput>({
    name: "",
    address: "",
    phoneNumber: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createStore(formData)
      onStoreAdded()
      setFormData({ name: "", address: "", phoneNumber: "" })
    } catch (error) {
      console.error("Failed to add store:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">店舗名</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="address">住所</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="phoneNumber">電話番号</Label>
        <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <Button type="submit">店舗を追加</Button>
    </form>
  )
}

