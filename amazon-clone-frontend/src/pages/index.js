import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>

        <meta
          name="description"
          content="THIS IS A CLONE - NOT THE ACTUAL AMAZON WEBSITE Online shopping from the earth's biggest selection of books, magazines, music, DVDs, videos, electronics, computers, software, apparel & accessories, shoes, jewelry, tools & hardware, housewares, furniture, sporting goods, beauty & personal care, broadband & dsl, gourmet food & just about anything else."
        />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/product/`
  ).then((res) => res.json());

  return {
    props: {
      products,
    },
  };
}
