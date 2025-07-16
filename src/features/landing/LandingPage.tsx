import ChooseSection from "./components/ChooseSection"
import CoursesSection from "./components/CoursesSection"
import HeroSection from "./components/HeroSection"
import ReadySection from "./components/ReadySection"
import RolesSection from "./components/RolesSection"
import SecureSection from "./components/SecureSection"
import { Helmet } from 'react-helmet-async';

function LandingPage() {
  return (
    <>
      <Helmet>
        <title>LevelUp LMS - Modern Learning Management System</title>
        <meta name="description" content="LevelUp is a modern LMS for students, instructors, and organizations. Interactive courses, progress tracking, certificates, and more." />
        {/* Open Graph */}
        <meta property="og:title" content="LevelUp LMS - Modern Learning Management System" />
        <meta property="og:description" content="LevelUp is a modern LMS for students, instructors, and organizations. Interactive courses, progress tracking, certificates, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-lms-domain.com/" />
        <meta property="og:image" content="/vite.svg" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LevelUp LMS - Modern Learning Management System" />
        <meta name="twitter:description" content="LevelUp is a modern LMS for students, instructors, and organizations. Interactive courses, progress tracking, certificates, and more." />
        <meta name="twitter:image" content="/vite.svg" />
      </Helmet>
      <div>
        <HeroSection />
        <ChooseSection />
        <RolesSection />
        <SecureSection />
        <CoursesSection />
        <ReadySection />
      </div>
    </>
  )
}

export default LandingPage