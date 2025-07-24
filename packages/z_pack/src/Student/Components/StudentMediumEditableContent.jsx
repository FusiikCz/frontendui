import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an student entity.
 *
 * This component renders form fields for editing student information.
 * It works with the GraphQL schema where student name is in a nested student object.
 *
 * @component
 * @param {Object} props - The properties for the StudentMediumContent component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {string|number} props.student.id - The unique identifier for the student entity.
 * @param {Object} props.student.student - The nested student object containing name information.
 * @param {string} props.student.student.name - The name of the student.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the form fields.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const studentEntity = { 
 *   id: 123, 
 *   student: { name: "Jan Novák" } 
 * };
 * 
 * <StudentMediumContent student={studentEntity}>
 *   <p>Additional information about the entity.</p>
 * </StudentMediumContent>
 */
export const StudentMediumEditableContent = ({student, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input 
                id={"studentName"} 
                label={"Jméno studenta"} 
                className="form-control" 
                defaultValue={student?.student?.name || student?.name || ""} 
                onChange={onChange} 
                onBlur={onBlur} 
                required
            />
            <Input 
                id={"userId"} 
                label={"User ID (volitelné)"} 
                className="form-control" 
                defaultValue={student?.userId || ""} 
                onChange={onChange} 
                onBlur={onBlur} 
                placeholder="UUID uživatele"
            />
            <Input 
                id={"programId"} 
                label={"Program ID (volitelné)"} 
                className="form-control" 
                defaultValue={student?.programId || ""} 
                onChange={onChange} 
                onBlur={onBlur} 
                placeholder="UUID programu"
            />
            <Input 
                id={"stateId"} 
                label={"State ID (volitelné)"} 
                className="form-control" 
                defaultValue={student?.stateId || ""} 
                onChange={onChange} 
                onBlur={onBlur} 
                placeholder="UUID stavu"
            />
            <Input 
                id={"semesterNumber"} 
                label={"Semestr"} 
                className="form-control" 
                type="number"
                defaultValue={student?.semesterNumber || student?.semester || 0} 
                onChange={onChange} 
                onBlur={onBlur} 
                min="0"
                max="10"
            />
            {children}
        </>
    )
}
