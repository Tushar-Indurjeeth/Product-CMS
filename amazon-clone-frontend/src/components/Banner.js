import { Carousel } from 'react-responsive-carousel';

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent z-20 bottom-0" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src="/0504-GatewayHerojpg.jpg" />
        </div>
        <div>
          <img
            loading="lazy"
            src="/UGRR_S1_GWBleedingHero_ENG_COVIDUPDATE.jpg"
          />
        </div>
        <div>
          <img loading="lazy" src="/UK-EN_030821_SpringSitewide_ACQ.jpg" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
