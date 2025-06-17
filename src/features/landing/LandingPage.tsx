import ChooseSection from "./components/ChooseSection"
import CoursesSection from "./components/CoursesSection"
import HeroSection from "./components/HeroSection"
import ReadySection from "./components/ReadySection"
import RolesSection from "./components/RolesSection"
import SecureSection from "./components/SecureSection"

function LandingPage() {
  return (
    <div>
        <HeroSection />
        <ChooseSection />
        <RolesSection />
        <SecureSection />
        <CoursesSection />
        <ReadySection />
    </div>
  )
}

export default LandingPage