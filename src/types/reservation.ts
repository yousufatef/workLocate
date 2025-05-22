export interface IReservation {
  _id: string;
  roomId: string;
  customerId: string;
  seatsBooked: number;
  startTime: string;
  endTime: string;
  duration: number;
  expectedArrivalTime: string;
  status: 'confirmed' | 'pending' | 'cancelled' | string;
  totalPrice: number;
  __v: number;
}