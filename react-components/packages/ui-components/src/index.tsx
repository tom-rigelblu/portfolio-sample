// Copyright rigélblu inc. All rights reserved.

// FIXME: use @ imports
// Assets
// REFAACTOR: add Svg as suffix
export { default as IconLeftArrow } from './assets/icons/arrow-left.svg';
export { default as IconRightArrow } from './assets/icons/arrow-right.svg';
export { default as IconUpArrow } from './assets/icons/arrow-up.svg';
export { default as IconCamera } from './assets/icons/camera.svg';
export { default as IconMicrophone } from './assets/icons/microphone.svg';
export { default as TypingBubbleSvg } from './assets/icons/typing-bubble.svg';

// Base
export * from './components/Base/Button';
export * from './components/Base/Checkbox';
export * from './components/Base/Copy';
export * from './components/Base/Icon';
export * from './components/Base/Image';
export * from './components/Base/InputText';
export * from './components/Base/InputTextArea';
export * from './components/Base/Link';
export * from './components/Base/OrderedList';
export * from './components/Base/Video';
export * from './components/Base/types';

// Custom
export * from './components/Custom/NavItem/BaseNavItem';
export * from './components/Custom/NavItem/NavItem';
export * from './components/Custom/NavItem/NavItemProps';

export * from './components/Custom/Card';
export * from './components/Custom/CheckboxList';
export * from './components/Custom/ConfirmPopupToast';
export * from './components/Custom/ConfirmVote';
export * from './components/Custom/FadeIn';
export * from './components/Custom/FeaturePreview';
export * from './components/Custom/FocusEffect';
export * from './components/Custom/Inplace';
export * from './components/Custom/InputAreaToolbar';
export * from './components/Custom/SpeechCaption';
export * from './components/Custom/Toolbar';
export * from './components/Custom/state';

// Hooks
export * from './hooks/routing';

// Layouts
export * from './components/Layouts/Bar/BarLayout';
export * from './components/Layouts/Bar/TitleBarLayout';

export * from './components/Layouts/MobileApp/AppLayout';
export * from './components/Layouts/MobileApp/ContentLayout';
export * from './components/Layouts/MobileApp/MixedLayouts';
export * from './components/Layouts/MobileApp/NavBarLayout';
export * from './components/Layouts/MobileApp/PaneLayouts';
export * from './components/Layouts/MobileApp/WithNavLayouts';
export * from './components/Layouts/MobileApp/state';

export * from './components/Layouts/Site/FooterLayout';
export * from './components/Layouts/Site/HeaderLayout';
export * from './components/Layouts/Site/SiteLayout';

export * from './components/Layouts/MainLayout';

// lib
export * from './lib/style-css';
