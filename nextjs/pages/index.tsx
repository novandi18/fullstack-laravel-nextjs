import Head from "next/head";
import HomePage from "./page";
import Layout from "@/components/layout/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Emkay Products</title>
        <meta
          name="description"
          content="Emkay Products"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Layout>
        <HomePage />
      </Layout>
    </>
  )
}