import {
  ComponentParams,
  ComponentRendering,
  Image,
  ImageField,
  Link,
  LinkField,
  Placeholder,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  TitleFive: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps) => {
  // rendering item id
  const id = props.params.RenderingIdentifier;

  // placeholders keys
  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <Text field={props.fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <Text field={props.fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <Text field={props.fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
    {
      key: 'fourth_nav',
      title: <Text field={props.fields.TitleFour} />,
      content: <Placeholder name={phKeyFour} rendering={props.rendering} />,
    },
    {
      key: 'fifth_nav',
      title: <Text field={props.fields.TitleFive} />,
      content: <Placeholder name={phKeyFive} rendering={props.rendering} />,
    },
  ];

  return (
    <section
      className={`footer-site component footer relative ${props.params.styles} overflow-hidden text-white`}
      id={id}
    >
      <div className="bg-primary">
        <div className="container grid gap-14 py-16 md:gap-16 md:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,3fr)] lg:gap-12">
          <div className="flex max-w-md flex-col gap-6">
            <div className="max-w-48 [&_img]:h-auto [&_img]:max-h-11 [&_img]:w-auto">
              <Image field={props.fields.Logo} />
            </div>
            <div className="[&_a]:text-accent text-sm leading-relaxed text-white/85 [&_a]:underline-offset-4 hover:[&_a]:text-white">
              <RichText field={props.fields.Description} />
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5 lg:gap-6 xl:gap-10">
            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <div className="mb-5 text-sm font-semibold tracking-wide text-white">{title}</div>
                <div className="space-y-3 text-sm text-white/80 [&_a]:text-white/85 [&_a]:transition-colors hover:[&_a]:text-white">
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-primary-muted border-t border-white/10">
        <div className="container flex flex-col gap-6 py-8 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
          <div className="order-2 md:order-1">
            <Text field={props.fields.CopyrightText} />
          </div>
          <div className="order-1 flex flex-wrap items-center gap-6 md:order-2 md:gap-10">
            <Link
              field={props.fields.TermsText}
              className="text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            />
            <Link
              field={props.fields.PolicyText}
              className="text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
