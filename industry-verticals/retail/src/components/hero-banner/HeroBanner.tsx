import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

const HeroBannerCommon = ({
  params,
  fields,
  children,
}: HeroBannerProps & {
  children: React.ReactNode;
}) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles?.includes(HeroBannerStyles.HideGradientOverlay);

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div className={`component hero-banner ${styles} relative flex items-center`} id={id}>
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : (
          <>
            <ContentSdkImage
              field={fields.Image}
              className="h-full w-full object-cover md:object-bottom"
              priority
            />
          </>
        )}
        {/* Gradient overlay to fade image/video at bottom */}
        {!hideGradientOverlay && (
          <div className="to-background absolute inset-0 bg-gradient-to-b from-transparent from-75% via-white/70"></div>
        )}
      </div>

      {children}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const styles = params.styles || '';
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  /**
   * Split layout is the retail default (no CMS style required). Add `classic-full-bleed` to
   * rendering styles to restore the full-bleed background hero.
   */
  const useTungstenSplit = !!fields && !styles.includes(HeroBannerStyles.ClassicFullBleed);

  if (useTungstenSplit) {
    const isPageEditing = page.mode.isEditing;
    return (
      <section
        className={`component hero-banner ${styles} bg-background`}
        id={params.RenderingIdentifier}
      >
        <div className="container grid items-center gap-10 py-14 md:gap-14 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className={`max-w-xl ${reverseLayout ? 'lg:order-2 lg:justify-self-end' : ''}`}>
            <h1 className="text-foreground text-4xl leading-[1.1] font-bold tracking-tight md:text-5xl lg:text-[2.75rem] xl:text-6xl">
              <ContentSdkText field={fields.Title} />
            </h1>
            <div className="text-foreground-light [&_strong]:text-accent mt-6 text-lg leading-relaxed md:text-xl">
              <ContentSdkRichText field={fields.Description} />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 max-lg:justify-center lg:justify-start">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <Link
                  field={fields.CtaLink}
                  className="main-btn !w-auto min-w-44 rounded-sm px-10"
                />
              )}
            </div>
          </div>
          <div className={`relative flex justify-center ${reverseLayout ? 'lg:order-1' : ''}`}>
            <div className="relative w-full max-w-2xl overflow-hidden rounded-sm lg:max-w-none">
              {fields?.Video?.value?.src && !isPageEditing ? (
                <video
                  className="h-auto w-full object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={fields.Image?.value?.src}
                >
                  <source src={fields.Video?.value?.src} type="video/webm" />
                </video>
              ) : (
                <ContentSdkImage
                  field={fields.Image}
                  className="h-auto w-full object-contain"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-238 w-full py-10 lg:w-1/2 lg:items-center ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          >
            <div className="max-w-182">
              <div className={clsx({ shim: screenLayer })}>
                {/* Title */}
                <h1 className="text-center text-5xl leading-[110%] font-bold capitalize md:text-7xl md:leading-[130%] lg:text-left xl:text-[80px]">
                  <ContentSdkText field={fields.Title} />
                </h1>

                {/* Description */}
                <div className="mt-7 text-xl md:text-2xl">
                  <ContentSdkRichText
                    field={fields.Description}
                    className="text-center lg:text-left"
                  />
                </div>

                {/* CTA Link or Placeholder */}
                <div className="mt-6 flex w-full justify-center lg:justify-start">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link field={fields.CtaLink} className="arrow-btn" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto flex min-h-238 justify-center px-4">
          <div
            className={`flex flex-col items-center py-10 lg:py-44 ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            <div className={clsx({ shim: screenLayer })}>
              {/* Title */}
              <h1 className="text-primary text-center text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl md:leading-[1.12] xl:text-7xl">
                <ContentSdkText field={fields.Title} />
              </h1>

              {/* Description */}
              <div className="mt-7 text-xl md:text-2xl">
                <ContentSdkRichText field={fields.Description} className="text-center" />
              </div>

              {/* CTA Link or Placeholder */}
              <div className="mt-6 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="arrow-btn" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
