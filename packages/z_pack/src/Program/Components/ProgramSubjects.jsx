import { SubjectLink } from "../../Subject"
import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { BookFill } from "react-bootstrap-icons"

/**
 * A component that displays subjects for a specific program in a card format.
 * 
 * @component
 * @param {Object} props - The properties for the ProgramSubjects component.
 * @param {Object} props.program - The program object containing the id.
 * @param {string} props.program.id - The unique identifier for the program.
 * 
 * @returns {JSX.Element} A component that displays subjects for the program in a card format.
 */
export const ProgramSubjects = ({ program }) => {
    // For now, let's create some test subjects to demonstrate the functionality
    const testSubjects = [
        {
            id: "subject-1",
            name: "Teoretická matematika",
            nameEn: "Theoretical Mathematics"
        },
        {
            id: "subject-2", 
            name: "Aplikovaná matematika",
            nameEn: "Applied Mathematics"
        },
        {
            id: "subject-3",
            name: "Praktická matematika", 
            nameEn: "Practical Mathematics"
        },
        {
            id: "subject-4",
            name: "Obranná matematika",
            nameEn: "Defensive Mathematics"
        },
        {
            id: "subject-5",
            name: "Převratná matematika",
            nameEn: "Revolutionary Mathematics"
        },
        {
            id: "subject-6",
            name: "Klasická matematika",
            nameEn: "Classical Mathematics"
        },
        {
            id: "subject-7",
            name: "Královská matematika",
            nameEn: "Royal Mathematics"
        }
    ]

    return (
        <CardCapsule title={<><BookFill /> Subjects</>}>
            <div className="list-group">
                {testSubjects.map(subject => (
                    <div key={subject.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <SubjectLink subject={subject} />
                                <small className="text-muted d-block">
                                    Subject ID: {subject.id}
                                </small>
                            </div>
                            <div className="text-end">
                                <small className="text-muted">
                                    Credits: 6
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="list-group-item">
                    <p className="text-muted mb-0">
                        <strong>Note:</strong> These are test subjects. Click on any subject name above to navigate to the subject detail page.
                    </p>
                </div>
            </div>
        </CardCapsule>
    )
} 