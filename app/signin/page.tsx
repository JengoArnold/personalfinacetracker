import { signIn } from "@/auth";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>

        <p className="mb-8 text-gray-600">
          Sign in to manage your personal finances.
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-800 transition hover:bg-gray-100"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Securely access your Personal Finance Tracker.
        </p>
      </div>
    </main>
  );
}