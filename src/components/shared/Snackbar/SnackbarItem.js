import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { makeStyles, Snackbar } from "@material-ui/core"
import { COLORS } from "@Constants/layout"
import { removeSnackbarItem } from "@Redux/snackbar/actions"
import { SNACKBAR_TYPE } from "@Constants/common"
import { SNACKBAR_HEIGHT } from "@Constants/layout"

const useStyles = makeStyles({
  root: {
    backgroundColor: ({ type }) => {
      switch (type) {
        case SNACKBAR_TYPE.success: {
          return COLORS.lightGreen
        }
        case SNACKBAR_TYPE.error: {
          return COLORS.lightRed
        }
        default: {
          return COLORS.lightGreen
        }
      }
    },
    borderColor: ({ type }) => {
      switch (type) {
        case SNACKBAR_TYPE.success: {
          return COLORS.darkGreen
        }
        case SNACKBAR_TYPE.error: {
          return COLORS.darkRed
        }
        default: {
          return COLORS.darkGreen
        }
      }
    },
    bottom: ({ index }) => index * SNACKBAR_HEIGHT + 24 + index * 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 15,
    boxShadow: "0px 6px 18px rgba(8, 35, 48, 0.12)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 12px",
    height: SNACKBAR_HEIGHT,
    width: 436,
    boxSizing: "border-box",
  },
})

const SnackbarItem = React.forwardRef(({ message, id, ...restProps }, ref) => {
  const dispatch = useDispatch()

  const classes = useStyles(restProps)

  const handleClose = useCallback(
    (e, reason) => {
      if (reason !== "clickaway") {
        dispatch(removeSnackbarItem(id))
      }
    },
    [id, dispatch],
  )

  return (
    <Snackbar
      ref={ref}
      transitionDuration={0}
      className={classes.root}
      open={!!message}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
    >
      <div className={classes.snackbarMessage}>{message}</div>
    </Snackbar>
  )
})

export default SnackbarItem
