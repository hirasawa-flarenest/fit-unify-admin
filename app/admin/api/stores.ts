import type { Store, StoreInput } from "./types"

export const mockStores: Store[] = [
  {
    id: "store1",
    name: "Fit Unify 東京本店",
    address: "東京都渋谷区神宮前1-1-1",
    phoneNumber: "03-1234-5678",
  },
  {
    id: "store2",
    name: "Fit Unify 大阪支店",
    address: "大阪府大阪市中央区心斎橋筋2-2-2",
    phoneNumber: "06-2345-6789",
  },
  {
    id: "store3",
    name: "Fit Unify 名古屋支店",
    address: "愛知県名古屋市中区栄3-3-3",
    phoneNumber: "052-3456-7890",
  },
  {
    id: "store4",
    name: "Fit Unify 福岡支店",
    address: "福岡県福岡市中央区天神4-4-4",
    phoneNumber: "092-4567-8901",
  },
  {
    id: "store5",
    name: "Fit Unify 札幌支店",
    address: "北海道札幌市中央区大通西5-5-5",
    phoneNumber: "011-5678-9012",
  },
  {
    id: "store6",
    name: "Fit Unify 仙台支店",
    address: "宮城県仙台市青葉区一番町6-6-6",
    phoneNumber: "022-6789-0123",
  },
  {
    id: "store7",
    name: "Fit Unify 横浜支店",
    address: "神奈川県横浜市西区みなとみらい7-7-7",
    phoneNumber: "045-7890-1234",
  },
  {
    id: "store8",
    name: "Fit Unify 神戸支店",
    address: "兵庫県神戸市中央区三宮町8-8-8",
    phoneNumber: "078-8901-2345",
  },
]

export async function fetchStores(): Promise<Store[]> {
  // 実際のAPIが実装されるまで、モックデータを返す
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockStores), 500) // 0.5秒の遅延を追加してAPIリクエストをシミュレート
  })
}

export async function createStore(storeData: StoreInput): Promise<Store> {
  // 実際のAPIが実装されるまで、モックデータに新しい店舗を追加
  return new Promise((resolve) => {
    setTimeout(() => {
      const newStore: Store = {
        id: (mockStores.length + 1).toString(),
        ...storeData,
      }
      mockStores.push(newStore)
      resolve(newStore)
    }, 500)
  })
}

