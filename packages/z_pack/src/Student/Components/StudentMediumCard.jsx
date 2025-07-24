import { PersonFill } from "react-bootstrap-icons"
import { StudentLink } from "./StudentLink"
import { StudentCardCapsule } from "./StudentCardCapsule"
import { StudentMediumContent } from "./StudentMediumContent"
import { StudentAdmissionInfo } from "./StudentAdmissionInfo"
import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

/**
 * A card component that displays detailed content for a student entity.
 *
 * This component combines `StudentCardCapsule` and `StudentMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the student entity's details, while the body displays student information and admission details.
 * The entire card is clickable for navigation.
 *
 * @component
 * @param {Object} props - The properties for the StudentMediumCard component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {string|number} props.student.id - The unique identifier for the student entity.
 * @param {string} props.student.name - The name of the student.
 * @param {string} props.student.lastChange - The timestamp of the last change.
 * @param {Object} props.student.payment - Payment information including admission details.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a clickable card with student information and admission details.
 *
 * @example
 * // Example usage:
 * const studentEntity = { 
 *   id: 123, 
 *   name: "Jan Novák",
 *   lastChange: "2024-01-15T10:30:00Z",
 *   payment: { paymentInfo: { paid: true } }
 * };
 * 
 * <StudentMediumCard student={studentEntity}>
 *   <p>Additional details or actions for the student.</p>
 * </StudentMediumCard>
 */
export const StudentMediumCard = ({student, children}) => {
    const handleAdmissionClick = (admission) => {
        console.log('Admission clicked:', admission);
        // You can add navigation logic here if needed
    };

    return (
        <div style={{
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            borderRadius: '8px',
            overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
        >
            <ProxyLink to={`/student/view/${student.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <StudentCardCapsule title={<><PersonFill /> <StudentLink student={student} /></>}>
                    <StudentMediumContent student={student}>
                        <StudentAdmissionInfo 
                            student={student} 
                            onAdmissionClick={handleAdmissionClick}
                        />
                        {children}
                    </StudentMediumContent>
                </StudentCardCapsule>
            </ProxyLink>
        </div>
    )
}
