import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Copy, Trash } from "lucide-react"
import type { StorePlan } from "../../api/plans"

interface StorePlanListProps {
  plans: StorePlan[]
  onPlanClick: (plan: StorePlan) => void
}

export function StorePlanList({ plans, onPlanClick }: StorePlanListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>プラン名</TableHead>
          <TableHead>対象店舗数</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans.map((plan) => (
          <TableRow key={plan.id}>
            <TableCell>
              <button onClick={() => onPlanClick(plan)} className="text-blue-600 hover:underline">
                {plan.name}
              </button>
            </TableCell>
            <TableCell>{plan.targetStores.length}</TableCell>
            <TableCell>{plan.status}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" /> 編集
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" /> コピー
                </Button>
                <Button variant="outline" size="sm">
                  <Trash className="h-4 w-4 mr-1" /> 削除
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

