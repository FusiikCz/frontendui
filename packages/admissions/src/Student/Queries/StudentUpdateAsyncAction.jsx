import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentUpdateMutation = createQueryStrLazy(
`
mutation StudentUpdateMutation($id: UUID!, $lastchange: DateTime!) {
  result: studentUpdate(
    student: {id: $id, lastchange: $lastchange}
  ) {
    ... on StudentGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StudentLarge
      }      
    }
    ...StudentLarge
  }
}
`, StudentLargeFragment)

export const StudentUpdateAsyncAction = createAsyncGraphQLAction(StudentUpdateMutation)