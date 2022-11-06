export default interface CarInputs {
  title: string;
  make: string;
  year: number;
  description: string;
  finance: string;
  warranty: string;
  model: string;
  wheels: string;
  color: string;
  vehicleType: string;
  kilometers: string;
  exportStatus: string;
  specs: string;
  gearBox: string;
  fuel: string;
  seat: number;
  cylinder: number;
  interior: number;
  price: number;
  images: [];
  interiorDesigns: { name: string }[];
  exteriorDesigns: { name: string }[];
  securities: { name: string }[];
}
