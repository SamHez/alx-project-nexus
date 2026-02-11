import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Head>
        <title>FilmFlux</title>
        <meta name="description" content="Movie Recommendation App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-center">
        <h1 className="text-4xl font-bold">Welcome to FilmFlux</h1>
        <p className="mt-4 text-xl">Your AI-powered movie recommendation hub.</p>
      </main>
    </div>
  );
}
