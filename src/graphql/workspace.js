import { gql } from "@apollo/client"

const workspaceFields = `
    id
    name
    subDomain
    userId
    createdAt
    updatedAt
`

export const GET_WORKSPACE_BY_ID = gql`
  query workspaceById($id: Int!) {
    workspaceById(id: $id) {
      ${workspaceFields}
    }
  }
`

export const GET_WORKSPACES = gql`
  query workspaces {
    workspaces {
      count
      data {
        ${workspaceFields}
      }
    }
  }
`

export const GET_WORKSPACE_SUBDOMAIN_SUGGESTION = gql`
  query workspaceSubDomainSuggestion($subDomain: String!) {
    workspaceSubDomainSuggestion(subDomain: $subDomain)
  }
`

export const CREATE_WORKSPACE = gql`
  mutation createWorkspace($data: CreateWorkspaceInput!) {
    createWorkspace(data: $data) {
      ${workspaceFields}
    }
  }
`

export const UPDATE_WORKSPACE = gql`
  mutation updateWorkspace(
    $id: Int!
    $data: UpdateWorkspaceInput!
  ) {
    updateWorkspace(id: $id, data: $data) {
      ${workspaceFields}
    }
  }
`

export const DELETE_WORKSPACE = gql`
  mutation deleteWorkspace($id: Int!) {
    deleteWorkspace(id: $id)
  }
`
