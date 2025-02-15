import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BasicPlanFilterBarProps {
  filterOptions: {
    planType: string
    status: string
  }
  onFilterChange: (newFilterOptions: { planType: string; status: string }) => void
}

export function BasicPlanFilterBar({ filterOptions, onFilterChange }: BasicPlanFilterBarProps) {
  const handleChange = (field: "planType" | "status", value: string) => {
    onFilterChange({ ...filterOptions, [field]: value })
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select value={filterOptions.planType} onValueChange={(value) => handleChange("planType", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="プラン種別" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全て</SelectItem>
          <SelectItem value="monthly">月間</SelectItem>
          <SelectItem value="yearly">年間</SelectItem>
          <SelectItem value="per-session">回数制</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterOptions.status} onValueChange={(value) => handleChange("status", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="ステータス" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全て</SelectItem>
          <SelectItem value="active">有効</SelectItem>
          <SelectItem value="inactive">無効</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

