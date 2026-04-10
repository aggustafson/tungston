import { generateIndexes } from '@/helpers/generateIndexes';
import { IGQLTextField } from '@/types/igql';
import {
  ComponentParams,
  ComponentRendering,
  Image,
  Link,
  Text,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { CommonStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  data: {
    datasource: {
      children: {
        results: Feature[];
      };
      title: IGQLTextField;
    };
  };
}

interface Feature {
  featureImage: { jsonValue: { value: { src: string; alt?: string } } };
  featureTitle: { jsonValue: { value: string } };
  featureDescription: { jsonValue: { value: string } };
  featureLink: { jsonValue: { value: { href: string } } };
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type FeatureWrapperProps = {
  props: FeaturesProps;
  children: React.ReactNode;
};

const FeatureWrapper = (wrapperProps: FeatureWrapperProps) => {
  const id = wrapperProps.props.params.RenderingIdentifier;
  const isTungstenCapabilities = wrapperProps.props.params.styles?.includes(
    CommonStyles.TungstenDarkCapabilities
  );

  return (
    <section
      className={clsx(
        wrapperProps.props.params.styles,
        isTungstenCapabilities && 'tungsten-navy-section'
      )}
      id={id ? id : undefined}
    >
      {wrapperProps.children}
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;
  const isTungstenCapabilities = props.params.styles?.includes(
    CommonStyles.TungstenDarkCapabilities
  );
  const featureSectionTitle = props.fields.data.datasource.title;

  return (
    <FeatureWrapper props={props}>
      <div
        className={clsx(
          'container grid grid-cols-1',
          isTungstenCapabilities
            ? 'gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20'
            : 'py-20 lg:grid-cols-[1fr_2fr] lg:gap-10'
        )}
      >
        <div
          className={clsx(isTungstenCapabilities ? 'mb-12 lg:col-span-5 lg:mb-0' : 'mb-20 lg:mb-0')}
        >
          <h2
            className={clsx(
              'inline-block max-w-md font-bold max-lg:text-[42px]',
              isTungstenCapabilities && 'max-w-lg text-white'
            )}
          >
            <Text field={featureSectionTitle.jsonValue} />
          </h2>
        </div>
        <div
          className={clsx(
            'grid gap-16 md:gap-8',
            isTungstenCapabilities
              ? 'grid-cols-1 md:grid-cols-2 lg:col-span-7 lg:grid-cols-2 lg:gap-6'
              : 'md:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const link = item.featureLink.jsonValue;
            return (
              <div
                className={clsx(
                  'flex flex-col',
                  isTungstenCapabilities &&
                    'tungsten-capability-card border-border/60 rounded-sm border bg-white p-6 shadow-sm'
                )}
                key={index}
              >
                <div
                  className={clsx(
                    'mb-5 text-2xl font-bold',
                    isTungstenCapabilities && 'text-primary text-lg md:text-xl'
                  )}
                >
                  <Text field={title} />
                </div>
                <div
                  className={clsx(
                    'text-foreground mb-3.5 flex-auto leading-7',
                    isTungstenCapabilities && 'text-foreground-light text-base'
                  )}
                >
                  <Text field={description} />
                </div>
                <div>
                  <Link field={link} className="arrow-btn text-sm font-semibold" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const ImageGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-9 md:grid-cols-2 lg:grid-cols-5">
        {results.map((item, index) => {
          const imageField = item?.featureImage.jsonValue;
          return (
            <div className="flex items-center justify-center py-9 lg:py-2" key={index}>
              {imageField && <Image field={imageField} className="max-h-20 object-contain" />}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ThreeColGridCentered = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container flex flex-col flex-wrap justify-evenly gap-20 md:flex-row lg:gap-20">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="flex flex-col items-center justify-start 2xl:w-80" key={index}>
              {/* Image */}
              <div className="border-border bg-accent/10 mb-7 flex h-20 w-20 items-center justify-center rounded-sm border">
                <Image field={image} />
              </div>
              {/* Title and Description */}
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2 leading-0.5">
                  <Text tag="h5" className="text-primary" field={title} />
                </div>
                <div className="text-foreground-light text-center">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const NumberedGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-24 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item?.featureTitle.jsonValue;
          const description = item?.featureDescription.jsonValue;
          return (
            <div
              className="group border-border bg-primary cursor-pointer rounded-sm border p-6 text-white shadow-sm transition-shadow hover:shadow-md"
              key={index}
            >
              {/* Generated Number */}
              <h1 className="mb-2 text-7xl leading-24 text-white/35 transition-colors group-hover:text-white/50">
                {generateIndexes(index)}
              </h1>
              {/* Title and Description */}
              <div>
                <div className="mb-4 text-2xl leading-8 font-bold text-white">
                  <Text field={title} />
                </div>
                <div className="leading-7 text-white/80 group-hover:text-white/90">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const FourColGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-20 py-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="grid grid-cols-[1fr_2fr] gap-2.5" key={index}>
              {/* Image */}
              <div className="flex items-center justify-center rounded-full">
                <Image field={image} />
              </div>
              {/* Title and Description */}
              <div className="flex flex-col justify-center">
                <div className="text-xl leading-9 font-bold">
                  <Text className="text-foreground" field={title} />
                </div>
                <div className="text-background-muted-light leading-8">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ImageCardGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="outline-non container grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div key={index}>
              <div className="border-border mb-7 aspect-4/3 w-full overflow-hidden rounded-sm border bg-white shadow-sm">
                <Image field={image} className="h-full w-full object-cover" />
              </div>

              <h6>
                <Text field={title} />
              </h6>

              <p className="text-foreground-muted mt-1 text-base md:text-lg">
                <Text field={description} />
              </p>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};
