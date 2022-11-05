import classNames from "classnames";
import type { ButtonHTMLAttributes, FC } from "react";
import React from "react";
import { Typography } from "../Typography";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonSize = "sm" | "md" | "lg";
type ButtonState = "default" | "hover" | "focus" | "disabled";

const ButtonVariantClasses: Record<
  ButtonVariant,
  Record<ButtonState, string>
> = {
  primary: {
    default: classNames("bg-white shadow-lg"),
    hover: classNames("hover:bg-red-500 hover:text-white"),
    focus: classNames("focus:bg-red-500 focus:text-white"),
    disabled: classNames("bg-red-100 text-white"),
  },
  secondary: {
    default: classNames("bg-red-500 shadow-lg text-white"),
    hover: classNames("hover:bg-white hover:text-black"),
    focus: classNames("focus:bg-white focus:text-black"),
    disabled: classNames("bg-white textred-100"),
  },

  tertiary: {
    default: classNames("bg-red-500 shadow-lg text-white"),
    hover: "",
    focus: "",
    disabled: "",
  },
};

const ButtonSizeClasses: Record<ButtonSize, string> = {
  sm: classNames("h-8 px-7 text-xs"),
  md: classNames("h-9 px-10 text-sm"),
  lg: classNames("h-10 px-12 text-md"),
};

const ButtonIconSizeClasses: Record<ButtonSize, string> = {
  sm: classNames("h-9 w-9"),
  md: classNames("h-10 w-10"),
  lg: classNames("h-11 w-11"),
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactElement | React.ReactNode;
  className?: string;
  variant: ButtonVariant;
  size?: ButtonSize;
  LeadingIcon?: React.ReactElement;
  TrailingIcon?: React.ReactElement;
  IconOnly?: React.ReactElement;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant,
  size = "md",
  LeadingIcon,
  TrailingIcon,
  IconOnly,
  disabled,
  ...buttonProps
}) => {
  const ButtonVariantClassName = ButtonVariantClasses[variant];
  const ButtonIconSizeClassName = ButtonIconSizeClasses[size];

  return (
    <button
      {...buttonProps}
      className={classNames(
        "flex select-none items-center whitespace-nowrap rounded-md text-center duration-300 focus:outline-none",
        className,
        {
          [ButtonSizeClasses[size]]: !IconOnly,
          [classNames(ButtonIconSizeClassName, "items-center justify-center")]:
            IconOnly,
          [classNames(
            ButtonVariantClassName.default,
            ButtonVariantClassName.hover,
            ButtonVariantClassName.focus
          )]: !disabled,
          [classNames(ButtonVariantClassName.disabled, "cursor-not-allowed")]:
            disabled,
        }
      )}
    >
      {LeadingIcon ? (
        <LeadingIcon.type
          {...LeadingIcon.props}
          className={classNames(
            {
              "mr-2": size !== "lg",
              "mr-3": size === "lg",
            },
            LeadingIcon.props.className
          )}
        />
      ) : null}
      <span
        className={classNames("font-JacquesSB", {
          "mt-1": size === "sm",
          "mt-1.5": size === "md",
          "mt-[6px]": size === "lg",
        })}
      >
        {children}
      </span>
      {IconOnly ? (
        <IconOnly.type {...IconOnly.props} size={size === "lg" ? 24 : 20} />
      ) : null}
      {TrailingIcon ? (
        <TrailingIcon.type
          {...TrailingIcon.props}
          className={classNames({
            "ml-2": size !== "lg",
            "ml-3": size === "lg",
          })}
        />
      ) : null}
    </button>
  );
};
