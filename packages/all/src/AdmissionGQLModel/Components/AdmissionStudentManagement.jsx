import React, { useState } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { PlusCircle, PersonFill, Calendar3, CreditCard } from 'react-bootstrap-icons';

// Local student data
const sampleStudents = [
    {
        id: 1,
        name: "Jan Novák",
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
    {
        id: 2,
        name: "Marie Svobodová",
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
    {
        id: 3,
        name: "Petr Černý",
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
];

const generateRandomStudents = (count = 5) => {
    const firstNames = ["Jan", "Marie", "Petr", "Anna", "Tomáš", "Lucie", "Martin", "Eva", "Josef", "Hana"];
    const lastNames = ["Novák", "Svobodová", "Černý", "Dvořáková", "Malý", "Veselá", "Horák", "Krejčí", "Růžička", "Kučera"];
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
        
        const hasPayment = Math.random() > 0.3;
        const isPaid = hasPayment ? Math.random() > 0.4 : false;
        
        const student = {
            id: Math.floor(Math.random() * 10000) + 1,
            name,
            lastChange: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
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

// Student Card Component
const StudentCard = ({ student }) => {
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

    return (
        <div style={{
            padding: '16px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '16px'
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
            {/* Student Name and ID */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px'
            }}>
                <PersonFill size={20} style={{ color: '#495057', marginRight: '8px' }} />
                <div>
                    <h5 style={{
                        margin: '0',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#212529'
                    }}>
                        {student.name}
                    </h5>
                    <span style={{
                        fontSize: '14px',
                        color: '#6c757d'
                    }}>
                        ID: {student.id}
                    </span>
                </div>
            </div>

            {/* Last Change */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px'
            }}>
                <Calendar3 size={16} style={{ color: '#6c757d', marginRight: '8px' }} />
                <span style={{
                    fontSize: '14px',
                    color: '#6c757d'
                }}>
                    Poslední změna: {formatDate(student.lastChange)}
                </span>
            </div>

            {/* Payment Status */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
            }}>
                <CreditCard size={16} style={{ color: '#6c757d', marginRight: '8px' }} />
                <span style={{
                    fontSize: '14px',
                    color: '#6c757d'
                }}>
                    Stav přihlášky: 
                </span>
                <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: paymentStatus.color,
                    marginLeft: '4px'
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

    const handleGenerateStudents = () => {
        const newStudents = generateRandomStudents(5);
        setStudents(newStudents);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <div style={{ marginTop: '32px' }}>
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
                    Správa studentů pro přijímací řízení: {admission?.name}
                </h3>
                
                <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={handleGenerateStudents}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <PlusCircle size={16} />
                    Generovat 5 studentů
                </Button>
            </div>

            {/* Alert for generated students */}
            {showAlert && (
                <Alert 
                    variant="success" 
                    dismissible 
                    onClose={() => setShowAlert(false)}
                    style={{ marginBottom: '24px' }}
                >
                    Úspěšně vygenerováno 5 nových studentů!
                </Alert>
            )}

            {/* Students Grid */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {students.map((student) => (
                    <Col key={student.id}>
                        <StudentCard student={student} />
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
                    <p>Klikněte na tlačítko "Generovat 5 studentů" pro vytvoření ukázkových dat.</p>
                </div>
            )}
        </div>
    );
}; 