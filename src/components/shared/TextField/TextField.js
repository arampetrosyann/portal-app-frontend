import React from "react"
import clsx from "clsx"
import {
  FormControl,
  TextField as MuiTextField,
  makeStyles,
} from "@material-ui/core"
import { COLORS } from "@Constants/layout"

const useStyles = makeStyles({
  labelBox: {
    display: "flex",
    alignItems: "center",
  },
  fieldLabel: ({ disabled }) => ({
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "22px",
    color: COLORS.darkBlue,
    opacity: disabled ? 0.4 : 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }),
  fieldLabelError: {
    color: COLORS.errorColor,
  },
  helperTextRoot: {
    margin: 0,
  },
})

const TextField = React.forwardRef(
  (
    {
      label = "",
      disabled = false,
      className = "",
      onChange = () => {},
      value = "",
      formControlClassName = "",
      fieldLabelClassName = "",
      formControlStyle = {},
      helperText = "",
      error = false,
      ...restProps
    },
    ref,
  ) => {
    const classes = useStyles({ value })

    return (
      <FormControl
        className={formControlClassName}
        style={formControlStyle}
        fullWidth={restProps.fullWidth}
        disabled={disabled}
        error={!!error}
      >
        {!!label && (
          <div className={classes.labelBox}>
            <span
              className={clsx(classes.fieldLabel, {
                [classes.fieldLabelError]: !!error,
                [fieldLabelClassName]: fieldLabelClassName,
              })}
            >
              {label}
            </span>
          </div>
        )}
        <MuiTextField
          value={value}
          className={className}
          onChange={onChange}
          ref={ref}
          disabled={disabled}
          variant="outlined"
          size="small"
          helperText={helperText}
          error={!!error}
          inputProps={{
            required: false,
            ...restProps.inputProps,
          }}
          FormHelperTextProps={{
            classes: { root: classes.helperTextRoot },
          }}
          {...restProps}
        />
      </FormControl>
    )
  },
)

export default TextField
