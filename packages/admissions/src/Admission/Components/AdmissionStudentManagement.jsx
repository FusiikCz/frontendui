import React, { useState } from 'react';
import { Container, Row, Col, Alert, Button, Card, ButtonGroup } from 'react-bootstrap';
import { PlusCircle, PersonFill, Calendar3, CreditCard, Telephone, Envelope, Building, People, CalendarEvent, Check, X, Pencil } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { StudentButton } from '../../Student/Components/StudentCUDButton';
import { generateUUID, generateStudentData } from '../../Student/Utils/uuidGenerator';

// Local student data with proper structure for mutations
const sampleStudents = [
    {
        id: generateUUID(),
        name: "Jan Novák",
        email: "jan.novak@email.cz",
        telephone: "+420 123 456 789",
        lastChange: "2024-01-15T10:30:00Z",
        semester: 0,
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
    {
        id: generateUUID(),
        name: "Marie Svobodová",
        email: "marie.svobodova@email.cz",
        telephone: "+420 987 654 321",
        lastChange: "2024-01-14T16:45:00Z",
        semester: 0,
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
    {
        id: generateUUID(),
        name: "Petr Černý",
        email: "petr.cerny@email.cz",
        telephone: "+420 555 123 456",
        lastChange: "2024-01-13T09:15:00Z",
        semester: 0,
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
];

const generateRandomStudents = (count = 5) => {
    const firstNames = ["Jan", "Marie", "Petr", "Anna", "Tomáš", "Lucie", "Martin", "Eva", "Josef", "Hana"];
    const lastNames = ["Novák", "Svobodová", "Černý", "Dvořáková", "Malý", "Veselá", "Horák", "Krejčí", "Růžička", "Kučera"];
    const emailDomains = ["gmail.com", "seznam.cz", "email.cz", "outlook.com", "yahoo.com"];
    const admissions = [
        { id: "ADM001", name: "Informatika 2024" },
        { id: "ADM002", name: "Matematika 2024" },
        { id: "ADM003", name: "Fyzika 2024" },
        { id: "ADM004", name: "Chemie 2024" }
    ];

    const students = [];
    
    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const name = `${firstName} ${lastName}`;
        
        // Generate email
        const emailDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}`;
        
        // Generate telephone
        const telephone = `+420 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)}`;
        
        const hasPayment = Math.random() > 0.3;
        const isPaid = hasPayment ? Math.random() > 0.4 : false;
        
        const student = {
            id: generateUUID(),
            name,
            email,
            telephone,
            lastChange: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            semester: 0,
            payment: hasPayment ? {
                id: `PAY${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
                paymentInfo: {
                    paid: isPaid,
                    amount: 1500,
                    paymentDate: isPaid ? new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString() : null,
                    admission: admissions[Math.floor(Math.random() * admissions.length)]
                }
            } : null
        };
        
        students.push(student);
    }
    
    return students;
};

// Admission Info Card Component
const AdmissionInfoCard = ({ admission }) => {
    return (
        <Card style={{
            backgroundColor: '#fff',
            color: '#212529',
            border: '1px solid #e9ecef',
            borderRadius: '12px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <Card.Body style={{ padding: '24px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div style={{ flex: '1', minWidth: '250px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }}>
                            <Building size={24} style={{ marginRight: '12px', color: '#6c757d' }} />
                            <h4 style={{ margin: '0', fontWeight: '600', color: '#212529' }}>
                                {admission?.name || 'Přijímací řízení'}
                            </h4>
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '8px'
                        }}>
                            <People size={16} style={{ marginRight: '8px', color: '#6c757d' }} />
                            <span style={{ fontSize: '14px', color: '#6c757d' }}>
                                Celkem studentů: {sampleStudents.length}
                            </span>
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <CalendarEvent size={16} style={{ marginRight: '8px', color: '#6c757d' }} />
                            <span style={{ fontSize: '14px', color: '#6c757d' }}>
                                Rok: 2024
                            </span>
                        </div>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: '8px'
                    }}>
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#6c757d',
                            border: '1px solid #e9ecef'
                        }}>
                            ID: {admission?.id || 'ADM001'}
                        </div>
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#6c757d',
                            border: '1px solid #e9ecef'
                        }}>
                            Aktivní
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

// Student Card Component
const StudentCard = ({ student, onStudentClick, onStudentUpdate, onStudentDelete }) => {
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
        if (!student.payment?.paymentInfo) return { text: 'Bez přihlášky', color: '#6c757d' };
        if (student.payment.paymentInfo.paid === true) return { text: 'Zaplaceno', color: '#28a745' };
        if (student.payment.paymentInfo.paid === false) return { text: 'Nezaplaceno', color: '#dc3545' };
        return { text: 'Neznámý stav', color: '#6c757d' };
    };

    const paymentStatus = getPaymentStatus();

    const handleClick = () => {
        // Open update dialog directly when clicking on the card
        if (onStudentUpdate) {
            onStudentUpdate(student);
        }
    };

    const handleNameClick = (e) => {
        // Prevent the card click from triggering when clicking the name
        e.stopPropagation();
        
        // Navigate to student detail page
        if (onStudentClick) {
            onStudentClick(student);
        }
    };

    return (
        <div 
            style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e9ecef',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = '#007bff';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#e9ecef';
            }}
            onClick={handleClick}
            title="Klikněte pro úpravu studenta (nebo klikněte na jméno pro zobrazení detailů)"
        >
            {/* Student Name and ID */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    border: '1px solid #e9ecef'
                }}>
                    <PersonFill size={24} style={{ color: '#6c757d' }} />
                </div>
                <div style={{ flex: '1' }}>
                    <h5 style={{
                        margin: '0',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#212529',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span 
                            onClick={handleNameClick}
                            style={{
                                cursor: 'pointer',
                                color: '#007bff',
                                textDecoration: 'underline',
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#0056b3';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#007bff';
                            }}
                            title="Klikněte pro zobrazení detailů studenta"
                        >
                            {student.name}
                        </span>
                        <Pencil size={14} style={{ color: '#6c757d', opacity: 0.7 }} />
                    </h5>
                    <span style={{
                        fontSize: '14px',
                        color: '#6c757d'
                    }}>
                        ID: {student.id}
                    </span>
                </div>
                
                                 {/* Action Buttons */}
                 <div 
                     style={{
                         display: 'flex',
                         gap: '8px'
                     }}
                     onClick={(e) => e.stopPropagation()}
                 >
                     <StudentButton
                         operation="U"
                         student={student}
                         onDone={onStudentUpdate}
                         variant="success"
                         size="sm"
                         style={{ 
                             padding: '6px 12px',
                             minWidth: '60px',
                             height: '36px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             fontSize: '12px',
                             fontWeight: '500'
                         }}
                     >
                         Update
                     </StudentButton>
                     
                     <StudentButton
                         operation="D"
                         student={student}
                         onDone={onStudentDelete}
                         variant="danger"
                         size="sm"
                         style={{ 
                             padding: '6px 12px',
                             minWidth: '36px',
                             height: '36px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             fontSize: '14px',
                             fontWeight: 'bold',
                             backgroundColor: '#dc3545',
                             borderColor: '#dc3545',
                             color: '#fff'
                         }}
                     >
                         X
                     </StudentButton>
                 </div>
            </div>

            {/* Contact Information */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px'
                }}>
                    <Envelope size={14} style={{ color: '#6c757d', marginRight: '8px' }} />
                    <span style={{
                        fontSize: '14px',
                        color: '#495057',
                        wordBreak: 'break-word'
                    }}>
                        {student.email}
                    </span>
                </div>
                
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px'
                }}>
                    <Telephone size={14} style={{ color: '#6c757d', marginRight: '8px' }} />
                    <span style={{
                        fontSize: '14px',
                        color: '#495057'
                    }}>
                        {student.telephone}
                    </span>
                </div>
            </div>

            {/* Last Change */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px'
            }}>
                <Calendar3 size={14} style={{ color: '#6c757d', marginRight: '8px' }} />
                <span style={{
                    fontSize: '13px',
                    color: '#6c757d'
                }}>
                    Poslední změna: {formatDate(student.lastChange)}
                </span>
            </div>

            {/* Payment Status */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <CreditCard size={14} style={{ color: '#6c757d', marginRight: '6px' }} />
                    <span style={{
                        fontSize: '13px',
                        color: '#6c757d'
                    }}>
                        Stav:
                    </span>
                </div>
                <span style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: paymentStatus.color,
                    padding: '2px 8px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    border: `1px solid ${paymentStatus.color}`
                }}>
                    {paymentStatus.text}
                </span>
            </div>
        </div>
    );
};

/**
 * Student management component for admission pages
 * 
 * This component displays students related to a specific admission
 * and allows generating random students for testing.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.admission - The admission entity
 * @returns {JSX.Element} Student management interface
 */
export const AdmissionStudentManagement = ({ admission }) => {
    const [students, setStudents] = useState(sampleStudents);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("Operace byla úspěšně dokončena!");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const navigate = useNavigate();

    const handleGenerateStudents = () => {
        const newStudents = generateRandomStudents(5);
        setStudents(prevStudents => [...prevStudents, ...newStudents]);
        setAlertMessage("Generování studentů bylo úspěšné!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
        // Navigate to student detail page
        navigate(`/student/student/view/${student.id}`);
    };

    const handleStudentCreate = (newStudent) => {
        // Check if we have a valid response
        if (!newStudent) {
            console.error("No student data received from mutation");
            return;
        }

        console.log("handleStudentCreate: received newStudent:", newStudent);

        // The mutation response will contain the created student data
        // We need to transform it to match our local data structure
        const transformedStudent = {
            id: newStudent.id || generateUUID(),
            name: newStudent.name || newStudent.student?.name || "Nový student",
            email: newStudent.email || `${(newStudent.name || newStudent.student?.name || "novy.student").toLowerCase().replace(' ', '.')}@email.cz`,
            telephone: newStudent.telephone || `+420 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)}`,
            lastChange: new Date().toISOString(),
            semester: newStudent.semesterNumber || 0,
            payment: {
                id: `PAY${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
                paymentInfo: {
                    paid: null, // Set to null (Neznámý stav) by default for new students
                    amount: 1500,
                    paymentDate: null,
                    admission: {
                        id: "ADM001",
                        name: "Informatika 2024"
                    }
                }
            }
        };
        
        console.log("handleStudentCreate: transformedStudent:", transformedStudent);
        
        // Add the new student to the list
        setStudents(prevStudents => [...prevStudents, transformedStudent]);
        setAlertMessage("Student byl úspěšně přidán!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleStudentUpdate = (updatedStudent) => {
        console.log("handleStudentUpdate: received updatedStudent:", updatedStudent);
        console.log("handleStudentUpdate: paymentStatus:", updatedStudent.paymentStatus);
        console.log("handleStudentUpdate: paymentStatus type:", typeof updatedStudent.paymentStatus);
        console.log("handleStudentUpdate: paymentStatus value:", updatedStudent.paymentStatus);
        
        // Check if we have valid data
        if (!updatedStudent) {
            console.error("handleStudentUpdate: No student data received");
            return;
        }
        
        // Check if we have the required id field
        if (!updatedStudent.id) {
            console.error("handleStudentUpdate: No student ID in updatedStudent:", updatedStudent);
            return;
        }
        
        // Update the student in the list
        setStudents(prevStudents => 
            prevStudents.map(student => {
                if (student.id === updatedStudent.id) {
                    // Merge the updated data with existing data, preserving payment info
                    const updatedPaymentStatus = updatedStudent.paymentStatus !== undefined ? updatedStudent.paymentStatus : student.payment?.paymentInfo?.paid;
                    console.log("handleStudentUpdate: updating payment status to:", updatedPaymentStatus);
                    console.log("handleStudentUpdate: updatedPaymentStatus type:", typeof updatedPaymentStatus);
                    
                    return {
                        ...student,
                        name: updatedStudent.name || student.name,
                        email: updatedStudent.email || student.email,
                        telephone: updatedStudent.telephone || student.telephone,
                        semester: updatedStudent.semesterNumber || student.semester,
                        lastChange: new Date().toISOString(),
                        payment: {
                            ...student.payment,
                            paymentInfo: {
                                ...student.payment?.paymentInfo,
                                paid: updatedPaymentStatus // Can be true, false, or null
                            }
                        }
                    };
                }
                return student;
            })
        );
        setAlertMessage("Student byl úspěšně aktualizován!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        
        // Don't navigate after update - just stay on the current page
    };

    const handleStudentDelete = (deletedStudent) => {
        console.log("handleStudentDelete: received deletedStudent:", deletedStudent);
        
        // Check if we have valid data
        if (!deletedStudent) {
            console.error("handleStudentDelete: No student data received");
            return;
        }
        
        // Check if we have the required id field
        if (!deletedStudent.id) {
            console.error("handleStudentDelete: No student ID in deletedStudent:", deletedStudent);
            return;
        }
        
        console.log("handleStudentDelete: Removing student with ID:", deletedStudent.id);
        
        // Remove the student from the list
        setStudents(prevStudents => 
            prevStudents.filter(student => student.id !== deletedStudent.id)
        );
        setAlertMessage("Student byl úspěšně odstraněn!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <div style={{ marginTop: '32px' }}>
            {/* Admission Info Card */}
            <AdmissionInfoCard admission={admission} />
            
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                borderBottom: '2px solid #e9ecef',
                paddingBottom: '12px'
            }}>
                <h3 style={{ 
                    margin: '0',
                    color: '#212529',
                    fontWeight: '600'
                }}>
                    Seznam studentů
                </h3>
                
                <div style={{
                    display: 'flex',
                    gap: '8px'
                }}>
                    <StudentButton
                        operation="C"
                        student={{}}
                        onDone={handleStudentCreate}
                        variant="primary"
                        size="sm"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            borderRadius: '8px',
                            padding: '8px 16px'
                        }}
                    >
                        <PlusCircle size={16} />
                        Přidat studenta
                    </StudentButton>
                    
                    <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={handleGenerateStudents}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            borderRadius: '8px',
                            padding: '8px 16px'
                        }}
                    >
                        <PlusCircle size={16} />
                        Generovat 5 studentů
                    </Button>
                </div>
            </div>

            {/* Alert for operations */}
            {showAlert && (
                <Alert 
                    variant="success" 
                    dismissible 
                    onClose={() => setShowAlert(false)}
                    style={{ marginBottom: '24px' }}
                >
                    {alertMessage}
                </Alert>
            )}

            {/* Students Grid */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {students.map((student) => (
                    <Col key={student.id}>
                        <StudentCard 
                            student={student} 
                            onStudentClick={handleStudentClick}
                            onStudentUpdate={handleStudentUpdate}
                            onStudentDelete={handleStudentDelete}
                        />
                    </Col>
                ))}
            </Row>

            {students.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '48px',
                    color: '#6c757d'
                }}>
                    <h4>Žádní studenti</h4>
                    <p>Klikněte na tlačítko "Přidat studenta" nebo "Generovat 5 studentů" pro vytvoření ukázkových dat.</p>
                </div>
            )}
        </div>
    );
}; 