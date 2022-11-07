import classNames from "classnames";
import type { FC } from "react";
import React from "react";

import { Typography } from "../../Typography";

export interface TextInputProps {
  type: "text" | "email";
  handleChange: (value: string) => void;
  label?: string;
  leadingText?: string;
  placeholder: string;
  error?: string;
  helperText?: string;
  LeadingIcon?: React.ReactElement;
  TrailingIcon?: React.ReactElement;
  disabled?: boolean;
  className?: string;
}

export const TextInput: FC<TextInputProps> = ({
  type,
  handleChange,
  label,
  leadingText,
  placeholder,
  error,
  helperText,
  LeadingIcon,
  TrailingIcon,
  disabled,
  className,
}) => {
  return (
    <>
      {label ? (
        <Typography
          as="label"
          variant="md"
          customWeight="medium"
          customColor="text-gray-700 dark:text-white"
          className="font-manjari mb-1.5"
        >
          {label}
        </Typography>
      ) : null}
      <div
        className={classNames("relative", {
          "flex items-center": leadingText,
        })}
      >
        <div className="pointer-events-none absolute flex h-11 w-full items-center justify-between rounded-lg px-3 shadow-sm">
          {LeadingIcon ? (
            <LeadingIcon.type className="h-5 w-5 text-gray-500" />
          ) : (
            <div />
          )}
          {TrailingIcon ? (
            <TrailingIcon.type
              className={classNames({
                "text-gray-400": !error,
                "text-error-500": error,
              })}
            />
          ) : null}
        </div>

        {leadingText ? (
          <div
            className={classNames(
              "font-manjari flex h-11 items-center rounded-l-lg border border-r-0 border-gray-300 pt-1.5 pl-3.5 pr-3 text-md text-gray-500 dark:border-gray-500",
              {
                "bg-gray-50 dark:bg-gray-700": disabled,
                "dark:bg-gray-800": !disabled,
              }
            )}
          >
            {leadingText}
          </div>
        ) : null}

        <input
          type={type}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (!disabled) {
              handleChange(event.target.value);
            }
          }}
          placeholder={placeholder}
          aria-label="input"
          className={classNames(
            "font-manjari flex h-11 w-full select-none items-center border pt-3 text-md text-gray-900 dark:text-white",
            {
              "pl-9": LeadingIcon,
              "pr-9": TrailingIcon,
              "rounded-l-0 rounded-r-lg": leadingText,
              "rounded-lg": !leadingText,
              "border-gray-300 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-100":
                !error,
              "border-error-300 focus:border-error-300 focus:ring-error-100 focus:ring-2":
                error,
              "bg-white dark:bg-gray-800": !disabled,
              "bg-gray-50 dark:bg-gray-700": disabled,
            },
            className
          )}
          disabled={disabled}
        />
      </div>

      {error ? (
        <div className="text-error-500 mt-1.5 text-sm">{error}</div>
      ) : null}

      {helperText ? (
        <div className="mt-1.5 text-sm text-gray-500">{helperText}</div>
      ) : null}
    </>
  );
};
