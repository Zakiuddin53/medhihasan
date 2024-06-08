import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler (req: any, res: any){
    const {method, query}= req;
    const{username, phone }= query;

    switch(method){
        case "GET":
            if (!username && !phone)
            return res.status(400).json({message:"required fields are missing"})
        try{
            const user = await prisma.user.findMany({
                where:{
                    OR:[
                        {username:{contains:username as string, mode:"insensitive"}},
                        {phone:{contains:phone as string, mode:"insensitive"}},
                    ],
                }
            });
            res.status (200).json(user);
        }catch(error){
            console.log(error);
            res.status(500).json({message:"no user search found"});

        }
        break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(400).end(`Method ${method} not Allowed`);

}}
