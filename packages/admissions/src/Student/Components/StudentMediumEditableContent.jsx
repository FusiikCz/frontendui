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
    console.log("StudentMediumEditableContent: student prop:", student);
    console.log("StudentMediumEditableContent: defaultValue:", student?.student?.name || student?.name || "");
    
    return (
        <>           
            <Input 
                id={"studentName"} 
                label={"Jméno studenta"} 
                className="form-control" 
                defaultValue={student?.student?.name || student?.name || ""} 
                onChange={onChange} 
                onBlur={onBlur} 
                placeholder="Zadejte jméno studenta"
                required
                ariaHidden={false}
            />
            <Input 
                id={"email"} 
                label={"Email"} 
                className="form-control" 
                type="email"
                defaultValue={student?.email || student?.student?.email || ""} 
                onChange={onChange} 
                onBlur={onBlur} 
                placeholder="student@email.cz"
            />
            <Input 
                id={"telephone"} 
                label={"Telefon"} 
                className="form-control" 
                defaultValue={student?.telephone || ""} 
                onChange={onChange} 
                onBlur={onBlur} 
                placeholder="+420 123 456 789"
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
            <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
            }}>
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#212529'
                }}>
                    Status platby:
                </label>
                <select
                    id="paymentStatus"
                    defaultValue={
                        student?.payment?.paymentInfo?.paid === true ? "true" :
                        student?.payment?.paymentInfo?.paid === false ? "false" : "unknown"
                    }
                    onChange={onChange}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid #ced4da',
                        backgroundColor: '#fff',
                        fontSize: '14px'
                    }}
                >
                    <option value="true" style={{ color: '#28a745', fontWeight: '500' }}>Zaplaceno</option>
                    <option value="false" style={{ color: '#dc3545', fontWeight: '500' }}>Nezaplaceno</option>
                    <option value="unknown" style={{ color: '#6c757d', fontWeight: '500' }}>Neznámý stav</option>
                </select>
            </div>
            {children}
        </>
    )
}
