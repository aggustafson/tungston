export enum CommonStyles {
  /** Features Default: navy band + white 2×2 capability cards (platform section) */
  TungstenDarkCapabilities = 'tungsten-dark-capabilities',
  /** Section wrapper: centered heading + content block */
  TungstenSectionCentered = 'tungsten-section-centered',
}

export enum LayoutStyles {
  Reversed = 'reversed',
}

export enum PromoFlags {
  PromoReversed = 'promo-reversed',
  ShowMultipleImages = 'show-multiple-images',
  HidePromoShapes = 'hide-promo-shapes',
  HidePromoShadows = 'hide-promo-shadows',
  HidePromoQuotes = 'hide-promo-quotes',
  TungstenDarkPanel = 'tungsten-dark-panel',
}

export enum HeroBannerStyles {
  HideGradientOverlay = 'hide-gradient-overlay',
  WithPlaceholder = 'with-placeholder',
  ScreenLayer = 'screen-layer',
  /** White background, two-column text + image (Tungsten-style homepage hero) */
  TungstenSplit = 'tungsten-split',
  /** Full-bleed image hero with overlay (original Default layout). Omit from styles to use Tungsten split by default. */
  ClassicFullBleed = 'classic-full-bleed',
}
