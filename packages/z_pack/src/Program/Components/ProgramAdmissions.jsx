import { AdmissionLink } from "../../Admission/Components/AdmissionLink"
import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"

/**
 * A component that displays admissions for a specific program in a card format.
 * For now, it shows a placeholder with a link to test the admission functionality.
 * 
 * @component
 * @param {Object} props - The properties for the ProgramAdmissions component.
 * @param {Object} props.program - The program object containing the id.
 * @param {string} props.program.id - The unique identifier for the program.
 * 
 * @returns {JSX.Element} A component that displays admissions for the program in a card format.
 */
export const ProgramAdmissions = ({ program }) => {
    // For now, let's create two test admissions to demonstrate the functionality
    const testAdmissions = [
        {
            id: "test-admission-1",
            name: "Test Admission 1 for Program",
            nameEn: "Test Admission 1 for Program"
        },
        {
            id: "test-admission-2",
            name: "Test Admission 2 for Program", 
            nameEn: "Test Admission 2 for Program"
        }
    ]

    return (
        <CardCapsule title={<><PersonFill /> Admissions</>}>
            <div className="list-group">
                {testAdmissions.map(admission => (
                    <div key={admission.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <AdmissionLink admission={admission} />
                                <small className="text-muted d-block">
                                    State: Active
                                </small>
                            </div>
                            <div className="text-end">
                                <small className="text-muted">
                                    Application Period: 2024-01-01 - 2024-12-31
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="list-group-item">
                    <p className="text-muted mb-0">
                        <strong>Note:</strong> These are test admissions. Click on any admission name above to navigate to the admission detail page where you can access students.
                    </p>
                </div>
            </div>
        </CardCapsule>
    )
} 