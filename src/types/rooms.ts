export interface Owner {
    firstName: string
    lastName: string
}

export interface Workspace {
    _id: string
    name: string
    ownerId: Owner
}

export interface Room {
    _id?: string
    name?: string
    capacity?: number
    pricePerHour?: number
    availableSeats?: number
    availabilityStatus?: "available" | "unavailable" | "occupied"
    type?: "personal" | "meeting" | "shared"
    workspaceId?: string
    amenities?: string[]
    __v?: number
    createdAt?: string
    updatedAt?: string
    images?: string[]
    isBooked?: boolean
    duration?: number
}
