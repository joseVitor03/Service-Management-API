export default interface IServices {
  id: number;
  clientId: number;
  carId: number;
  plate: string;
  carColor: string;
  totalService: number;
  date: string;
  paymentStatus: boolean;
  principalEmployeeId: number;
}
