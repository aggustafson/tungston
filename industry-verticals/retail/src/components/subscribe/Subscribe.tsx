import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Text, Field, RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { useI18n } from 'next-localization';

export type SubscribeBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields?: {
    Title: Field<string>;
    ConsentText?: RichTextField;
  };
};

export const Default = (props: SubscribeBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const { t } = useI18n();

  return (
    <section
      className={`component subscribe-banner group py-10 md:py-14 ${styles ?? ''}`}
      id={id || undefined}
    >
      <div className="container max-w-4xl md:max-w-5xl md:px-10">
        <div className="grid items-center gap-y-6 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
          {/* Headline */}
          <h2 className="text-foreground text-2xl leading-tight font-medium xl:text-3xl">
            <Text field={props.fields?.Title} />
          </h2>

          {/* Form */}
          <form className="w-full md:max-w-lg" action="">
            <label htmlFor="subscribe-email" className="sr-only">
              {t('your_email_label') || 'your@email.com'}
            </label>

            <div className="relative">
              <input
                id="subscribe-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder={t('your_email') || 'E.g. your@email.com'}
                className="bg-background ring-foreground/10 text-foreground placeholder:text-foreground/60 focus:border-accent/40 focus:ring-accent/30 h-12 w-full rounded-sm border border-transparent ps-5 pe-32 ring-1 focus:ring-2 focus:outline-none md:h-14"
              />

              <button
                type="submit"
                className="bg-primary group-[.container-dark-background]:bg-background group-[.container-dark-background]:text-primary text-background group-[.container-dark-background]:!text-foreground focus-visible:ring-accent absolute top-1/2 right-2 h-9 -translate-y-1/2 rounded-sm px-4 text-sm font-semibold transition-opacity hover:opacity-92 focus-visible:ring-2 focus-visible:outline-none md:right-3 md:h-10 md:px-5"
              >
                {t('button_text') || 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export const WithConsent = (props: SubscribeBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const uid = props.rendering.uid;
  const { t } = useI18n();

  return (
    <section className={`component subscribe-banner group ${styles ?? ''}`} id={id || undefined}>
      {/* Headline*/}
      <div className="max-w-sm">
        <div className="mb-6">
          <h2 className="text-foreground text-lg leading-tight font-medium xl:text-xl">
            <Text field={props.fields?.Title} />
          </h2>
        </div>

        <form className="w-full" action="">
          <label htmlFor={`subscribe-email-${uid}`} className="sr-only">
            {t('enter_email') || 'Enter your email'}
          </label>

          {/* Email and Submit Button */}
          <input
            id={`subscribe-email-${uid}`}
            type="email"
            inputMode="email"
            name="email"
            autoComplete="email"
            required
            placeholder={t('enter_email') || 'Enter your email'}
            className="bg-background text-foreground placeholder:text-foreground/60 ring-foreground/10 focus:border-accent/40 focus:ring-accent/30 h-12 w-full rounded-sm border border-transparent ps-5 pe-5 ring-1 focus:ring-2 focus:outline-none md:h-14"
          />

          <button
            type="submit"
            className="bg-primary group-[.container-dark-background]:bg-background group-[.container-dark-background]:text-primary text-background group-[.container-dark-background]:!text-foreground mt-3 inline-flex h-12 w-full items-center justify-center rounded-sm font-semibold tracking-wide transition-opacity hover:opacity-92 md:h-12"
          >
            {t('button_text') || 'Subscribe'}
          </button>

          {/* Consent text and Checkbox  */}
          {props.fields?.ConsentText && (
            <div className="mt-4 flex items-start gap-3">
              <input
                id="subscribe-consent"
                type="checkbox"
                className="border-foreground/30 bg-background accent-accent mt-1 size-4 rounded-sm border"
                required
              />
              <label htmlFor="subscribe-consent" className="text-foreground/70 text-sm leading-6">
                <RichText field={props.fields.ConsentText} />
              </label>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
