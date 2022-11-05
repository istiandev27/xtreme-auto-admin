import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';

type TypographyVariant =
  // Text
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  // Display
  | 'h6'
  | 'h5'
  | 'h4'
  | 'h3'
  | 'h2'
  | 'h1';

type TypographyWeightOption = 'regular' | 'medium' | 'semibold' | 'bold';

type TypographyWeightValue =
  | 'font-normal'
  | 'font-medium'
  | 'font-semibold'
  | 'font-bold';

const TypographyVariantClasses: Record<TypographyVariant, string> = {
  xs: 'text-xs',
  sm: classNames('text-xs md:text-sm'),
  md: classNames('text-sm lg:text-md'),
  lg: classNames('text-sm md:text-md lg:text-lg'),
  xl: classNames('text-sm md:text-md lg:text-lg xl:text-xl'),
  h6: classNames('text-md md:text-lg lg:text-xl xl:text-h6'),
  h5: classNames('text-lg md:text-xl lg:text-h6 xl:text-h5'),
  h4: classNames('text-xl md:text-h6 lg:text-h5 xl:text-h4'),
  h3: classNames('text-h6 md:text-h5 lg:text-h4 xl:text-h3'),
  h2: classNames('text-h5 md:text-h4 lg:text-h3 xl:text-h2'),
  h1: classNames('text-h4 md:text-h3 lg:text-h2 xl:text-h1'),
};

const TypographyWeightClasses: Record<
  TypographyWeightOption,
  TypographyWeightValue
> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export interface TypographyProps {
  as?: 'label';
  variant: TypographyVariant;
  customColor?: string;
  customWeight?: TypographyWeightOption;
  className?: string;
  children: string | React.ReactNode;
}

export const Typography: FC<TypographyProps> = ({
  as,
  variant,
  customColor,
  customWeight = 'regular',
  className,
  children,
}) => {
  const TypographyVariantClassName = TypographyVariantClasses[variant];
  const TypographyWeightClassName = TypographyWeightClasses[customWeight];

  // h1-h6 should have corresponding component
  // others should be p
  const isHeading = variant.startsWith('h');
  const Component =
    as || ((isHeading ? variant : 'p') as keyof JSX.IntrinsicElements);

  return (
    <Component
      className={classNames(
        TypographyVariantClassName,
        TypographyWeightClassName,
        className,
        {
          'tracking-tight': ['h1', 'h2', 'h3'].includes(variant),
          'text-black dark:text-white': !customColor,
        },
        customColor
      )}
    >
      {children}
    </Component>
  );
};
