import React from 'react'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CoursePage from "./components/pages/CoursePage";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import StudentLesson from "./Student/pages/StudentLesson";
import TeacherCourses from "./Teacher/pages/TeacherCourses";
import GroupsPage from "./components/pages/GroupsPage";
import PriceAnalizPage from "./components/pages/PriceAnalizPage";
import SchedulePage from "./components/pages/SchedulePage";
import StudentsAttendans from "./components/pages/StudentsAttendans";
import DashboardPage from "./components/pages/DashboardPage";
import StudentsPage from "./components/pages/StudentsPage";
import TeacherAdd from "./Teacher/comp/TeacherAdd";
import GroupDetailPage from "./components/pages/GroupDetailPage";
import StudentSettingsPage from "./Student/pages/StudentSettingsPage";
import StudentLoginPage from "./Student/components/StudentLoginPage";
import Login from "./components/pages/Login";
import StudentTablePage from './components/pages/StudentTablePage';

function App() {
    const routes=[

        {path:'/',component:DashboardPage},
        {path:'/courses',component:CoursePage},

        {path:'/group',component:GroupsPage},
        {path:'/schedule',component:SchedulePage},
        {path:'/students',component:StudentsPage},
        {path:'/s-attends',component:StudentsAttendans},
        {path:'/price',component:PriceAnalizPage},
        {path:'/student-lesson',component:StudentLesson},
        {path:'/student-settings',component:StudentSettingsPage},
        {path:'/student-login',component:StudentLoginPage},
        {path:'/teacher-courses',component:TeacherCourses},
        {path:'/teachers',component:TeacherAdd},
        {path:'/group-detail',component:GroupDetailPage},
        {path:'/login',component:Login},

    ]
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                {routes.map((item) => (
                    <Route exact path={item.path} element={<item.component />} />
                ))}
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    </div>
  );
}

export default App;
