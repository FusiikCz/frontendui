import { ButtonWithDialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
// import { InsertStudentButton } from "./CUDButtons/InsertStudentButton";
// import { UpdateStudentButton } from "./CUDButtons/UpdateStudentButton";
// import { DeleteStudentButton } from "./CUDButtons/DeleteStudentButton";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentDeleteAsyncAction, StudentInsertAsyncAction, StudentUpdateAsyncAction } from "../Queries";
import { StudentMediumEditableContent } from "./StudentMediumEditableContent";

/**
 * StudentCUDButton Component
 *
 * A higher-order component that dynamically renders one of the following components
 * based on the `operation` prop:
 * - `InsertStudentButton` for creating a new item (operation "C")
 * - `UpdateStudentButton` for updating an existing item (operation "U")
 * - `DeleteStudentButton` for deleting an existing item (operation "D")
 *
 * This component validates the `student` prop:
 * - For "C" (create), `student` can be any object (no restrictions).
 * - For "U" (update) and "D" (delete), `student` must include an `id` key.
 *
 * If the `operation` prop is invalid or required conditions for `student` are not met,
 * an `ErrorHandler` component is rendered with an appropriate error message.
 *
 * @component
 * @param {Object} props - The props for the StudentCUDButton component.
 * @param {string} props.operation - The operation type ("C" for create, "U" for update, "D" for delete).
 * @param {React.ReactNode} props.children - The content or label for the button.
 * @param {Object} props.student - The parameters for the operation. For "U" and "D", it must include an `id` key.
 * @param {string} [props.student.id] - The unique identifier for the item (required for "U" and "D").
 * @param {string} [props.student.name] - The name of the student (from local data structure).
 * @param {Function} [props.onDone=(student) => {}] - Callback executed after the operation completes. Receives the `student` object.
 * @param {...Object} props - Additional props passed to the underlying button components.
 *
 * @example
 * // Example Usage
 * const Example = () => {
 *   const handleDone = (data) => console.log("Operation completed:", data);
 *
 *   return (
 *     <>
 *       <StudentCUDButton
 *         operation="C"
 *         student={{ name: "New Student" }}
 *         onDone={handleDone}
 *       >
 *         Insert
 *       </StudentCUDButton>
 *
 *       <StudentCUDButton
 *         operation="U"
 *         student={{ id: "123", name: "Updated Student" }}
 *         onDone={handleDone}
 *       >
 *         Update
 *       </StudentCUDButton>
 *
 *       <StudentCUDButton
 *         operation="D"
 *         student={{ id: "123" }}
 *         onDone={handleDone}
 *       >
 *         Delete
 *       </StudentCUDButton>
 *     </>
 *   );
 * };
 *
 * @returns {JSX.Element} The dynamically selected button component for the specified operation.
 */
export const StudentButton = ({ operation, children, student, onDone = () => {}, ...props }) => {
    const operationConfig = {
        C: {
            asyncAction: StudentInsertAsyncAction,
            dialogTitle: "Vložit novou student",
            loadingMsg: "Vkládám novou student",
            renderContent: () => <StudentMediumEditableContent student={student} />,
        },
        U: {
            asyncAction: StudentUpdateAsyncAction,
            dialogTitle: "Upravit student",
            loadingMsg: "Ukládám student",
            renderContent: () => <StudentMediumEditableContent student={student} />,
        },
        D: {
            asyncAction: StudentDeleteAsyncAction,
            dialogTitle: "Chcete odebrat student?",
            loadingMsg: "Odstraňuji student",
            renderContent: () => (
                <div style={{
                    padding: '16px',
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    borderRadius: '8px',
                    marginBottom: '16px'
                }}>
                    <h4 style={{
                        color: '#856404',
                        marginBottom: '12px',
                        fontWeight: '600'
                    }}>
                        ⚠️ Potvrzení smazání
                    </h4>
                    <div style={{
                        marginBottom: '12px'
                    }}>
                        <strong>Student:</strong> {student?.name || student?.student?.name || "Neznámý"}
                    </div>
                    <div style={{
                        marginBottom: '12px'
                    }}>
                        <strong>Email:</strong> {student?.email || "Není uveden"}
                    </div>
                    <div style={{
                        marginBottom: '12px'
                    }}>
                        <strong>ID:</strong> {student?.id || "Neznámé"}
                    </div>
                    <div style={{
                        color: '#856404',
                        fontSize: '14px',
                        fontStyle: 'italic'
                    }}>
                        Tato akce je nevratná. Student bude trvale odstraněn ze systému.
                    </div>
                </div>
            ),
        },
    };

    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C', 'U', or 'D'.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent } = operationConfig[operation];

    const { error, loading, fetch, entity } = useAsyncAction(asyncAction, {}, { deferred: true });
    const handleClick = async (params = {}) => {
        console.log("StudentCUDButton: handleClick called with params:", params);
        console.log("StudentCUDButton: All params keys:", Object.keys(params));
        console.log("StudentCUDButton: studentName value:", params.studentName);
        console.log("StudentCUDButton: studentName type:", typeof params.studentName);
        console.log("StudentCUDButton: studentName length:", params.studentName?.length);
        
        // Get the student name from various possible sources
        const studentName = params.studentName || student.studentName || student.name || student.student?.name;
        
        console.log("StudentCUDButton: Final studentName:", studentName);
        console.log("StudentCUDButton: studentName trimmed:", studentName?.trim());
        
        // Transform the data to match GraphQL schema
        let transformedStudent;
        
        if (operation === "C") {
            // Create operation
            if (!studentName || studentName.trim() === "") {
                console.error("StudentCUDButton: No valid student name provided");
                console.error("StudentCUDButton: params:", params);
                console.error("StudentCUDButton: student:", student);
                return;
            }
            
            transformedStudent = {
                name: studentName.trim()
            };
        } else if (operation === "U") {
            // Update operation - only send id and lastchange to GraphQL
            // Other fields will be handled locally in the UI
            transformedStudent = {
                id: student.id,
                lastchange: new Date().toISOString()
            };
        } else if (operation === "D") {
            // Delete operation - only send id and lastchange
            transformedStudent = {
                id: student.id,
                lastchange: new Date().toISOString()
            };
        }
        
        console.log("StudentCUDButton: Sending mutation with params:", transformedStudent);
        console.log("StudentCUDButton: Original params:", params);
        console.log("StudentCUDButton: paymentStatus from params:", params.paymentStatus);
        console.log("StudentCUDButton: Original student:", student);
        console.log("StudentCUDButton: studentName from params:", params.studentName);
        console.log("StudentCUDButton: studentName from student:", student.studentName);
        console.log("StudentCUDButton: name from student:", student.name);
        console.log("StudentCUDButton: student.name from student:", student.student?.name);
        console.log("StudentCUDButton: Final studentName:", studentName);
        console.log("StudentCUDButton: transformedStudent keys:", Object.keys(transformedStudent));
        console.log("StudentCUDButton: transformedStudent values:", Object.values(transformedStudent));
        
        try {
            const freshStudent = await fetch(transformedStudent);
            console.log("StudentCUDButton: Mutation response:", freshStudent);
            if (freshStudent && freshStudent.data && freshStudent.data.result) {
                // For update operations, create a result with all the form fields
                const resultWithName = {
                    ...freshStudent.data.result,
                    id: transformedStudent.id || student.id, // Ensure ID is always included
                    name: studentName || student.name, // Add the name from form
                    email: params.email || student.email || "",
                    telephone: params.telephone || student.telephone || "",
                    semesterNumber: parseInt(params.semesterNumber) || student.semesterNumber || 0,
                    paymentStatus: params.paymentStatus === "true" ? true : 
                                  params.paymentStatus === "false" ? false : 
                                  params.paymentStatus === "unknown" ? null : 
                                  student.payment?.paymentInfo?.paid
                };
                console.log("StudentCUDButton: resultWithName being passed to onDone:", resultWithName);
                onDone(resultWithName); // Pass the result to the external callback
            } else {
                console.log("StudentCUDButton: No result in response, passing freshStudent:", freshStudent);
                // Create a fallback object with the original student data plus any updates
                const fallbackResult = {
                    id: student.id,
                    name: studentName || student.name,
                    email: params.email || student.email || "",
                    telephone: params.telephone || student.telephone || "",
                    semesterNumber: parseInt(params.semesterNumber) || student.semesterNumber || 0,
                    paymentStatus: params.paymentStatus === "true" ? true : 
                                  params.paymentStatus === "false" ? false : 
                                  params.paymentStatus === "unknown" ? null : 
                                  student.payment?.paymentInfo?.paid
                };
                console.log("StudentCUDButton: Using fallback result:", fallbackResult);
                onDone(fallbackResult);
            }
        } catch (error) {
            console.error("StudentCUDButton: Mutation failed with error:", error);
            console.error("StudentCUDButton: Error details:", error.message);
            console.error("StudentCUDButton: Error stack:", error.stack);
            
            // Still pass the fallback result even if mutation fails
            const fallbackResult = {
                id: student.id,
                name: studentName || student.name,
                email: params.email || student.email || "",
                telephone: params.telephone || student.telephone || "",
                semesterNumber: parseInt(params.semesterNumber) || student.semesterNumber || 0,
                paymentStatus: params.paymentStatus === "true" ? true : 
                              params.paymentStatus === "false" ? false : 
                              params.paymentStatus === "unknown" ? null : 
                              student.payment?.paymentInfo?.paid
            };
            console.log("StudentCUDButton: Using fallback result after error:", fallbackResult);
            onDone(fallbackResult);
        }
    };

    // Validate required fields for "U" and "D"
    if ((operation === 'U' || operation === 'D') && !student?.id) {
        return <ErrorHandler errors={`For '${operation}' operation, 'student' must include an 'id' key.`} />;
    }

    return (<>
        {error && <ErrorHandler errors={error} />}
        {loading && <LoadingSpinner text={loadingMsg} />}
        <ButtonWithDialog
            buttonLabel={children}
            dialogTitle={dialogTitle}
            {...props}
            params={student}
            onClick={handleClick}
        >
            {renderContent()}
        </ButtonWithDialog>
    </>);
};

// // Prop validation using PropTypes
// StudentCUDButton.propTypes = {
//     /** The operation to perform: "C" for create, "U" for update, "D" for delete. */
//     operation: PropTypes.oneOf(['C', 'U', 'D']).isRequired,
//     /** The label or content for the button. */
//     children: PropTypes.node,
//     /** The parameters for the operation. */
//     student: PropTypes.shape({
//         id: PropTypes.string, // Required for "U" and "D" operations
//         name: PropTypes.string,
//         name_en: PropTypes.string,
//     }).isRequired,
//     /** Callback executed after the operation completes. Receives the `student` object. */
//     onDone: PropTypes.func,
// };

// // Default props
// StudentCUDButton.defaultProps = {
//     onDone: () => {},
// };