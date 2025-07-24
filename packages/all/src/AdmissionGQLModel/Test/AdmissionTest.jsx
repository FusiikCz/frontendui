import React from 'react';
import { AdmissionPageContent } from '../Pages/AdmissionPageContent';

/**
 * Test component to verify the admission page with student management
 * 
 * This component can be used to test the admission page functionality
 * and verify that the student management system works correctly.
 */
export const AdmissionTest = () => {
    const testAdmission = {
        id: '995a0dd2-3697-4e40-ae68-5bc3d9fe8c81',
        name: 'Test Admission 2024',
        name_en: 'Test Admission 2024'
    };

    return (
        <div>
            <h1>Admission Page Test</h1>
            <p>Testing admission page with student management integration</p>
            <AdmissionPageContent admission={testAdmission} />
        </div>
    );
}; 