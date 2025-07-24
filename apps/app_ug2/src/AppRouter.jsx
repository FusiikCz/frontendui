
import { ProgramPage, ProgramRouterSegment, SubjectRouterSegment } from "@hrbolek/uoisfrontend-zp";
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

// Import the proper GraphQL-enabled admission components
import { AdmissionPage, StudentPage, ExamPage } from "@hrbolek/uoisfrontend-admissions";
  
// import { UserRouterSegment } from "@hrbolek/uoisfrontend-ug2";

export const Routes = [
    // UserRouterSegment
    {   //http://localhost:5173/program/program/view/0ac1761b-0ec7-4fc2-b4d7-127e79a316eb
        path: "/hello/:id",
        element: <ProgramPage />
    },
    ProgramRouterSegment,
    SubjectRouterSegment,
    
    // Admission routes with proper GraphQL components
    {
        path: '/admission/admission/editable/:id',
        element: <AdmissionPage />
    },
    {
        path: '/admission/student/view/:id',
        element: <StudentPage />
    },
    {
        path: '/student/student/view/:id',
        element: <StudentPage />
    },
    {
        path: '/admission/exam/view/:id',
        element: <ExamPage />
    },
    
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

