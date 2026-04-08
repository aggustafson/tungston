import { Field, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { isParamEnabled } from '@/helpers/isParamEnabled';

interface OfferFields {
  id: string;
  displayName: string;
  name: string;
  url: string;
  fields: {
    OfferText: Field<string>;
  };
}

interface OfferProps extends ComponentProps {
  fields: {
    Offers: OfferFields[];
  };
}

const autoPlayDelay = 5000;

export const Default = (props: OfferProps) => {
  const { page } = useSitecore();

  const id = props.params.RenderingIdentifier;
  const uid = props.rendering.uid;
  const datasource = props.fields?.Offers || [];
  const styles = `${props.params.styles || ''}`.trim();
  const autoPlay = isParamEnabled(props.params.Autoplay);

  if (!datasource.length) {
    return page.mode.isEditing ? (
      <div className={`component offers ${styles}`} id={id}>
        [OFFERS]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component offers bg-cta text-white ${styles}`}
      id={id}
      role="region"
      aria-label="Announcements"
    >
      <div className="mx-auto flex w-full max-w-4xl items-center justify-center gap-4 px-4 py-3 md:gap-6 md:py-3.5">
        <button
          type="button"
          className={`swiper-btn-prev-${uid} text-white/90 hover:text-white disabled:opacity-40`}
          name="previous-offer"
          aria-label="Previous offer"
        >
          <ChevronLeft className="size-5 md:size-6" />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: `.swiper-btn-prev-${uid}`,
            nextEl: `.swiper-btn-next-${uid}`,
            disabledClass: 'pointer-events-none opacity-50',
          }}
          slidesPerView={1}
          centeredSlides
          noSwiping
          noSwipingClass="no-swiping"
          loop={true}
          autoplay={
            autoPlay
              ? {
                  delay: autoPlayDelay,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          autoHeight
          className="mx-0! w-full transition-all"
        >
          {datasource.map((offer) => (
            <SwiperSlide
              key={offer.id}
              className="no-swiping px-2 text-center text-sm font-medium md:text-base"
            >
              <Text field={offer.fields.OfferText} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className={`swiper-btn-next-${uid} text-white/90 hover:text-white disabled:opacity-40`}
          name="next-offer"
          aria-label="Next offer"
        >
          <ChevronRight className="size-5 md:size-6" />
        </button>
      </div>
    </div>
  );
};
