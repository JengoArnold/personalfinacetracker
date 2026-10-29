import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to Your Dashboard
        </h1>

        <p className="mt-3 text-gray-600">
          You are signed in to your Personal Finance Tracker.
        </p>

        <p className="mt-2 text-gray-800">
          Signed in as: {session.user.email}
        </p>
      </div>
    </main>
  );
}