"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandList, CommandInput } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"

interface FilterBarProps {
  stores: { id: string; name: string }[]
  trainers: { id: string; name: string }[]
  selectedStores: string[]
  selectedTrainers: string[]
  onStoreChange: (storeIds: string[]) => void
  onTrainerChange: (trainerIds: string[]) => void
}

export function FilterBar({
  stores,
  trainers,
  selectedStores,
  selectedTrainers,
  onStoreChange,
  onTrainerChange,
}: FilterBarProps) {
  const [openStore, setOpenStore] = useState(false)
  const [openTrainer, setOpenTrainer] = useState(false)

  return (
    <div className="flex items-center space-x-4">
      <Popover open={openStore} onOpenChange={setOpenStore}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={openStore} className="w-[200px] justify-between">
            {selectedStores.length > 0 ? `${selectedStores.length}店舗選択中` : "店舗を選択"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-0">
          <Command>
            <CommandInput placeholder="店舗を検索..." />
            <CommandList>
              <CommandEmpty>店舗が見つかりません</CommandEmpty>
              <CommandGroup>
                <div className="grid grid-cols-3 gap-2 p-2">
                  {stores.map((store) => (
                    <Card
                      key={store.id}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedStores.includes(store.id) ? "bg-green-100 hover:bg-green-200" : "hover:bg-blue-100",
                      )}
                      onClick={() => {
                        onStoreChange(
                          selectedStores.includes(store.id)
                            ? selectedStores.filter((id) => id !== store.id)
                            : [...selectedStores, store.id],
                        )
                      }}
                    >
                      <CardContent className="p-2 flex items-center justify-between">
                        <span>{store.name}</span>
                        <Check
                          className={cn("h-4 w-4", selectedStores.includes(store.id) ? "opacity-100" : "opacity-0")}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openTrainer} onOpenChange={setOpenTrainer}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={openTrainer} className="w-[200px] justify-between">
            {selectedTrainers.length > 0 ? `${selectedTrainers.length}トレーナー選択中` : "トレーナーを選択"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-0">
          <Command>
            <CommandInput placeholder="トレーナーを検索..." />
            <CommandList>
              <CommandEmpty>トレーナーが見つかりません</CommandEmpty>
              <CommandGroup>
                <div className="grid grid-cols-3 gap-2 p-2">
                  {trainers.map((trainer) => (
                    <Card
                      key={trainer.id}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedTrainers.includes(trainer.id) ? "bg-green-100 hover:bg-green-200" : "hover:bg-blue-100",
                      )}
                      onClick={() => {
                        onTrainerChange(
                          selectedTrainers.includes(trainer.id)
                            ? selectedTrainers.filter((id) => id !== trainer.id)
                            : [...selectedTrainers, trainer.id],
                        )
                      }}
                    >
                      <CardContent className="p-2 flex items-center justify-between">
                        <span>{trainer.name}</span>
                        <Check
                          className={cn("h-4 w-4", selectedTrainers.includes(trainer.id) ? "opacity-100" : "opacity-0")}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

