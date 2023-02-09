import Header from '../components/Header';
import Image from 'next/image';
import { selectItems, selectTotal } from '../slices/cartSlice';
import { useSelector } from 'react-redux';
import Currency from 'react-currency-formatter';
import CheckoutProduct from '../components/CheckoutProduct';

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/Prime-day-banner.png"
            width={1020}
            height={250}
            style={{ objectFit: 'contain' }}
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? 'Your Amazon Cart is empty.'
                : 'Shopping Cart'}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white shadow-sm p-10">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{' '}
                <span className="font-bold">
                  <Currency quantity={total} />
                </span>
              </h2>
              <button
                disabled
                role="link"
                s
                className={`button mt-2 from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed`}
              >
                Sign In to Checkout
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
