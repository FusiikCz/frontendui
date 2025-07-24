import React from 'react';
import { StudentDemoPage } from '../Pages/StudentDemoPage';
import { sampleStudents, generateRandomStudents } from '../Data/studentData';

/**
 * Test component to verify the student management system
 * 
 * This component can be used to test the student management functionality
 * and verify that all components work correctly together.
 */
export const StudentTest = () => {
    // Test the data generation
    const testRandomStudents = () => {
        const students = generateRandomStudents(3);
        console.log('Generated students:', students);
        return students;
    };

    // Test the sample data
    const testSampleData = () => {
        console.log('Sample students:', sampleStudents);
        return sampleStudents;
    };

    return (
        <div>
            <h1>Student Management System Test</h1>
            <button onClick={testRandomStudents}>Test Random Generation</button>
            <button onClick={testSampleData}>Test Sample Data</button>
            <hr />
            <StudentDemoPage />
        </div>
    );
}; 