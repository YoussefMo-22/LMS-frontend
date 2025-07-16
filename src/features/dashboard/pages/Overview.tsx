import CourseStats from "../components/CourseStats";
import CourseChart from "../components/CourseChart";
import EarningsAndProgress from "../components/EarningsAndProgress";
import { Helmet } from 'react-helmet-async';

const Overview = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard Overview | LevelUp LMS</title>
        <meta name="description" content="View your learning stats, progress, and recent activity on your LevelUp LMS dashboard." />
      </Helmet>
      <div className="p-6 flex flex-col gap-6">
        <CourseStats />
        <CourseChart />
        <EarningsAndProgress />
      </div>
    </>
  );
};

export default Overview;