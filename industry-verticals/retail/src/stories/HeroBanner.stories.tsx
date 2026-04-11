import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as HeroBanner, TopContent } from '../components/hero-banner/HeroBanner';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { createTextField } from './helpers/createFields';
import clsx from 'clsx';
import { HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';

type StoryProps = ComponentProps<typeof HeroBanner> & {
  withPlaceholder?: boolean;
  reverseLayout?: boolean;
  withoutGradientOverlay?: boolean;
  screenLayer?: boolean;
};

const meta = {
  title: 'Page Content/Hero Banner',
  component: HeroBanner,
  tags: ['autodocs'],
  argTypes: {
    withoutGradientOverlay: {
      name: 'Without Gradient Overlay',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    screenLayer: {
      name: 'Screen Layer',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    reverseLayout: {
      name: 'Reverse Layout',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    withPlaceholder: {
      name: 'With Placeholder',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
  args: {
    withoutGradientOverlay: false,
    reverseLayout: false,
    withPlaceholder: false,
    screenLayer: false,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Hero Banner',
  params: baseParams,
  placeholders: {
    [`hero-banner-search-bar-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
  },
};

// Mock fields for the HeroBanner component
const createHeroBannerFields = () => ({
  Image: {
    value: {
      src: '/images/hero-home-reference.png',
      alt: 'Trusted AI-powered automation — product illustration',
      width: 1200,
      height: 900,
    },
  },
  Video: {
    value: {},
  },
  Title: createTextField('Trusted **AI-powered** automation'),
  Description: {
    value: `<div class="ck-content"><p>Purposeful AI, built for your business, making it the right AI for the right job at the right cost. Automation isn't just our middle name, it's been in our DNA for 40 years.</p></div>`,
  },
  CtaLink: {
    value: {
      linktype: '',
      id: '',
      anchor: '',
      querystring: '',
      target: '',
      class: '',
      text: '',
      title: '',
      href: '',
    },
  },
});

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: clsx(
        baseParams.styles,
        args.withoutGradientOverlay && HeroBannerStyles.HideGradientOverlay,
        args.screenLayer && HeroBannerStyles.ScreenLayer,
        args.reverseLayout && LayoutStyles.Reversed,
        args.withPlaceholder && HeroBannerStyles.WithPlaceholder
      ),
    };

    const fields = createHeroBannerFields();

    return <HeroBanner params={params} rendering={baseRendering} fields={fields} />;
  },
};

export const WithTopContent: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: clsx(
        baseParams.styles,
        args.withoutGradientOverlay && HeroBannerStyles.HideGradientOverlay,
        args.screenLayer && HeroBannerStyles.ScreenLayer,
        args.reverseLayout && LayoutStyles.Reversed,
        args.withPlaceholder && HeroBannerStyles.WithPlaceholder
      ),
    };

    const fields = createHeroBannerFields();

    return <TopContent params={params} rendering={baseRendering} fields={fields} />;
  },
};
