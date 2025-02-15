import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Edit } from "lucide-react"
import type { BasicPlan, SortField, SortOrder } from "../types"
import { BasicPlanFilterBar } from "./FilterBar"

interface BasicPlanListProps {
  plans: BasicPlan[]
  onSort: (field: SortField) => void
  sortField: SortField
  sortOrder: SortOrder
  filterOptions: {
    planType: string
    status: string
  }
  onFilterChange: (newFilterOptions: { planType: string; status: string }) => void
}

export function BasicPlanList({
  plans,
  onSort,
  sortField,
  sortOrder,
  filterOptions,
  onFilterChange,
}: BasicPlanListProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">基本プラン一覧</h2>
      <BasicPlanFilterBar filterOptions={filterOptions} onFilterChange={onFilterChange} />
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[200px]">
              <Button variant="ghost" onClick={() => onSort("name")}>
                プラン名
                {sortField === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead>概要説明</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("periodType")}>
                期間タイプ
                {sortField === "periodType" && <ArrowUpDown className="ml-2 h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("storeCount")}>
                利用店舗数
                {sortField === "storeCount" && <ArrowUpDown className="ml-2 h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("status")}>
                ステータス
                {sortField === "status" && <ArrowUpDown className="ml-2 h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead>アクション</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan, index) => (
            <TableRow
              key={plan.id}
              className={`
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                hover:bg-gray-100 transition-colors
              `}
            >
              <TableCell className="font-medium">{plan.name}</TableCell>
              <TableCell>{plan.description}</TableCell>
              <TableCell>{plan.periodType}</TableCell>
              <TableCell>{plan.storeCount}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${plan.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {plan.status === "active" ? "有効" : "無効"}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  編集
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

