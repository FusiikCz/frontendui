import React from 'react';

/**
 * Component to display admission information for a student
 * 
 * @param {Object} props - Component props
 * @param {Object} props.student - The student object with payment and admission info
 * @param {Function} props.onAdmissionClick - Callback when admission is clicked
 * @returns {JSX.Element} Rendered component
 */
export const StudentAdmissionInfo = ({ student, onAdmissionClick }) => {
    const admission = student.payment?.paymentInfo?.admission;
    
    if (!admission) {
        return (
            <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                textAlign: 'center',
                color: '#6c757d'
            }}>
                <h5 style={{ margin: '0 0 4px 0', color: '#495057' }}>
                    Přijímací řízení
                </h5>
                <p style={{ margin: '0', fontSize: '14px' }}>
                    Student není přihlášen k žádnému přijímacímu řízení.
                </p>
            </div>
        );
    }

    const getPaymentStatusColor = () => {
        if (student.payment?.paymentInfo?.paid === true) return '#28a745';
        if (student.payment?.paymentInfo?.paid === false) return '#dc3545';
        return '#6c757d';
    };

    const getPaymentStatusText = () => {
        if (student.payment?.paymentInfo?.paid === true) return 'Zaplaceno';
        if (student.payment?.paymentInfo?.paid === false) return 'Nezaplaceno';
        return 'Neznámý stav';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Neznámé';
        try {
            return new Date(dateString).toLocaleDateString('cs-CZ');
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div style={{
            border: '1px solid #dee2e6',
            borderRadius: '6px',
            padding: '12px',
            backgroundColor: '#fff',
            cursor: onAdmissionClick ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            ...(onAdmissionClick && {
                ':hover': {
                    borderColor: '#007bff',
                    backgroundColor: '#f8f9fa'
                }
            })
        }}
        onClick={() => onAdmissionClick && onAdmissionClick(admission)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <h5 style={{ 
                        margin: '0 0 8px 0', 
                        fontSize: '16px', 
                        fontWeight: '600',
                        color: '#495057'
                    }}>
                        Přijímací řízení: {admission.name || admission.id}
                    </h5>
                    
                    <div style={{ marginBottom: '8px' }}>
                        <span style={{ 
                            fontSize: '14px', 
                            color: '#6c757d',
                            fontWeight: 'bold'
                        }}>
                            ID přijímacího řízení:
                        </span>
                        <span style={{ 
                            fontSize: '14px', 
                            color: '#495057',
                            marginLeft: '8px'
                        }}>
                            {admission.id}
                        </span>
                    </div>
                    
                    {student.payment?.paymentInfo?.amount && (
                        <div style={{ marginBottom: '4px' }}>
                            <span style={{ 
                                fontSize: '14px', 
                                color: '#6c757d',
                                fontWeight: 'bold'
                            }}>
                                Částka:
                            </span>
                            <span style={{ 
                                fontSize: '14px', 
                                color: '#495057',
                                marginLeft: '8px'
                            }}>
                                {student.payment.paymentInfo.amount} Kč
                            </span>
                        </div>
                    )}
                    
                    <div style={{ 
                        fontSize: '12px', 
                        color: '#868e96',
                        marginTop: '8px'
                    }}>
                        ID platby: {student.payment?.id || 'Neznámé'}
                    </div>
                </div>
                
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
                        backgroundColor: getPaymentStatusColor(),
                        color: 'white'
                    }}>
                        {getPaymentStatusText()}
                    </span>
                    
                    {student.payment?.paymentInfo?.paymentDate && (
                        <span style={{
                            fontSize: '12px',
                            color: '#6c757d'
                        }}>
                            Do: {formatDate(student.payment.paymentInfo.paymentDate)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}; 