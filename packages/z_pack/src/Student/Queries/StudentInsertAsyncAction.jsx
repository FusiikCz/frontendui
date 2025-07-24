import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentInsertMutation = createQueryStrLazy(
`
mutation StudentInsertMutation($id: UUID, $userId: UUID, $programId: UUID, $stateId: UUID, $semesterNumber: Int) {
  result: studentInsert(
    student: {id: $id, userId: $userId, programId: $programId, stateId: $stateId, semesterNumber: $semesterNumber}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StudentLarge
  }
}
`,
    StudentLargeFragment)

export const StudentInsertAsyncAction = createAsyncGraphQLAction(StudentInsertMutation)