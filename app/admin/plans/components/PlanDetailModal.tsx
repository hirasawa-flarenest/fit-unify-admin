import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { Plan } from "../types"
import { PlanDetail } from "./PlanDetail"

interface PlanDetailModalProps {
  plan: Plan | null
  isOpen: boolean
  onClose: () => void
}

export function PlanDetailModal({ plan, isOpen, onClose }: PlanDetailModalProps) {
  if (!plan) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[825px]">
        <PlanDetail plan={plan} />
      </DialogContent>
    </Dialog>
  )
}

