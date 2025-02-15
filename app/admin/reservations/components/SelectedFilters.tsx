import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SelectedFiltersProps {
  selectedStores: string[]
  selectedTrainers: string[]
  stores: { id: string; name: string }[]
  trainers: { id: string; name: string }[]
  onRemoveStore: (storeId: string) => void
  onRemoveTrainer: (trainerId: string) => void
  onClearAll: () => void
}

export function SelectedFilters({
  selectedStores,
  selectedTrainers,
  stores,
  trainers,
  onRemoveStore,
  onRemoveTrainer,
  onClearAll,
}: SelectedFiltersProps) {
  if (selectedStores.length === 0 && selectedTrainers.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {selectedStores.map((storeId) => {
        const store = stores.find((s) => s.id === storeId)
        return (
          <Badge key={storeId} variant="secondary" className="px-2 py-1 bg-blue-100 text-blue-800">
            {store?.name}
            <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => onRemoveStore(storeId)}>
              <X size={14} />
            </button>
          </Badge>
        )
      })}
      {selectedTrainers.map((trainerId) => {
        const trainer = trainers.find((t) => t.id === trainerId)
        return (
          <Badge key={trainerId} variant="secondary" className="px-2 py-1 bg-green-100 text-green-800">
            {trainer?.name}
            <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => onRemoveTrainer(trainerId)}>
              <X size={14} />
            </button>
          </Badge>
        )
      })}
      {(selectedStores.length > 0 || selectedTrainers.length > 0) && (
        <Button variant="outline" size="sm" onClick={onClearAll} className="ml-2">
          全てクリア
        </Button>
      )}
    </div>
  )
}

