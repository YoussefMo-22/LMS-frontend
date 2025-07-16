import AssignmentTable from "../components/AssignmentTable";
import { Helmet } from 'react-helmet-async';

const Assignments = () => {
  return (
    <>
      <Helmet>
        <title>Assignments | LevelUp LMS</title>
        <meta name="description" content="View, submit, and manage your course assignments on LevelUp LMS." />
      </Helmet>
      <div className="p-6">
        <AssignmentTable />
      </div>
    </>
  );
};

export default Assignments;