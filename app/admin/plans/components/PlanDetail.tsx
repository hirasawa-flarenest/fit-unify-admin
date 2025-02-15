import { useState } from "react"
import type { Plan, CommonPlan, StorePlan } from "../types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Edit, Copy, Trash, Plus } from "lucide-react"
import { mockStores } from "../../api/stores"

interface PlanDetailProps {
  plan: Plan
}

export function PlanDetail({ plan }: PlanDetailProps) {
  const isCommonPlan = plan.type === "common"
  const commonPlan = plan as CommonPlan
  const storePlan = plan as StorePlan

  const [selectedStore, setSelectedStore] = useState<string>("")
  const [customPrice, setCustomPrice] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "private":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStoreName = (storeId: string) => {
    const store = mockStores.find((store) => store.id === storeId)
    return store ? store.name : "Unknown Store"
  }

  const handlePriceUpdate = () => {
    // Implement price update logic here
    console.log(`Updated price for ${selectedStore}: ${customPrice}`)
  }

  // 店舗フィルタリング
  const filteredStores = mockStores.filter((store) => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="w-full ">
      {/* ヘッダー */}
      <CardHeader className="flex items-center justify-between border-b pb-4">
        <div>
          <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        </div>
        <Badge className={`${getStatusColor(plan.status)} rounded-full px-3 py-1 text-sm font-medium`}>
          {plan.status}
        </Badge>
      </CardHeader>

      {/* コンテンツ */}
      <CardContent className="space-y-8">
        {/* プラン概要・プラン詳細 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* プラン説明 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">プラン説明</h3>
            <p className="text-gray-600 leading-relaxed">
              {plan.description}
            </p>
          </div>

          {/* プラン詳細 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">プラン詳細</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              <dt className="text-sm font-medium text-gray-600">タイプ</dt>
              <dd className="text-sm text-gray-900">
                {isCommonPlan ? "全店舗共通" : "店舗特化型"}
              </dd>
              {isCommonPlan && (
                <>
                  <dt className="text-sm font-medium text-gray-600">デフォルト料金</dt>
                  <dd className="text-sm text-gray-900">
                    {commonPlan.defaultPrice.toLocaleString()}円
                  </dd>
                </>
              )}
            </dl>
          </div>
        </div>

        {/* カスタム料金 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">店舗別カスタム料金</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* 店舗検索 */}
            <div className="space-y-1">
              <Label htmlFor="store-search" className="text-sm font-medium text-gray-700">
                店舗検索
              </Label>
              <Input
                id="store-search"
                placeholder="店舗名を入力"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* 店舗選択 */}
            <div className="space-y-1">
              <Label htmlFor="store-select" className="text-sm font-medium text-gray-700">
                店舗選択
              </Label>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger id="store-select">
                  <SelectValue placeholder="店舗を選択" />
                </SelectTrigger>
                <SelectContent>
                  {filteredStores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* カスタム料金入力 */}
            <div className="space-y-1">
              <Label htmlFor="custom-price" className="text-sm font-medium text-gray-700">
                カスタム料金
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="custom-price"
                  type="number"
                  placeholder="料金"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-24"
                />
                <Button onClick={handlePriceUpdate}>
                  <Plus className="mr-2 h-4 w-4" />
                  追加
                </Button>
              </div>
            </div>
          </div>

          {/* ここで各店舗のカスタム料金一覧を表示するなどの処理を追加 */}
          {/* 例:
            <ul>
              {storePlanCustomPrices.map((custom) => (
                <li key={custom.storeId}>
                  {getStoreName(custom.storeId)}: {custom.price}円
                </li>
              ))}
            </ul>
          */}
        </div>

        {/* 適用外 or 対象店舗 */}
        {isCommonPlan && commonPlan.excludedStores.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">適用外店舗</h3>
            <ul className="list-inside list-disc text-sm text-gray-600">
              {commonPlan.excludedStores.map((storeId) => (
                <li key={storeId}>{getStoreName(storeId)}</li>
              ))}
            </ul>
          </div>
        )}

        {!isCommonPlan && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">対象店舗</h3>
            <ul className="list-inside list-disc text-sm text-gray-600">
              {storePlan.targetStores.map((storeId) => (
                <li key={storeId}>{getStoreName(storeId)}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      {/* フッター - アクションボタン */}
      <CardFooter className="flex justify-end space-x-4 pt-4">
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          編集
        </Button>
        <Button variant="outline">
          <Copy className="mr-2 h-4 w-4" />
          コピー
        </Button>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          削除
        </Button>
      </CardFooter>
    </Card>
  )
}

