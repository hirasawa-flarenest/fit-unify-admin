export type PlanType = "common" | "store-specific"
export type PlanStatus = "published" | "draft" | "private"

export interface BasePlan {
  id: string
  name: string
  type: PlanType
  status: PlanStatus
  description: string
}

export interface CommonPlan extends BasePlan {
  type: "common"
  defaultPrice: number
  excludedStores: string[]
}

export interface StorePlan extends BasePlan {
  type: "store-specific"
  targetStores: string[]
}

export type Plan = CommonPlan | StorePlan

const mockPlans: Plan[] = [
  {
    id: "1",
    name: "スタンダードプラン",
    type: "common",
    defaultPrice: 5000,
    status: "published",
    description: "全店舗共通の標準プラン",
    excludedStores: ["store3","store4"],
  },
  {
    id: "2",
    name: "プレミアムプラン",
    type: "common",
    defaultPrice: 10000,
    status: "draft",
    description: "高級志向の顧客向けプラン",
    excludedStores: ["store7",],
  },
  {
    id: "3",
    name: "東京限定プラン",
    type: "store-specific",
    status: "published",
    description: "東京エリアの店舗限定プラン",
    targetStores: ["store1", "store2",],
  },
  {
    id: "4",
    name: "大阪特別プラン",
    type: "store-specific",
    status: "draft",
    description: "大阪エリアの特別プラン",
    targetStores: ["store6"],
  },
]

export async function fetchPlans(): Promise<Plan[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPlans), 500)
  })
}

export async function createPlan(planData: Omit<Plan, "id">): Promise<Plan> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPlan: Plan = {
        id: (mockPlans.length + 1).toString(),
        ...planData,
      }
      mockPlans.push(newPlan)
      resolve(newPlan)
    }, 500)
  })
}

export async function updatePlan(planId: string, planData: Partial<Omit<Plan, "id">>): Promise<Plan> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const planIndex = mockPlans.findIndex((plan) => plan.id === planId)
      if (planIndex !== -1) {
        mockPlans[planIndex] = { ...mockPlans[planIndex], ...planData }
        resolve(mockPlans[planIndex])
      } else {
        reject(new Error("Plan not found"))
      }
    }, 500)
  })
}

