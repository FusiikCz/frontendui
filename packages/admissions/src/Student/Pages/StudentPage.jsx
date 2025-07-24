import { useState } from "react"
import { useParams } from "react-router"
import { Card, Row, Col, Badge } from "react-bootstrap"
import { PersonFill, Envelope, Telephone, Calendar3, CreditCard, Building, ArrowLeft } from "react-bootstrap-icons"
import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

import { CreateDelayer, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StudentLargeCard } from "../Components"
import { StudentReadAsyncAction } from "../Queries"
import { StudentPageNavbar } from "./StudentPageNavbar"

// Mock student data for demonstration
const mockStudentData = {
    1: {
        id: 1,
        name: "Jan Novák",
        email: "jan.novak@email.cz",
        telephone: "+420 123 456 789",
        lastChange: "2024-01-15T10:30:00Z",
        payment: {
            id: "PAY001",
            paymentInfo: {
                paid: true,
                amount: 1500,
                paymentDate: "2024-01-10T14:20:00Z",
                admission: {
                    id: "ADM001",
                    name: "Informatika 2024"
                }
            }
        }
    },
    2: {
        id: 2,
        name: "Marie Svobodová",
        email: "marie.svobodova@email.cz",
        telephone: "+420 987 654 321",
        lastChange: "2024-01-14T16:45:00Z",
        payment: {
            id: "PAY002",
            paymentInfo: {
                paid: false,
                amount: 1500,
                paymentDate: null,
                admission: {
                    id: "ADM001",
                    name: "Informatika 2024"
                }
            }
        }
    },
    3: {
        id: 3,
        name: "Petr Černý",
        email: "petr.cerny@email.cz",
        telephone: "+420 555 123 456",
        lastChange: "2024-01-13T09:15:00Z",
        payment: {
            id: "PAY003",
            paymentInfo: {
                paid: true,
                amount: 1500,
                paymentDate: "2024-01-08T11:30:00Z",
                admission: {
                    id: "ADM002",
                    name: "Matematika 2024"
                }
            }
        }
    }
};

// Student Detail Component
const StudentDetailCard = ({ student }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'Neznámé';
        try {
            return new Date(dateString).toLocaleDateString('cs-CZ', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    const getPaymentStatus = () => {
        if (!student.payment?.paymentInfo) return { text: 'Bez přihlášky', variant: 'secondary' };
        if (student.payment.paymentInfo.paid === true) return { text: 'Zaplaceno', variant: 'success' };
        if (student.payment.paymentInfo.paid === false) return { text: 'Nezaplaceno', variant: 'danger' };
        return { text: 'Neznámý stav', variant: 'secondary' };
    };

    const paymentStatus = getPaymentStatus();

    return (
        <div style={{ padding: '24px' }}>
            {/* Header with back button */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px',
                borderBottom: '1px solid #e9ecef',
                paddingBottom: '16px'
            }}>
                <ProxyLink to="/admission/admission/editable/1" style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6c757d',
                    textDecoration: 'none',
                    marginRight: '16px'
                }}>
                    <ArrowLeft size={20} style={{ marginRight: '8px' }} />
                    Zpět na přijímací řízení
                </ProxyLink>
            </div>

            {/* Student Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '32px'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '24px',
                    border: '2px solid #e9ecef'
                }}>
                    <PersonFill size={40} style={{ color: '#6c757d' }} />
                </div>
                <div>
                    <h2 style={{
                        margin: '0 0 8px 0',
                        color: '#212529',
                        fontWeight: '600'
                    }}>
                        {student.name}
                    </h2>
                    <p style={{
                        margin: '0',
                        fontSize: '18px',
                        color: '#6c757d'
                    }}>
                        ID: {student.id}
                    </p>
                </div>
            </div>

            <Row>
                {/* Contact Information */}
                <Col md={6}>
                    <Card style={{ marginBottom: '24px' }}>
                        <Card.Header style={{
                            backgroundColor: '#f8f9fa',
                            borderBottom: '1px solid #e9ecef',
                            fontWeight: '600'
                        }}>
                            Kontaktní informace
                        </Card.Header>
                        <Card.Body>
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '12px'
                                }}>
                                    <Envelope size={16} style={{ color: '#6c757d', marginRight: '12px' }} />
                                    <span style={{ fontSize: '16px', color: '#495057' }}>
                                        {student.email}
                                    </span>
                                </div>
                                
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Telephone size={16} style={{ color: '#6c757d', marginRight: '12px' }} />
                                    <span style={{ fontSize: '16px', color: '#495057' }}>
                                        {student.telephone}
                                    </span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Payment Information */}
                <Col md={6}>
                    <Card style={{ marginBottom: '24px' }}>
                        <Card.Header style={{
                            backgroundColor: '#f8f9fa',
                            borderBottom: '1px solid #e9ecef',
                            fontWeight: '600'
                        }}>
                            Informace o platbě
                        </Card.Header>
                        <Card.Body>
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '12px'
                                }}>
                                    <CreditCard size={16} style={{ color: '#6c757d', marginRight: '12px' }} />
                                    <span style={{ fontSize: '16px', color: '#495057' }}>
                                        Stav: <Badge bg={paymentStatus.variant}>{paymentStatus.text}</Badge>
                                    </span>
                                </div>
                                
                                {student.payment?.paymentInfo && (
                                    <>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '8px'
                                        }}>
                                            <span style={{ fontSize: '14px', color: '#6c757d', marginRight: '8px' }}>
                                                Částka:
                                            </span>
                                            <span style={{ fontSize: '16px', color: '#495057', fontWeight: '500' }}>
                                                {student.payment.paymentInfo.amount} Kč
                                            </span>
                                        </div>
                                        
                                        {student.payment.paymentInfo.paymentDate && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <span style={{ fontSize: '14px', color: '#6c757d', marginRight: '8px' }}>
                                                    Datum platby:
                                                </span>
                                                <span style={{ fontSize: '16px', color: '#495057' }}>
                                                    {formatDate(student.payment.paymentInfo.paymentDate)}
                                                </span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                {/* Admission Information */}
                <Col md={6}>
                    <Card style={{ marginBottom: '24px' }}>
                        <Card.Header style={{
                            backgroundColor: '#f8f9fa',
                            borderBottom: '1px solid #e9ecef',
                            fontWeight: '600'
                        }}>
                            Přijímací řízení
                        </Card.Header>
                        <Card.Body>
                            {student.payment?.paymentInfo?.admission ? (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Building size={16} style={{ color: '#6c757d', marginRight: '12px' }} />
                                    <span style={{ fontSize: '16px', color: '#495057' }}>
                                        {student.payment.paymentInfo.admission.name}
                                    </span>
                                </div>
                            ) : (
                                <span style={{ fontSize: '16px', color: '#6c757d' }}>
                                    Žádné přijímací řízení
                                </span>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Last Change */}
                <Col md={6}>
                    <Card style={{ marginBottom: '24px' }}>
                        <Card.Header style={{
                            backgroundColor: '#f8f9fa',
                            borderBottom: '1px solid #e9ecef',
                            fontWeight: '600'
                        }}>
                            Poslední změna
                        </Card.Header>
                        <Card.Body>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Calendar3 size={16} style={{ color: '#6c757d', marginRight: '12px' }} />
                                <span style={{ fontSize: '16px', color: '#495057' }}>
                                    {formatDate(student.lastChange)}
                                </span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

/**
 * A page content component for displaying detailed information about an student entity.
 *
 * This component utilizes `StudentLargeCard` to create a structured layout and displays 
 * the serialized representation of the `student` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the StudentPageContent component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {string|number} props.student.id - The unique identifier for the student entity.
 * @param {string} props.student.name - The name or label of the student entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an student entity.
 *
 * @example
 * // Example usage:
 * const studentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudentPageContent student={studentEntity} />
 */
const StudentPageContent = ({student}) => {
    // Get mock data for the student
    const mockStudent = mockStudentData[student.id];
    
    if (!mockStudent) {
        return (
            <div style={{ padding: '24px', textAlign: 'center' }}>
                <h3>Student nenalezen</h3>
                <p>Student s ID {student.id} nebyl nalezen v systému.</p>
                <ProxyLink to="/admission/admission/editable/1">
                    Zpět na přijímací řízení
                </ProxyLink>
            </div>
        );
    }

    return (
        <StudentLargeCard student={mockStudent}>
            <StudentDetailCard student={mockStudent} />
        </StudentLargeCard>
    );
}

/**
 * A lazy-loading component for displaying content of an student entity.
 *
 * This component is created using `createLazyComponent` and wraps `StudentPageContent` to provide
 * automatic data fetching for the `student` entity. It uses the `StudentReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `student` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.student - The identifier of the student entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `student` entity data and displays it
 * using `StudentPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const studentId = "12345";
 *
 * <StudentPageContentLazy student={studentId} />
 */
const StudentPageContentLazy = ({student}) => {
    const { error, loading, entity, fetch } = useAsyncAction(StudentReadAsyncAction, student)
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorEvent errors={error} />}
        {entity && <StudentPageContent student={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an student entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `student` object, and passes it to the `StudentPageContentLazy` component.
 * The `StudentPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the student entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/student/:id" element={<StudentPage />} />
 *
 * // Navigating to "/student/12345" will render the page for the student entity with ID 12345.
 */
export const StudentPage = () => {
    const {id} = useParams()
    const student = {id}
    return <StudentPageContentLazy student={student} />
}