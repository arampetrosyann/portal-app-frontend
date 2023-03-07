import React from "react"
import { useSelector } from "react-redux"
import { selectSnackbar } from "@Redux/snackbar/selectors"
import SnackbarItem from "./SnackbarItem"

const Snackbar = () => {
  const snackbarData = useSelector(selectSnackbar)

  return (
    <span>
      {snackbarData.map(({ message, type, id }, i) => (
        <SnackbarItem key={id} message={message} type={type} id={id} index={i} />
      ))}
    </span>
  )
}

export default Snackbar
