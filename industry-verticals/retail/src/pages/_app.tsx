import { JSX } from 'react';
import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import Bootstrap from 'src/Bootstrap';
import { SitecorePageProps } from '@sitecore-content-sdk/nextjs';
import scConfig from 'sitecore.config';
import 'assets/main.css';
import { Environment, PageController, WidgetsProvider } from '@sitecore-search/react';

const SEARCH_CONFIG = {
  env: process.env.NEXT_PUBLIC_SEARCH_ENV,
  customerKey: process.env.NEXT_PUBLIC_SEARCH_CUSTOMER_KEY,
  apiKey: process.env.NEXT_PUBLIC_SEARCH_API_KEY,
};

/** Sitecore Search WidgetsProvider requires a discover domain id; omit provider if Search is not fully configured. */
const DISCOVER_DOMAIN_ID = process.env.NEXT_PUBLIC_DISCOVER_DOMAIN_ID;
const isSearchWidgetsConfigured = Boolean(
  SEARCH_CONFIG.env && SEARCH_CONFIG.customerKey && SEARCH_CONFIG.apiKey && DISCOVER_DOMAIN_ID
);

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;
  const lang = pageProps.page?.locale || scConfig.defaultLanguage || 'en';

  PageController.getContext().setLocaleLanguage(lang.split('-')[0]);
  if (lang == 'en') {
    PageController.getContext().setLocaleCountry('us');
  } else {
    const region = lang.split('-')[1];
    if (region) {
      PageController.getContext().setLocaleCountry(region.toLowerCase());
    }
  }

  const pageContent = <Component {...rest} />;

  return (
    <>
      <Bootstrap {...pageProps} />
      {/*
        // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        // Note Next.js does not (currently) provide anything for translation, only i18n routing.
        // If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider
        lngDict={dictionary}
        locale={pageProps.page?.locale || scConfig.defaultLanguage}
      >
        {isSearchWidgetsConfigured ? (
          <WidgetsProvider
            env={SEARCH_CONFIG.env as Environment}
            customerKey={SEARCH_CONFIG.customerKey}
            apiKey={SEARCH_CONFIG.apiKey}
            discoverDomainId={DISCOVER_DOMAIN_ID}
            publicSuffix={true}
          >
            {pageContent}
          </WidgetsProvider>
        ) : (
          pageContent
        )}
      </I18nProvider>
    </>
  );
}

export default App;
