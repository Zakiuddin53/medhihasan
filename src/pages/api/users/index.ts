import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserInput {
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
}

export default async function handler(req: any, res: any) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const userData: UserInput = req.body;

        if (!userData.username) {
          return res.status(400).json({ message: "Username is required." });
        }

        const newUser = await prisma.user.create({
          data: userData,
        });

        res.status(201).json(newUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user." });
      }
      break;
    case "GET":
      try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving users." });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
