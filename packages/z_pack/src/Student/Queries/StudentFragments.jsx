import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const StudentLinkFragment = createQueryStrLazy(
`
fragment StudentLink on StudentGQLModel {
  __typename
  id
  myId
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  userId
  programId
  stateId
  semesterNumber
}
`)

export const StudentMediumFragment = createQueryStrLazy(
`
fragment StudentMedium on StudentGQLModel {
  ...StudentLink
  student {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    givenname
    middlename
    email
    firstname
    surname
    valid
    startdate
    enddate
    typeId
    isThisMe
    gdpr
    fullname
  }
}
`, StudentLinkFragment)

export const StudentLargeFragment = createQueryStrLazy(
`
fragment StudentLarge on StudentGQLModel {
  ...StudentMedium
}
`, StudentMediumFragment)
  