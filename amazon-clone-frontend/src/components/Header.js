import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Header() {
  const items = useSelector(selectItems);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push('/')}
            src="/amazon_PNG11.png"
            width={150}
            height={40}
            style={{ objectFit: 'contain' }}
            className="cursor-pointer"
          />
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text "
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right */}
        <div className="flex items-center text-xs text-white space-x-6 mx-6 whitespace-nowrap">
          <div className="cursor-pointer link">
            <Link href="/maintenance" className="hover:underline">
              Sign In
            </Link>
            <Link href="/maintenance">
              <p className="font-extrabold md:text-sm">Account & Lists</p>
            </Link>
          </div>

          <div className="cursor-pointer link">
            <Link href="/maintenance">
              <p>Returns</p>
              <p className="font-extrabold md:text-sm">& Orders</p>
            </Link>
          </div>

          <div
            onClick={() => router.push('/checkout')}
            className="relative flex items-center cursor-pointer link"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Cart
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <Link href="/maintenance" className="link flex items-center">
          <MenuIcon className="h-6 mr-1" /> All
        </Link>
        <Link href="/maintenance" className="link">
          Prime Video
        </Link>
        <Link href="/maintenance" className="link">
          Amazon Business
        </Link>
        <Link href="/maintenance" className="link">
          Today's Deals
        </Link>
        <Link href="/maintenance" className="link hidden lg:inline-flex">
          Electronics
        </Link>
        <Link href="/maintenance" className="link hidden lg:inline-flex">
          Food & Grocery
        </Link>
        <Link href="/maintenance" className="link hidden lg:inline-flex">
          Prime
        </Link>
        <Link href="/maintenance" className="link hidden lg:inline-flex">
          Buy Again
        </Link>
        <Link href="/maintenance" className="link hidden lg:inline-flex">
          Shopper Toolkit
        </Link>
        <Link href="/maintenance" className="link hidden lg:inline-flex">
          Health & Personal Care
        </Link>
      </div>
    </header>
  );
}

export default Header;
