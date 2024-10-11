// import SignUpJobSeeker from "./components/JobPost";
import ApplicationStatus from "./pages/ApplicationStatus";
import ApplicationStatusHr from "./pages/ApplicationStatusHr";
import JobSeekerposts from "./pages/JobSeekerposts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BotChat from "./pages/BotChat";
import SignUpHr from "./pages/SignUpHr";
import SignUpJobSeeker from "./pages/SignUpJobSeeker";
import ApplicationList from "./pages/ApplicationList";
import PostModification from "./pages/PostModification";
// import ApplicantDetails from "./components/ApplicantDetails";
import OnBoarding from "./pages/OnBoarding";
import LogIn from "./pages/LogIn";
import WhoAreYou from "./pages/WhoAreYou";
import JsresumeConsulter from "./pages/JsresumeConsulter";
import JSsetting from "./pages/JSsetting";
import HRsetting from "./pages/HRsetting";
import HRposts from "./pages/HRposts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnBoarding />,
  },
  {
    path: "/signUpHr",
    element: <SignUpHr />,
  },
  {
    path: "/signUpJobSeeker",
    element: <SignUpJobSeeker />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/whoAreYou",
    element: <WhoAreYou />,
  },

  {
    path: "/applicationStatusHr",
    element: <ApplicationStatusHr />,
  },
  {
    path: "/hrPosts",
    element: <HRposts />,
  },
  {
    path: "/applicationStatusHr/applicationList", // Nested under applicationStatusHr
    element: <ApplicationList />,
  },
  {
    path: "/applicationStatusHr/postModification", // Nested under applicationStatusHr
    element: <PostModification />,
  },
  {
    path: "/hrSetting",
    element: <HRsetting />,
  },
  {
    path: "/posts",
    element: <JobSeekerposts />,
  },
  {
    path: "/posts/interview",
    element: <BotChat />,
  },
  {
    path: "/applicationStatus",
    element: <ApplicationStatus />,
  },
  {
    path: "/resumeConsulter",
    element: <JsresumeConsulter />,
  },
  {
    path: "/JobSeekerSetting",
    element: <JSsetting />,
  },

  // {
  //   path: "/applicantDetails",
  //   element: <ApplicantDetails />,
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
