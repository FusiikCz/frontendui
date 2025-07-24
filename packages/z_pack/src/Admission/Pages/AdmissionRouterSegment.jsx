import { AdmissionURI } from "../Components/AdmissionLink"
import { AdmissionPage } from "./AdmissionPage"

/**
 * A router segment definition for the Admission page.
 */
export const AdmissionRouterSegment = {
    path: `/${AdmissionURI}/:id`,
    element: <AdmissionPage />
}