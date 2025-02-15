export interface Store {
  id: string
  name: string
  address: string
  phoneNumber: string
}

export interface StoreInput {
  name: string
  address: string
  phoneNumber: string
}

export interface PlanPrice {
  storeId: string
  price: number
}

export interface Plan {
  id: string
  name: string
  description: string
  duration: string
  prices: PlanPrice[]
}

export interface PlanInput {
  name: string
  description: string
  duration: string
  prices: PlanPrice[]
}

export interface Trainer {
  id: string
  name: string
  specialization: string
  availability: string[]
}

export interface TrainerInput {
  name: string
  specialization: string
  availability: string[]
}

