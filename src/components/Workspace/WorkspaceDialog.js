import React, { useCallback, useMemo } from "react"
import { useDispatch } from "react-redux"
import { Grid, makeStyles } from "@material-ui/core"
import { useFormik } from "formik"
import * as yup from "yup"
import { Dialog, TextField } from "@Components"
import {
  useQueryWithOnError,
  useLazyQueryWithOnError,
  useMutationWithOnError,
} from "@Hooks/apollo"
import {
  GET_WORKSPACE_BY_ID,
  CREATE_WORKSPACE,
  UPDATE_WORKSPACE,
  GET_WORKSPACE_SUBDOMAIN_SUGGESTION,
} from "@Graphql/workspace"
import { addLoadingData, removeLoadingData } from "@Redux/loading/actions"
import { debounce } from "@Helpers/common"
import { SAVE_LOADING_TEXT } from "@Constants/common"
import { ERROR_MESSAGES } from "@Constants/errors"
import { COLORS } from "@Constants/layout"

const useStyles = makeStyles({
  suggestionContainer: {
    marginTop: 6,
    color: COLORS.darkGreen,
  },
})

const WorkspaceDialog = ({ id, refetch, onClose }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const { data: workspaceData } = useQueryWithOnError(GET_WORKSPACE_BY_ID, {
    skip: !id,
    variables: { id },
    fetchPolicy: "no-cache",
  })
  const [getSuggestion, { data: subDomainSuggestionData }] = useLazyQueryWithOnError(
    GET_WORKSPACE_SUBDOMAIN_SUGGESTION,
  )
  const [createWorkspace] = useMutationWithOnError(CREATE_WORKSPACE)
  const [updateWorkspace] = useMutationWithOnError(UPDATE_WORKSPACE)

  const workspace = useMemo(
    () => workspaceData?.workspaceById || {},
    [workspaceData],
  )

  const subDomainSuggestion = useMemo(
    () => subDomainSuggestionData?.workspaceSubDomainSuggestion || "",
    [subDomainSuggestionData],
  )

  const getSubDomainSuggestion = useMemo(
    () => debounce(getSuggestion),
    [getSuggestion],
  )

  const onSubmit = useCallback(
    async ({ name, subDomain }) => {
      dispatch(
        addLoadingData({
          key: "saveWorkspace",
          text: SAVE_LOADING_TEXT,
          open: true,
        }),
      )

      const data = { name: name.trim(), subDomain: subDomain.trim() }

      if (id) {
        await updateWorkspace({
          variables: {
            id: +id,
            data,
          },
        })
      } else {
        await createWorkspace({
          variables: {
            data,
          },
        })
      }

      dispatch(removeLoadingData("saveWorkspace"))

      if (refetch instanceof Function) refetch()
      if (onClose instanceof Function) onClose()
    },
    [id, refetch, onClose, updateWorkspace, createWorkspace, dispatch],
  )

  const formik = useFormik({
    initialValues: {
      name: workspace.name || "",
      subDomain: workspace.subDomain || "",
    },
    validationSchema: yup.object({
      name: yup.string().required(ERROR_MESSAGES.fieldRequired),
      subDomain: yup.string().required(ERROR_MESSAGES.fieldRequired),
    }),
    onSubmit,
    enableReinitialize: true,
  })

  return (
    <Dialog
      onClose={onClose}
      onDefaultAction={formik.handleSubmit}
      title={!id ? "Create new workplace" : "Edit the workplace"}
      applySecondaryAction
      applyDefaultAction
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            value={formik.values.name}
            onChange={formik.handleChange}
            variant="outlined"
            id="name"
            name="name"
            label="Name"
            type="text"
            inputProps={{ maxLength: 60 }}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            required
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={formik.values.subDomain}
            onChange={(e) => {
              formik.handleChange(e)

              const trimedValue = e.target.value.trim()

              if (trimedValue) {
                getSubDomainSuggestion({
                  variables: { subDomain: trimedValue },
                })
              }
            }}
            variant="outlined"
            id="subDomain"
            name="subDomain"
            label="Subdomain"
            type="text"
            inputProps={{ maxLength: 255 }}
            error={formik.touched.subDomain && !!formik.errors.subDomain}
            helperText={formik.touched.subDomain && formik.errors.subDomain}
            fullWidth
            required
          />
          <div className={classes.suggestionContainer}>
            {subDomainSuggestion && <span>You can use - {subDomainSuggestion}</span>}
          </div>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default WorkspaceDialog
