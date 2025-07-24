import { StudentLink } from "../../Student"
import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"

/**
 * A component that displays students for a specific admission in a card format.
 * 
 * @component
 * @param {Object} props - The properties for the AdmissionStudents component.
 * @param {Object} props.admission - The admission object containing the id.
 * @param {string} props.admission.id - The unique identifier for the admission.
 * 
 * @returns {JSX.Element} A component that displays students for the admission in a card format.
 */
export const AdmissionStudents = ({ admission }) => {
    // For now, let's create some test students to demonstrate the functionality
    const testStudents = [
        {
            id: "student-1",
            name: "Jan Novák",
            nameEn: "Jan Novak",
            email: "jan.novak@example.com"
        },
        {
            id: "student-2", 
            name: "Marie Svobodová",
            nameEn: "Marie Svobodova",
            email: "marie.svobodova@example.com"
        },
        {
            id: "student-3",
            name: "Petr Černý", 
            nameEn: "Petr Cerny",
            email: "petr.cerny@example.com"
        },
        {
            id: "student-4",
            name: "Anna Veselá",
            nameEn: "Anna Vesela",
            email: "anna.vesela@example.com"
        },
        {
            id: "student-5",
            name: "Tomáš Malý",
            nameEn: "Tomas Maly",
            email: "tomas.maly@example.com"
        }
    ]

    return (
        <CardCapsule title={<><PersonFill /> Students</>}>
            <div className="list-group">
                {testStudents.map(student => (
                    <div key={student.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <StudentLink student={student} />
                                <small className="text-muted d-block">
                                    Email: {student.email}
                                </small>
                            </div>
                            <div className="text-end">
                                <small className="text-muted">
                                    Status: Applied
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="list-group-item">
                    <p className="text-muted mb-0">
                        <strong>Note:</strong> These are test students. Click on any student name above to navigate to the student detail page.
                    </p>
                </div>
            </div>
        </CardCapsule>
    )
} 