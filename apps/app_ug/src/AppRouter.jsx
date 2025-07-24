import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
import { GroupRouterSegment as GroupRouterSegmentUG2, UserRouterSegment as UserRouterSegmentUG2 } from "@hrbolek/uoisfrontend-ug2";
import { SchemaRouterSegment } from "@hrbolek/uoisfrontend-all";

import { UserRouterSegments } from "@hrbolek/uoisfrontend-all";
import { SchemaTypeRouterSegment } from "../../../packages/all/src/SchemaType/Pages/SchemaTypeRouterSegment";
import { GroupRouterSegments } from "../../../packages/all/src/GroupGQLModel";
import { StateMachineRouterSegments } from "../../../packages/all/src/StateMachineGQLModel";


import { ProgramRouterSegments } from "../../../packages/all/src/ProgramGQLModel";
import { SubjectRouterSegments } from "../../../packages/all/src/SubjectGQLModel";
import { SemesterRouterSegments } from "../../../packages/all/src/SemesterGQLModel";
import { StudentRouterSegments } from "../../../packages/all/src/StudentGQLModel";

import { AdmissionRouterSegments } from "../../../packages/all/src/AdmissionGQLModel";
import { PaymentInfoRouterSegments } from "../../../packages/all/src/PaymentInfoGQLModel";
import { PaymentRouterSegments } from "../../../packages/all/src/PaymentGQLModel";

import { StudyPlanRouterSegments } from "../../../packages/all/src/StudyPlanGQLModel";
import { StudyPlanLessonRouterSegments } from "../../../packages/all/src/StudyPlanLessonGQLModel";
import { StateRouterSegments } from "../../../packages/all/src/StateGQLModel";

// Import our simple admission route
import { AdmissionRouterSegment } from "../../../packages/z_pack/src/Admission/Pages/AdmissionRouterSegment";
import { AdmissionPage } from "../../../packages/z_pack/src/Admission/Pages/AdmissionPage";

// Import admission creation component
import { AdmissionInsert } from "../../../packages/z_pack/src/Admission/Components/AdmissionInsert";

// Test page component
const AdmissionTestPage = () => {
    // Generate a valid UUID for testing
    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const testUUID = generateUUID();

    return (
        <div className="container mt-4">
            <h1>Admission Test Page</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Create New Admission</h5>
                        </div>
                        <div className="card-body">
                            <AdmissionInsert 
                                program={{id: "0ac1761b-0ec7-4fc2-b4d7-127e79a316eb"}}
                                onDone={(admission) => {
                                    console.log("Admission created:", admission);
                                    // You could redirect here or show a success message
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Test Links</h5>
                        </div>
                        <div className="card-body">
                            <p>Test these admission URLs (using valid UUIDs):</p>
                            <ul className="list-unstyled">
                                <li><a href="/admission/admission/editable/aef97215-8fa1-4595-9f98-c6be672a7809" className="btn btn-sm btn-outline-primary">View Test Admission (Real UUID)</a></li>
                                <li><a href={`/admission/admission/editable/${testUUID}`} className="btn btn-sm btn-outline-primary">View Random Test Admission</a></li>
                                <li><a href="/admission/admission/editable/12345678-1234-1234-1234-123456789012" className="btn btn-sm btn-outline-primary">View Non-existent Admission</a></li>
                            </ul>
                            <div className="mt-3">
                                <p><strong>Note:</strong> Admission IDs must be valid UUIDs (like: <code>aef97215-8fa1-4595-9f98-c6be672a7809</code>)</p>
                                <p><strong>Current test UUID:</strong> <code>{testUUID}</code></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Routes = [
    UserRouterSegmentUG2,
    GroupRouterSegmentUG2,
    SchemaRouterSegment,
    SchemaTypeRouterSegment,

    ...UserRouterSegments,
    ...GroupRouterSegments,
    ...StateMachineRouterSegments,
    ...StateRouterSegments,

    ...ProgramRouterSegments,
    ...SubjectRouterSegments,
    ...SemesterRouterSegments,
    
    ...StudentRouterSegments,

    ...AdmissionRouterSegments,
    ...PaymentInfoRouterSegments,
    ...PaymentRouterSegments,

    ...StudyPlanRouterSegments,
    ...StudyPlanLessonRouterSegments,
    
    // Add our simple admission route
    AdmissionRouterSegment,
    
    // Direct route pattern like in working implementation
    {
        path: '/admission/admission/editable/:id',
        element: <AdmissionPage />
    },
    
    // Test page for creating and testing admissions
    {
        path: '/admission-test',
        element: <AdmissionTestPage />
    }
]

// Debug: Log the admission routes
console.log('AdmissionRouterSegments:', AdmissionRouterSegments);
console.log('All Routes:', Routes);

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

