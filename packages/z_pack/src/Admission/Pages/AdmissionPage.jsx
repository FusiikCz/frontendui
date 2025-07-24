import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { AdmissionReadAsyncAction } from "../Queries/AdmissionReadAsyncAction"
import { AdmissionMediumContent } from "../Components/AdmissionMediumContent"

/**
 * A comprehensive admission page component that fetches and displays admission details.
 */
export const AdmissionPage = () => {
    const { id } = useParams()
    const [admission, setAdmission] = useState(null)
    const [isValidUUID, setIsValidUUID] = useState(true)
    
    const { loading, error, fetch: fetchAdmission } = useAsyncAction(
        AdmissionReadAsyncAction,
        {},
        { deferred: true }
    )

    // Validate UUID format
    const validateUUID = (uuid) => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    };

    useEffect(() => {
        if (id) {
            // Check if the ID is a valid UUID format
            if (!validateUUID(id)) {
                setIsValidUUID(false);
                return;
            }
            
            fetchAdmission({ id })
                .then((result) => {
                    console.log("Fetched admission:", result)
                    setAdmission(result)
                })
                .catch((err) => {
                    console.error("Error fetching admission:", err)
                })
        }
    }, [id, fetchAdmission])

    if (!isValidUUID) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">Invalid Admission ID Format</h4>
                    <p>The admission ID <code>{id}</code> is not a valid UUID format.</p>
                    <hr />
                    <p className="mb-0">
                        Admission IDs must be in UUID format like: <code>aef97215-8fa1-4595-9f98-c6be672a7809</code>
                    </p>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading admission details...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Error Loading Admission</h4>
                    <p>Failed to load admission with ID: <code>{id}</code></p>
                    <hr />
                    <p className="mb-0">
                        <strong>Error details:</strong> {error.message}
                        {error.message.includes("badly formed hexadecimal UUID string") && (
                            <div className="mt-2">
                                <p>This error occurs when the admission ID is not in the correct UUID format.</p>
                            </div>
                        )}
                    </p>
                </div>
            </div>
        )
    }

    if (!admission) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">Admission Not Found</h4>
                    <p>No admission found with ID: <code>{id}</code></p>
                    <hr />
                    <p className="mb-0">
                        This admission may not exist in the database, or there might be a connection issue with the GraphQL server.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <h1>Admission Details</h1>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Admission ID: {id}</h5>
                            <AdmissionMediumContent admission={admission}>
                                <div className="mt-3">
                                    <h6>Additional Information:</h6>
                                    <ul className="list-unstyled">
                                        <li><strong>Name:</strong> {admission.name || 'Not set'}</li>
                                        <li><strong>Name (EN):</strong> {admission.nameEn || 'Not set'}</li>
                                        <li><strong>Last Change:</strong> {admission.lastchange || 'Not available'}</li>
                                    </ul>
                                </div>
                            </AdmissionMediumContent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}