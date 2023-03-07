import React from "react"
import clsx from "clsx"
import { Button as MuiButton, makeStyles } from "@material-ui/core"
import { COLORS, BUTTON_SIZES } from "@Constants/layout"

const useStyles = makeStyles({
  root: ({ borderRadius, bgColor, borderWidth, borderColor, size, padding }) => ({
    borderRadius,
    backgroundColor: bgColor,
    borderWidth,
    borderStyle: "solid",
    borderColor,
    "&:hover": {
      backgroundColor: bgColor,
      boxShadow: "none",
    },
    padding:
      padding ||
      (size === BUTTON_SIZES.small
        ? "3px 14px"
        : size === BUTTON_SIZES.large
        ? "15px 32px"
        : "7px 16px"),
    boxSizing: "border-box",
    boxShadow: "none",
    lineHeight: "24px",
    minWidth: 0,
  }),
  label: {
    textTransform: "none",
    color: ({ textColor }) => textColor,
    fontSize: ({ fontSize }) => fontSize,
    fontWeight: ({ fontWeight }) => fontWeight,
  },
  startIcon: {
    marginRight: 2,
  },
})

const Button = React.forwardRef(
  (
    {
      bgColor = COLORS.lightBlue,
      borderColor = COLORS.lightBlue,
      borderWidth = 1,
      textColor = COLORS.white,
      fontSize = 14,
      fontWeight = 400,
      borderRadius = 5,
      size = BUTTON_SIZES.medium,
      children,
      disableRipple = false,
      variant = "contained",
      className = "",
      classes: classesProp = {},
      padding,
      ...restProps
    },
    ref,
  ) => {
    const classes = useStyles({
      bgColor,
      borderColor,
      borderWidth,
      textColor,
      fontSize,
      fontWeight,
      borderRadius,
      size,
      padding,
    })

    return (
      <MuiButton
        classes={{
          label: classes.label,
          startIcon: classes.startIcon,
          ...classesProp,
        }}
        disableRipple={disableRipple}
        ref={ref}
        className={clsx(classes.root, className)}
        variant={variant}
        {...restProps}
      >
        {children}
      </MuiButton>
    )
  },
)

export default Button
