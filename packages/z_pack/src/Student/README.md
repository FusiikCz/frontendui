# Student Management System

This module provides a comprehensive student management system with clean, readable components and functionality.

## Features

- **Clean Student Display**: Students are displayed with name, ID, last change, and payment status
- **Clickable Student Cards**: Each student card is clickable and navigates to the student detail page
- **Admission Information**: Integrated admission info showing payment status and admission details
- **Random Student Generation**: Button in navbar to generate 5 random students
- **Responsive Design**: Cards adapt to different screen sizes
- **Modern UI**: Clean, modern interface with hover effects and proper styling

## Components

### StudentMediumContent
Displays student information in a clean format including:
- Student name and ID
- Last change timestamp
- Payment status for admission

### StudentMediumCard
A clickable card component that wraps student content and admission info.

### StudentAdmissionInfo
Shows admission information with payment status, amounts, and dates.

### StudentPageNavbar
Navigation bar with student segments and a generate button.

## Data Structure

Students have the following structure:
```javascript
{
  id: number,
  name: string,
  lastChange: string, // ISO date string
  payment: {
    id: string,
    paymentInfo: {
      paid: boolean,
      amount: number,
      paymentDate: string, // ISO date string or null
      admission: {
        id: string,
        name: string
      }
    }
  } | null
}
```

## Usage

### Basic Usage
```javascript
import { StudentDemoPage } from './Student/Pages/StudentDemoPage';

// Use the demo page to see the complete system
<StudentDemoPage />
```

### Generate Random Students
```javascript
import { generateRandomStudents } from './Student/Data/studentData';

const students = generateRandomStudents(5);
```

### Individual Components
```javascript
import { StudentMediumCard } from './Student/Components/StudentMediumCard';

const student = {
  id: 1,
  name: "Jan Novák",
  lastChange: "2024-01-15T10:30:00Z",
  payment: { /* payment info */ }
};

<StudentMediumCard student={student} />
```

## Demo Page

The `StudentDemoPage` component provides a complete demonstration of the system:
- Shows sample students
- Allows generating random students
- Demonstrates the full interface
- Includes search functionality (placeholder)

## Navigation

The navbar includes:
- Student segments (Historie, Role, Stavy)
- Generate button for random students
- Search functionality

## Styling

The system uses:
- Bootstrap components for layout
- React Bootstrap Icons for icons
- Inline styles for custom styling
- Hover effects for interactive elements
- Responsive grid layout

## File Structure

```
Student/
├── Components/
│   ├── StudentMediumContent.jsx
│   ├── StudentMediumCard.jsx
│   ├── StudentAdmissionInfo.jsx
│   └── ...
├── Data/
│   └── studentData.js
├── Pages/
│   ├── StudentDemoPage.jsx
│   ├── StudentPageNavbar.jsx
│   └── ...
└── Test/
    └── StudentTest.jsx
``` 