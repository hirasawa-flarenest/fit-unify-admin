import type { Trainer, TrainerInput } from "./types"

const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "山田太郎",
    specialization: "ウェイトトレーニング",
    availability: ["月曜日", "水曜日", "金曜日"],
  },
  {
    id: "2",
    name: "佐藤花子",
    specialization: "ヨガ",
    availability: ["火曜日", "木曜日", "土曜日"],
  },
  {
    id: "3",
    name: "鈴木一郎",
    specialization: "有酸素運動",
    availability: ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日"],
  },
]

export async function fetchTrainers(): Promise<Trainer[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTrainers), 500)
  })
}

export async function createTrainer(trainerData: TrainerInput): Promise<Trainer> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTrainer: Trainer = {
        id: (mockTrainers.length + 1).toString(),
        ...trainerData,
      }
      mockTrainers.push(newTrainer)
      resolve(newTrainer)
    }, 500)
  })
}

