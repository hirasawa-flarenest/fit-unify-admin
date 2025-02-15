import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { StoreCustomization } from "../types"

interface StoreCustomizationListProps {
  customizations: StoreCustomization[]
}

export function StoreCustomizationList({ customizations }: StoreCustomizationListProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">店舗別カスタマイズ状況</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">店舗名</TableHead>
            <TableHead>適用プラン数</TableHead>
            <TableHead>独自プラン数</TableHead>
            <TableHead>最終更新日</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customizations.map((customization) => (
            <TableRow key={customization.id}>
              <TableCell className="font-medium">{customization.name}</TableCell>
              <TableCell>{customization.appliedPlanCount}</TableCell>
              <TableCell>{customization.uniquePlanCount}</TableCell>
              <TableCell>{customization.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

