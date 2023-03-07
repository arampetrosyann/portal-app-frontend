import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { Edit as EditIcon, Delete as DeleteIcon } from "react-feather"
import { makeStyles } from "@material-ui/core"
import { Step, Table } from "@Components"
import { useQueryWithOnError, useMutationWithOnError } from "@Hooks/apollo"
import { GET_WORKSPACES, DELETE_WORKSPACE } from "@Graphql/workspace"
import { addLoadingData, removeLoadingData } from "@Redux/loading/actions"
import { FETCH_LOADING_TEXT } from "@Constants/common"
import WorkspaceDialog from "./WorkspaceDialog"

const useStyles = makeStyles({
  step: {
    padding: 16,
  },
  icon: {
    cursor: "pointer",
  },
})

const WorkspacesList = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [dialogData, setDialogData] = useState(null)

  const {
    refetch,
    data: workspacesData,
    loading: workspacesLoading,
  } = useQueryWithOnError(GET_WORKSPACES, {
    fetchPolicy: "no-cache",
  })
  const [deleteWorkspace, { loading: deleteWorkspaceLoading }] =
    useMutationWithOnError(DELETE_WORKSPACE)

  const workspaces = useMemo(
    () => workspacesData?.workspaces?.data || [],
    [workspacesData],
  )

  const tableColumns = useMemo(
    () => [
      {
        id: "id",
        title: "Id",
        field: "id",
      },
      {
        id: "name",
        title: "Name",
        field: "name",
      },
      {
        id: "subDomain",
        title: "Subdomain",
        field: "subDomain",
      },
      {
        id: "edit",
        cellStyle: {
          width: 48,
        },
        cellRenderer: ({ id }) => (
          <span onClick={() => setDialogData({ id })} className={classes.icon}>
            <EditIcon />
          </span>
        ),
      },
      {
        id: "delete",
        cellStyle: {
          width: 48,
        },
        cellRenderer: ({ id }) => (
          <span
            onClick={async () => {
              await deleteWorkspace({ variables: { id } })
              refetch()
            }}
            className={classes.icon}
          >
            <DeleteIcon />
          </span>
        ),
      },
    ],
    [classes, deleteWorkspace, refetch],
  )

  const handleDialogClose = useCallback(() => setDialogData(null), [])
  const handleStepDefaultAction = useCallback(() => setDialogData({ id: null }), [])

  useEffect(() => {
    if (workspacesLoading || deleteWorkspaceLoading) {
      dispatch(
        addLoadingData({
          key: "workspaces",
          text: FETCH_LOADING_TEXT,
          open: true,
        }),
      )
    } else {
      dispatch(removeLoadingData("workspaces"))
    }
  }, [workspacesLoading, deleteWorkspaceLoading, dispatch])

  return (
    <Step
      title="Workspaces"
      className={classes.step}
      onHeaderDefaultAction={handleStepDefaultAction}
    >
      <Table columns={tableColumns} rowData={workspaces} />
      {dialogData && (
        <WorkspaceDialog
          id={dialogData.id}
          refetch={refetch}
          onClose={handleDialogClose}
        />
      )}
    </Step>
  )
}

export default WorkspacesList
