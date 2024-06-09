"use client";
import { useAuth } from "@clerk/nextjs";
import Login from "./components/Login";
import { useRouter } from "next/navigation";

function Page() {
  const { userId, getToken } = useAuth();
  const router = useRouter();

  if (userId) {
    router.push("/dashboard");
  }

  return (
    <div className="h-screen" style={{ color: "white" }}>
      <Login />
    </div>
  );
}

export default Page;
