import React from "react"
import clsx from "clsx"
import { makeStyles, Paper } from "@material-ui/core"
import { Button } from "@Components"
import { COLORS } from "@Constants/layout"

const useStyles = makeStyles(
  {
    paper: {
      overflow: "hidden",
      backgroundColor: COLORS.white,
      boxShadow: "0px 0px 22px rgba(8, 35, 48, 0.12)",
      borderRadius: 15,
      flex: 1,
      width: "100%",
    },
    container: {
      width: "100%",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "stretch",
    },
    header: {
      display: "flex",
      borderBottom: `1px solid ${COLORS.lightGray}`,
      padding: "24px 16px",
      alignItems: "center",
    },
    actionsWrapper: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    title: {
      flex: 1,
      fontWeight: 500,
      fontSize: 20,
      lineHeight: "28px",
      color: COLORS.darkBlue,
      paddingRight: 10,
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
    headerExtra: {
      justifyContent: "space-between",
    },
    defaultActionButton: {
      marginLeft: 16,
      minWidth: 200,
      paddingRight: 24,
      paddingLeft: 24,
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
  { index: 1 },
)

const Step = React.forwardRef(
  (
    {
      className,
      headerActions,
      applyHeaderDefaultActions = true,
      headerDefaultActionText = "Create",
      defaultActionProps = {},
      onHeaderDefaultAction = () => {},
      title = "",
      children,
      bodyClassName,
    },
    ref,
  ) => {
    const classes = useStyles()

    return (
      <Paper ref={ref} className={clsx(classes.paper, className)}>
        <div className={classes.container}>
          <div className={clsx(classes.header, classes.headerExtra)}>
            {!!title && <div className={classes.title}>{title}</div>}
            <div className={classes.actionsWrapper}>
              {!!headerActions && headerActions}
              {applyHeaderDefaultActions && (
                <Button
                  classes={{
                    root: classes.defaultActionButton,
                  }}
                  onClick={onHeaderDefaultAction}
                  {...defaultActionProps}
                >
                  {headerDefaultActionText}
                </Button>
              )}
            </div>
          </div>
          <div className={clsx(classes.body, bodyClassName)}>{children}</div>
        </div>
      </Paper>
    )
  },
)

export default Step
