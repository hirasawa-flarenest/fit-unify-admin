"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { fetchStores, type Store } from "../api/stores"
import { AddStoreForm } from "./components/AddStoreForm"
import { Label } from "@/components/ui/label"

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)

  const loadStores = async () => {
    const fetchedStores = await fetchStores()
    setStores(fetchedStores)
  }

  useEffect(() => {
    loadStores()
  }, [stores])

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStoreAdded = () => {
    setIsAddStoreOpen(false)
    loadStores()
  }

  const handleStoreDetails = (store: Store) => {
    setSelectedStore(store)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">店舗管理</h1>
      <div className="flex justify-between">
        <Input
          placeholder="店舗名または住所で検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog open={isAddStoreOpen} onOpenChange={setIsAddStoreOpen}>
          <DialogTrigger asChild>
            <Button>新規店舗追加</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規店舗の追加</DialogTitle>
            </DialogHeader>
            <AddStoreForm onStoreAdded={handleStoreAdded} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-bold">ID</TableHead>
            <TableHead className="font-bold">店舗名</TableHead>
            <TableHead className="font-bold">住所</TableHead>
            <TableHead className="font-bold">電話番号</TableHead>
            {/* <TableHead className="font-bold">操作</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStores.map((store, index) => (
            <TableRow
              key={store.id}
              className={`
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                hover:bg-gray-100 transition-colors
              `}
            >
              <TableCell>{store.id}</TableCell>
              <TableCell>
                <button className="text-blue-600 hover:underline" onClick={() => handleStoreDetails(store)}>
                  {store.name}
                </button>
              </TableCell>
              <TableCell>{store.address}</TableCell>
              <TableCell>{store.phoneNumber}</TableCell>
              {/* 操作カラムを削除 */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={!!selectedStore} onOpenChange={() => setSelectedStore(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedStore?.name} の詳細</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">ID</Label>
              <span className="col-span-3">{selectedStore?.id}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">店舗名</Label>
              <span className="col-span-3">{selectedStore?.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">住所</Label>
              <span className="col-span-3">{selectedStore?.address}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">電話番号</Label>
              <span className="col-span-3">{selectedStore?.phoneNumber}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

