import { useState } from "react"
import type { Plan, PlanStatus } from "../types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PlanFormProps {
  initialPlan?: Plan
  onSubmit: (plan: Plan) => void
}

export function PlanForm({ initialPlan, onSubmit }: PlanFormProps) {
  const [plan, setPlan] = useState<Plan>(
    initialPlan || {
      id: "",
      name: "",
      type: "common",
      targetStoreCount: 0,
      status: "draft",
      description: "",
      defaultPrice: 0, // Added defaultPrice to initialPlan
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const parsedValue = name === "defaultPrice" ? Number.parseFloat(value) : value // Parse defaultPrice as a number
    setPlan((prev) => ({ ...prev, [name]: parsedValue }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setPlan((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(plan)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">プラン名</label>
        <Input id="name" name="name" value={plan.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="type">プランタイプ</label>
        <Select name="type" value={plan.type} onValueChange={(value) => handleSelectChange("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="プランタイプを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="common">全店舗共通</SelectItem>
            <SelectItem value="store-specific">店舗特化型</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {plan.type === "common" && (
        <div>
          <label htmlFor="defaultPrice">デフォルト料金</label>
          <Input
            id="defaultPrice"
            name="defaultPrice"
            type="number"
            value={plan.defaultPrice.toString()} // Convert defaultPrice to string for Input
            onChange={handleChange}
            required
          />
        </div>
      )}
      <div>
        <label htmlFor="status">ステータス</label>
        <Select
          name="status"
          value={plan.status}
          onValueChange={(value) => handleSelectChange("status", value as PlanStatus)}
        >
          <SelectTrigger>
            <SelectValue placeholder="ステータスを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">公開中</SelectItem>
            <SelectItem value="draft">下書き</SelectItem>
            <SelectItem value="private">非公開</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="description">プラン説明</label>
        <Textarea id="description" name="description" value={plan.description} onChange={handleChange} required />
      </div>
      <Button type="submit">保存</Button>
    </form>
  )
}

