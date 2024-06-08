import { PrismaClient } from "@prisma/client";
import { UserInput } from "./types";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      if (!id) {
        return res.status(400).json({ message: "User ID is required." });
      }

      try {
        const user = await prisma.user.findUnique({
          where: { id: parseInt(id) },
        });

        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found." });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving user." });
      }
      break;

    case "PUT":
      if (!id) {
        return res
          .status(400)
          .json({ message: "User ID is required for update." });
      }

      try {
        const updateData: UserInput = req.body;

        // Check if the image field is present in the update data
        if (updateData.image === null) {
          // If the image field is explicitly set to null, delete the image
          updateData.image = undefined;
        }

        const updatedUser = await prisma.user.update({
          where: { id: parseInt(id) },
          data: updateData,
        });

        if (updatedUser) {
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ message: "User not found." });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user." });
      }
      break;

    case "DELETE":
      if (!id) {
        return res
          .status(400)
          .json({ message: "User ID is required for deletion." });
      }

      try {
        const deletedUser = await prisma.user.delete({
          where: { id: parseInt(id) },
        });

        if (deletedUser) {
          res.status(200).json({ message: "User deleted successfully." });
        } else {
          res.status(404).json({ message: "User not found." });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user." });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
