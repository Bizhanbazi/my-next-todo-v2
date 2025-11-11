import Link from "next/link";

export default function About() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-2xl font-semibold mb-4">About Page</h1>
      <p>This is a simple Next.js app with multiple pages.</p>
      <Link href="/" className="text-blue-500 underline">Back to Home</Link>
    </main>
  );
}
