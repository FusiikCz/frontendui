import React from 'react';

/**
 * Component to display students associated with an admission
 * 
 * @param {Object} props - Component props
 * @param {Object} props.admission - The admission object with students array
 * @param {Array} props.admission.students - Array of student objects
 * @param {Function} props.onStudentClick - Callback when a student is clicked
 * @param {boolean} props.showPaymentStatus - Whether to show payment status
 * @returns {JSX.Element} Rendered component
 */
export const AdmissionStudentsList = ({ 
    admission, 
    onStudentClick, 
    showPaymentStatus = true 
}) => {
    if (!admission?.students || admission.students.length === 0) {
        return (
            <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                textAlign: 'center',
                color: '#6c757d'
            }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#495057' }}>
                    Žádní studenti
                </h4>
                <p style={{ margin: '0', fontSize: '14px' }}>
                    K tomuto přijímacímu řízení nejsou zatím přihlášeni žádní studenti.
                </p>
            </div>
        );
    }

    const getStudentDisplayName = (student) => {
        if (student.student?.fullname) return student.student.fullname;
        if (student.student?.givenname && student.student?.surname) {
            return `${student.student.givenname} ${student.student.surname}`;
        }
        return `Student ${student.id?.substring(0, 8) || 'Neznámý'}`;
    };

    const getPaymentStatusColor = (student) => {
        if (student.payment?.paymentInfo?.paid === true) return '#28a745';
        if (student.payment?.paymentInfo?.paid === false) return '#dc3545';
        return '#6c757d';
    };

    const getPaymentStatusText = (student) => {
        if (student.payment?.paymentInfo?.paid === true) return 'Zaplaceno';
        if (student.payment?.paymentInfo?.paid === false) return 'Nezaplaceno';
        return 'Neznámý stav';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Neznámé';
        try {
            return new Date(dateString).toLocaleString('cs-CZ');
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div style={{ marginTop: '16px' }}>
            <h4 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: '#333',
                borderBottom: '2px solid #007bff',
                paddingBottom: '8px'
            }}>
                Přihlášení studenti ({admission.students.length})
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {admission.students.map((student, index) => (
                    <div
                        key={student.id}
                        style={{
                            border: '1px solid #dee2e6',
                            borderRadius: '6px',
                            padding: '12px',
                            backgroundColor: '#fff',
                            cursor: onStudentClick ? 'pointer' : 'default',
                            transition: 'all 0.2s ease',
                            ...(onStudentClick && {
                                ':hover': {
                                    borderColor: '#007bff',
                                    backgroundColor: '#f8f9fa'
                                }
                            })
                        }}
                        onClick={() => onStudentClick && onStudentClick(student)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <h5 style={{ 
                                    margin: '0 0 4px 0', 
                                    fontSize: '16px', 
                                    fontWeight: '600',
                                    color: '#495057'
                                }}>
                                    {getStudentDisplayName(student)}
                                </h5>
                                
                                {student.student?.email && (
                                    <p style={{ 
                                        margin: '0 0 4px 0', 
                                        fontSize: '14px', 
                                        color: '#6c757d' 
                                    }}>
                                        📧 {student.student.email}
                                    </p>
                                )}
                                
                                <p style={{ 
                                    margin: '0', 
                                    fontSize: '12px', 
                                    color: '#868e96' 
                                }}>
                                    ID: {student.id} | Poslední změna: {formatDate(student.lastchange)}
                                </p>
                            </div>
                            
                            {showPaymentStatus && (
                                <div style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'flex-end',
                                    gap: '4px'
                                }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        backgroundColor: getPaymentStatusColor(student),
                                        color: 'white'
                                    }}>
                                        {getPaymentStatusText(student)}
                                    </span>
                                    
                                    {student.payment?.paymentInfo?.amount && (
                                        <span style={{
                                            fontSize: '12px',
                                            color: '#6c757d'
                                        }}>
                                            {student.payment.paymentInfo.amount} Kč
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 