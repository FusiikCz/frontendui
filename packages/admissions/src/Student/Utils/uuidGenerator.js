/**
 * Simple UUID v4 generator
 * 
 * Generates a UUID v4 string that can be used for student IDs
 * 
 * @returns {string} A UUID v4 string
 * 
 * @example
 * const studentId = generateUUID();
 * console.log(studentId); // "550e8400-e29b-41d4-a716-446655440000"
 */
export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

/**
 * Generate a student object with required fields for the mutation
 * 
 * @param {string} name - The student's name
 * @returns {Object} Student object with generated UUID and default values
 * 
 * @example
 * const student = generateStudentData("Jan Novák");
 * console.log(student);
 * // {
 * //   id: "550e8400-e29b-41d4-a716-446655440000",
 * //   name: "Jan Novák",
 * //   semester: 0
 * // }
 */
export const generateStudentData = (name) => {
    return {
        id: generateUUID(),
        name: name,
        semester: 0
    };
};

/**
 * Generate multiple student objects for testing
 * 
 * @param {number} count - Number of students to generate
 * @param {Array<string>} names - Array of names to use
 * @returns {Array<Object>} Array of student objects
 * 
 * @example
 * const students = generateMultipleStudents(3, ["Jan Novák", "Marie Svobodová", "Petr Černý"]);
 */
export const generateMultipleStudents = (count, names = []) => {
    const defaultNames = [
        "Jan Novák", "Marie Svobodová", "Petr Černý", 
        "Anna Dvořáková", "Tomáš Malý", "Lucie Veselá",
        "Martin Horák", "Eva Krejčí", "Josef Růžička", "Hana Kučera"
    ];
    
    const nameList = names.length > 0 ? names : defaultNames;
    const students = [];
    
    for (let i = 0; i < count; i++) {
        const name = nameList[i % nameList.length];
        students.push(generateStudentData(name));
    }
    
    return students;
}; 