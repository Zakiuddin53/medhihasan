export type UserInput = {
  username: string;
  email?: string;
  image?: string;

  // Personal Information
  phone?: string;
  address?: string;

  // Sherwani Measurement
  sherwaniLength?: number;
  sherwaniChest?: number;
  sherwaniBlowChest?: number;
  sherwaniWaist?: number;
  sherwaniHip?: number;
  sherwaniSleeve?: number;
  sherwaniNeck?: number;
  sherwaniShoulder?: number;
  sherwaniCap?: number;
  sherwaniFullHeight?: number;

  // Trozen or Pajama Measurement
  trozenLength?: number;
  trozenMohri?: number;

  // Coat Measurement
  coatLength?: number;
  coatChest?: number;
  coatBlowChest?: number;
  coatWaist?: number;
  coatHip?: number;
  coatSleeve?: number;
  coatNeck?: number;
  coatShoulder?: number;
  coatCap?: number;
  coatFullHeight?: number;

  // Pant Measurement
  pantLength?: number;
  pantWaist?: number;
  pantThigh?: number;
  pantBottom?: number;
};
