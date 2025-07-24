/**
 * Sample student data for the application
 * 
 * This file contains mock student data with the following structure:
 * - id: unique identifier
 * - name: student's full name
 * - lastChange: timestamp of last modification
 * - payment: payment information including admission details
 */

export const sampleStudents = [
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
    },
    {
        id: 4,
        name: "Anna Dvořáková",
        lastChange: "2024-01-12T13:20:00Z",
        payment: null
    },
    {
        id: 5,
        name: "Tomáš Malý",
        lastChange: "2024-01-11T08:55:00Z",
        payment: {
            id: "PAY004",
            paymentInfo: {
                paid: false,
                amount: 1500,
                paymentDate: null,
                admission: {
                    id: "ADM002",
                    name: "Matematika 2024"
                }
            }
        }
    }
];

/**
 * Generate random student data
 * @param {number} count - Number of students to generate
 * @returns {Array} Array of randomly generated students
 */
export const generateRandomStudents = (count = 5) => {
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
        
        const hasPayment = Math.random() > 0.3; // 70% chance of having payment
        const isPaid = hasPayment ? Math.random() > 0.4 : false; // 60% chance of being paid if has payment
        
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