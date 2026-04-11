import { PRIMARY_CTA_CLASS } from '@/lib/cta-classes';
import { ComponentProps } from '@/lib/component-props';
import { CommonStyles } from '@/types/styleFlags';
import { Field, Link, LinkField, Placeholder, Text } from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';

interface Fields {
  Title: Field<string>;
  Link: LinkField;
}

interface SectionWrapperProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: SectionWrapperProps) => {
  const { styles, RenderingIdentifier: id } = params;
  const isTungstenCentered = styles?.includes(CommonStyles.TungstenSectionCentered);
  const placeholderKey = `section-wrapper-content-${params.DynamicPlaceholderId}`;

  return (
    <section
      className={clsx(
        'component section-wrapper pt-14 pb-10',
        styles,
        isTungstenCentered && 'bg-background'
      )}
      id={id}
    >
      <div
        className={clsx(
          'container flex flex-col',
          isTungstenCentered ? 'items-center text-center' : 'items-center'
        )}
      >
        <h2
          className={clsx(
            'max-w-4xl',
            isTungstenCentered
              ? 'text-foreground text-center'
              : 'text-primary text-center md:text-left'
          )}
        >
          <Text field={fields.Title} />
        </h2>

        <div className={clsx('mt-5 mb-12 w-full', isTungstenCentered && 'max-w-5xl')}>
          <Placeholder name={placeholderKey} rendering={rendering} />
        </div>

        <Link field={fields.Link} className={PRIMARY_CTA_CLASS} />
      </div>
    </section>
  );
};
