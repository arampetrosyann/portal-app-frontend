import React from "react"
import { makeStyles, CircularProgress } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    position: ({ fullScreen }) => (fullScreen ? "fixed" : "absolute"),
    display: "flex",
    zIndex: theme.zIndex.drawer + 120,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    cursor: "default",
    flexDirection: "column",
    backdropFilter: "blur(2px)",
    backgroundColor: "rgba(250, 251, 255, 0.3)",
    fontSize: 20,
    fontWeight: 500,
  },
}))

const CircularLoading = React.forwardRef(
  ({ fullScreen = true, text = "Please wait...", open = false }, ref) => {
    const classes = useStyles({ fullScreen })

    if (!open) return null

    return (
      <div
        ref={ref}
        className={classes.root}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CircularProgress />
        {text}
      </div>
    )
  },
)

export default CircularLoading
