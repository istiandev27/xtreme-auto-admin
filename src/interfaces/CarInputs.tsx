export default interface CarInputs {
  make: string;
  year: number;
  description: string;
  finance: string;
  warranty: string;
  model: string;
  wheels: string;
  color: string;
  vehicleType: string;
  kilometers: number;
  exportStatus: string;
  specs: string;
  gearBox: string;
  fuel: string;
  seat: number;
  cylinder: string;
  interior: string;
  price: number;
  imageCover: string;
  images: [];
  interiorDesigns: { name: string }[];
  exteriorDesigns: { name: string }[];
  securities: { name: string }[];
  onSale: boolean;
  onFeatured: boolean;
  steeringSide: string;
}
