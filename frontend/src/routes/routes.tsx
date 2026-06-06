import React,{useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Varification from "../pages/auth/login/varification/Varification";
import OtpPage from "../pages/auth/register/otpPage/OtpPage";
// import OtpPage from "../components/shared/mainProgressBar/MainProgressBar";
import ThankYou from "../pages/auth/register/thankYou/ThankYou";
import Dashboard from "../features/dashboard/dashboard/Dashboard";
import UiElements from "../features/uiElements/UiElements";
import RoutesWrapper from "../routes/RoutesWrapper";
import Landingpage from "../features/landingPage/landingPage/LandingPage";
import Courses from "../features/courses/Courses";
import CourseBuilder from "../features/courseBuilder/CourseBuilder";
import PricingPlans from "../features/pricingPlans/pricingPlans/PricingPlans";
import Quizes from "../features/quizes/Quizes";
import QuizBuilder from "../features/quizBuilder/quizBuilder/QuizBuilder";
import Register from "../pages/auth/register/Register";
import TeacherDashboard from "../features/teacherDashboard/dashboard/Dashboard";
// import SchoolDashboard from "../features/schools/schoolDashboard/SchoolDashboard";
import CoursesDashboard from "../features/teacherDashboard/createCourse/courseManagement/courseManagement";
import SelectYourSchool from "../features/schools/selectYourSchoolTemplete/SelectYourSchoolTemplete";
import LearningProducts from "../features/schools/flashcard/Flashcard";
import CourseProduct from "../features/teacherDashboard/createCourse/createCourse/CreateCourse";
import "../assets/styles/main.scss";
import OrganizationSetup from "../features/organizations/createOrganization/organization";
import SchoolSetup from "../features/schools/school/school";
import LmsSetup from "../features/lmsSetup/LmsSetup";
import Course from "../features/teacherDashboard/createCourse/courseContainer/course/Course";
import CourseContainer from "../features/teacherDashboard/createCourse/courseContainer/CourseContainer";
import OrganizationDashboard from "../features/organizations/organizationDashboard/DashBoard";
import Footer from "../components/shared/footer/Footer";
import PricingHeader from "../features/pricingPlans/pricingHeader/PricingHeader";
import Header from "../components/shared/Header/Header";
import ListOfOrganization from "../features/organizations/listOfOrganization/ListOfOrganization";
import CourseManagementModal from "../features/organizations/courseManagementModal/CourseManagementModal";
import CourseBuilderDashboard from "../features/courseBuilder/courseDashboard/CourseDashboard";
function AppRoutes() {
const [isSidebarCollapsed, setIsSidebarCollapsed]=useState(false);
  return (
    <div className="App">
      <Router>
        <Header/>
        <RoutesWrapper>
          <Routes>
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/landingpage" element={<Landingpage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/create-course" element={<CourseBuilder />} />
            <Route path="/ui-elements" element={<UiElements />} />
            <Route path="/teacher" element={<TeacherDashboard/>} />
            <Route path="/quiz" element={<Quizes />} />
            <Route path="/create-quiz" element={<QuizBuilder />} />
            <Route path="/course-builder" element={<CourseBuilderDashboard isSidebarCollapsed={isSidebarCollapsed}/>} />
            {/* <Route path="/organization-dashboard" element={<SchoolDashboard />} /> */}
            <Route path="/school-setup" element={<SchoolSetup />} />
            <Route path="/select-school" element={<SelectYourSchool />} />
            <Route
              path="/teacher/learningProducts"
              element={<LearningProducts />}
            />
            <Route path="/create-course" element={<CourseProduct />} />
            <Route path="/organization" element={<OrganizationSetup />} />
            {/* <Route path="/teacher" element={<PrivateRoute component={TeacherDashboard}  />} /> */}
            <Route path="/lms-setup" element={<LmsSetup />} />

            <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
            <Route path="/list-of-organization" element={<ListOfOrganization />} />




            <Route path="/register" element={< Register />} />
            <Route path="/varification" element={<Varification />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/kkk" element={<CourseContainer />} />
            <Route path="/" element={<PricingPlans />} />
            <Route path="/my-courses" element={<CoursesDashboard />} />
            <Route path="/course" element={<Course oncancelsave={()=>{}} handlecourseChange={()=>{}} />} />
          </Routes>
        </RoutesWrapper>
        <Footer />
      </Router>
    </div>
  );
}

export default AppRoutes;
