import React from "react"
import clsx from "clsx"
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core"
import { X as XIcon, Save as SaveIcon } from "react-feather"
import { Button } from "@Components"
import { COLORS } from "@Constants/layout"

const useStyles = makeStyles({
  paper: {
    borderRadius: 8,
  },
  backdrop: {
    backgroundColor: `${COLORS.darkBlue}80`,
    backdropFilter: "blur(2px)",
  },
  title: {
    flex: 1,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: "28px",
    color: COLORS.darkBlue,
    paddingRight: 10,
  },
  dialogTitle: {
    position: "relative",
  },
  header: {
    display: "flex",
    borderBottom: `1px solid ${COLORS.lightGray}`,
    padding: 24,
    alignItems: "center",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    overflowY: "auto",
    overflowX: "hidden",
    flex: 1,
    position: "relative",
    scrollBehavior: "smooth",
  },
  footerActions: {
    padding: 24,
    display: "flex",
    justifyContent: "flex-end",
    borderTop: `1px solid ${COLORS.lightGray}`,
    borderRadius: "0 0 15px 15px",
  },
  closeIcon: {
    position: "absolute",
    right: 24,
    cursor: "pointer",
    top: 26,
  },
  spacing: {
    "& > :not(:first-child)": {
      marginLeft: 16,
    },
  },
})

const Dialog = React.forwardRef(
  (
    {
      onClose = () => {},
      closable = true,
      title = "",
      open = true,
      footerActions,
      applyDefaultAction = true,
      applySecondaryAction = false,
      onDefaultAction = () => {},
      defaultActionText = "Save",
      secondaryActionText = "Cancel",
      children,
      bodyClass = "",
      defaultActionIcon = <SaveIcon />,
      defaultActionProps = {},
      secondaryActionProps = {},
      maxWidth = "sm",
      ...restProps
    },
    ref,
  ) => {
    const classes = useStyles()

    return (
      <MuiDialog
        innerRef={ref}
        classes={{ paper: classes.paper }}
        BackdropProps={{
          classes: { root: classes.backdrop },
        }}
        maxWidth={maxWidth}
        open={open}
        onClose={onClose}
        fullWidth
        {...restProps}
      >
        <DialogTitle
          className={clsx(classes.dialogTitle, classes.header)}
          disableTypography
        >
          <div className={classes.title}>{title}</div>
          {closable && <XIcon className={classes.closeIcon} onClick={onClose} />}
        </DialogTitle>
        <DialogContent className={clsx(classes.body, bodyClass)}>
          {children}
        </DialogContent>
        <DialogActions
          className={classes.footerActions}
          classes={{ spacing: classes.spacing }}
        >
          {!!footerActions && footerActions}
          {applySecondaryAction && (
            <Button
              borderColor={COLORS.lightenGray}
              textColor={COLORS.darkBlue}
              bgColor={COLORS.lightenGray}
              fontWeight="medium"
              onClick={onClose}
              {...secondaryActionProps}
            >
              {secondaryActionText}
            </Button>
          )}
          {applyDefaultAction && (
            <Button
              onClick={onDefaultAction}
              fontWeight="medium"
              startIcon={defaultActionIcon}
              {...defaultActionProps}
            >
              {defaultActionText}
            </Button>
          )}
        </DialogActions>
      </MuiDialog>
    )
  },
)

export default Dialog
