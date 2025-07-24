import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

const StudentInsertMutation = createQueryStrLazy(
`
mutation StudentInsertMutation($id: UUID, $name: String!) {
  result: studentInsert(
    student: {id: $id, name: $name}
  ) {
    __typename
    ... on InsertError {
      failed
      msg
      input
      __typename
    }
    ... on StudentGQLModel {
      id
      student {
        id
        name
        givenname
        surname
        fullname
        email
        valid
        __typename
      }
      __typename
    }
  }
}
`)

export const StudentInsertAsyncAction = createAsyncGraphQLAction(StudentInsertMutation)