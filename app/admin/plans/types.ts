export type PlanType = "common" | "store-specific"
export type PlanStatus = "published" | "draft" | "private"

export interface Plan {
  id: string
  name: string
  type: PlanType
  defaultPrice?: number
  targetStoreCount: number
  status: PlanStatus
  description: string
}

export interface CommonPlan extends Plan {
  type: "common"
  defaultPrice: number
  excludedStores: string[]
}

export interface StorePlan extends Plan {
  type: "store-specific"
  targetStores: string[]
}

