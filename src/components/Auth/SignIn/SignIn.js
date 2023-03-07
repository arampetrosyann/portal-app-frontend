import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Grid, makeStyles } from "@material-ui/core"
import { useFormik } from "formik"
import * as yup from "yup"
import { TextField, Button } from "@Components"
import { signIn } from "@Redux/user/thunks"
import { ERROR_MESSAGES } from "@Constants/errors"

const useStyles = makeStyles({
  container: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
  },
  form: {
    maxWidth: 600,
  },
  createAccountBtnContainer: {
    position: "absolute",
    right: 70,
    top: 40,
  },
})

const SignIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const classes = useStyles()

  const onSubmit = useCallback(
    ({ email, password }) => {
      dispatch(signIn({ email: email.trim(), password: password.trim() }))
    },
    [dispatch],
  )

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email(ERROR_MESSAGES.invalidEmail)
        .required(ERROR_MESSAGES.requiredEmail),
      password: yup.string().required(ERROR_MESSAGES.requiredPassword),
    }),
    onSubmit,
  })

  return (
    <div className={classes.container}>
      <span className={classes.createAccountBtnContainer}>
        <Button onClick={() => history.push("/sign-up")}>Create Account</Button>
      </span>
      <form
        action="/"
        method="POST"
        onSubmit={formik.handleSubmit}
        className={classes.form}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2 className={classes.header}>Sign In</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              variant="outlined"
              id="email"
              name="email"
              label="Email"
              type="email"
              inputProps={{ maxLength: 255 }}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              variant="outlined"
              id="password"
              name="password"
              label="Password"
              type="password"
              inputProps={{ maxLength: 20 }}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth>
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default SignIn
