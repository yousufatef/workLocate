
export interface IWorkspace {
    _id: string,
    name: string,
    location: string,
    address: string,
    description: string,
    averageRating: number,
    amenities: string[],
    roomCounter: number,
    ownerId: string,
    reviews: string[],
    image: string,
}

