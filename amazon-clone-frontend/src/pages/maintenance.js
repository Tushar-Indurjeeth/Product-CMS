import Image from 'next/image';
import { useRouter } from 'next/router';

import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';

const Maintenance = () => {
  const router = useRouter();

  return (
    <center
      className="grid place-items-center h-screen"
      //   style={{ display: 'grid', placeItems: 'center', height: '85vh' }}
    >
      <div>
        {/* <div /> */}
        <Image fluid src="/under-maintenance.png" width={676} height={384} />
      </div>
      <div>
        <ArrowNarrowLeftIcon
          className=" h-24 w-24 md:h-36 md:w-36 cursor-pointer"
          onClick={() => router.push('/')}
        />
      </div>
    </center>
  );
};

export default Maintenance;
