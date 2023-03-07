import { gql } from "@apollo/client"

const userFields = `
  id
  email
  fullName
  createdAt
  updatedAt
`

const tokenFields = `
  tokenType
  accessToken
  refreshToken
`

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      ${userFields}
    }
  }
`

export const SIGN_IN = gql`
  mutation signIn($data: SignInInput) {
    signIn(data: $data) {
      user {
        ${userFields}
      }
      token {
        ${tokenFields}
      }
    }
  }
`

export const SIGN_UP = gql`
  mutation signUp($data: SignUpInput) {
    signUp(data: $data) {
      user {
        ${userFields}
      }
      token {
        ${tokenFields}
      }
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      ${tokenFields}
    }
  }
`
