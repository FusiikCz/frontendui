import React from 'react';
import { PersonFill, Calendar3, CreditCard } from 'react-bootstrap-icons';

/**
 * A component that displays medium-level content for a student entity.
 *
 * This component renders student information in a clean, readable format including:
 * - Student name and ID
 * - Last change timestamp
 * - Payment status for admission
 *
 * @component
 * @param {Object} props - The properties for the StudentMediumContent component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {string|number} props.student.id - The unique identifier for the student entity.
 * @param {string} props.student.name - The name of the student.
 * @param {string} props.student.lastChange - The timestamp of the last change.
 * @param {Object} props.student.payment - Payment information including admission details.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the student information.
 *
 * @returns {JSX.Element} A JSX element displaying the student's details and optional content.
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
 * <StudentMediumContent student={studentEntity}>
 *   <p>Additional information about the student.</p>
 * </StudentMediumContent>
 */
export const StudentMediumContent = ({student, children}) => {
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
            border: '1px solid #e9ecef'
        }}>
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

            {/* Additional Content */}
            {children && (
                <div style={{ marginTop: '12px' }}>
                    {children}
                </div>
            )}
        </div>
    );
};
