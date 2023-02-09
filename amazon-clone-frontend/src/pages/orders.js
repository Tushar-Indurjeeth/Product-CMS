// import moment from 'moment';
// import Order from '../components/Order';
import Header from '../components/Header';

function Orders() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      <Header />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        <h2>Please sign in to see your orders</h2>

        {/* <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div> */}
      </main>
    </div>
  );
}

export default Orders;
