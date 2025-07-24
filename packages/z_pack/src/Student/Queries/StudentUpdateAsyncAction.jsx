import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentUpdateMutation = createQueryStrLazy(
`
mutation StudentUpdateMutation($id: UUID!, $lastchange: DateTime!, $userId: UUID, $programId: UUID, $stateId: UUID, $semesterNumber: Int) {
  result: studentUpdate(
    student: {id: $id, lastchange: $lastchange, userId: $userId, programId: $programId, stateId: $stateId, semesterNumber: $semesterNumber}
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