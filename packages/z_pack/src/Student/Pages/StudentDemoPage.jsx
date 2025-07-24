import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { StudentMediumCard } from '../Components/StudentMediumCard';
import { StudentPageNavbar } from './StudentPageNavbar';
import { sampleStudents, generateRandomStudents } from '../Data/studentData';

/**
 * A demo page component that showcases the student management system.
 *
 * This component displays a list of students using StudentMediumCard components,
 * allows generating random students, and demonstrates the complete student
 * management interface including navigation and student cards.
 *
 * @component
 * @returns {JSX.Element} A demo page showcasing the student management system.
 *
 * @example
 * // Example usage:
 * <StudentDemoPage />
 */
export const StudentDemoPage = () => {
    const [students, setStudents] = useState(sampleStudents);
    const [showAlert, setShowAlert] = useState(false);

    const handleGenerateStudents = (newStudents) => {
        setStudents(newStudents);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleSearchChange = (searchTerm) => {
        console.log('Search term:', searchTerm);
        // Implement search functionality here
    };

    return (
        <div>
            {/* Navigation Bar */}
            <StudentPageNavbar 
                student={{ id: 'demo' }}
                onSearchChange={handleSearchChange}
                onGenerateStudents={handleGenerateStudents}
            />

            {/* Alert for generated students */}
            {showAlert && (
                <Alert 
                    variant="success" 
                    dismissible 
                    onClose={() => setShowAlert(false)}
                    style={{ margin: '16px' }}
                >
                    Úspěšně vygenerováno 5 nových studentů!
                </Alert>
            )}

            {/* Main Content */}
            <Container fluid style={{ padding: '24px' }}>
                <Row>
                    <Col>
                        <h2 style={{ 
                            marginBottom: '24px', 
                            color: '#212529',
                            fontWeight: '600'
                        }}>
                            Správa studentů
                        </h2>
                        
                        <p style={{ 
                            marginBottom: '32px',
                            color: '#6c757d',
                            fontSize: '16px'
                        }}>
                            Tato stránka demonstruje systém správy studentů. Klikněte na tlačítko 
                            "Generovat 5 studentů" v navigaci pro vytvoření nových náhodných studentů.
                        </p>

                        {/* Students Grid */}
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {students.map((student) => (
                                <Col key={student.id}>
                                    <StudentMediumCard student={student} />
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
                    </Col>
                </Row>
            </Container>
        </div>
    );
}; 