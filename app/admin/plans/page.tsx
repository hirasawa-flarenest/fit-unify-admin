"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommonPlanList } from "./components/CommonPlanList"
import { StorePlanList } from "./components/StorePlanList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PlanDetailModal } from "./components/PlanDetailModal"
import { fetchPlans, type Plan, type CommonPlan, type StorePlan } from "../api/plans"

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState("common-plans")
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    const loadPlans = async () => {
      const fetchedPlans = await fetchPlans()
      setPlans(fetchedPlans)
    }
    loadPlans()
  }, [])

  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">プラン管理</h1>
        <Button onClick={() => console.log("新規プラン作成")}>
          <Plus className="mr-2 h-4 w-4" /> 新規プラン作成
        </Button>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="common-plans">全店舗プラン一覧</TabsTrigger>
          <TabsTrigger value="store-plans">特定店舗プラン一覧</TabsTrigger>
        </TabsList>
        <TabsContent value="common-plans" className="pt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">全店舗プラン一覧</h2>
              <p className="text-sm text-gray-600">
                全店舗に適用されるプランです。
                <br />
                適用したくない店舗には、プラン詳細画面から除外設定を行なって下さい。
              </p>
            </div>
            <div className="bg-white rounded-lg shadow">
              <CommonPlanList
                plans={plans.filter((plan): plan is CommonPlan => plan.type === "common")}
                onPlanClick={handlePlanClick}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="store-plans" className="pt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">特定店舗プラン一覧</h2>
              <p className="text-sm text-gray-600">指定した店舗にのみ適用されるプランです。</p>
            </div>
            <div className="bg-white rounded-lg shadow">
              <StorePlanList
                plans={plans.filter((plan): plan is StorePlan => plan.type === "store-specific")}
                onPlanClick={handlePlanClick}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <PlanDetailModal plan={selectedPlan} isOpen={!!selectedPlan} onClose={() => setSelectedPlan(null)} />
    </div>
  )
}

