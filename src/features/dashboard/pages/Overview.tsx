import CourseStats from "../components/CourseStats";
import CourseChart from "../components/CourseChart";
import EarningsAndProgress from "../components/EarningsAndProgress";

const Overview = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <CourseStats />
      <CourseChart />
      <EarningsAndProgress />
    </div>
  );
};

export default Overview;