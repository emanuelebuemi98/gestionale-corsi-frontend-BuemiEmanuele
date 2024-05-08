import { useContext} from "react";
import { Courses } from "../../components/Courses/Courses";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { CreateCourseForm } from "../../components/Courses/CreateCourseForm";
import { DeleteCourse } from "../../components/Courses/DeleteCourse";

export function CoursesPage() {

  const { user } = useContext(AuthContext);

  return (
    <div>
      <Courses />
      {user && (
        <>
          <CreateCourseForm token={user.token} />
          <DeleteCourse token={user.token} /> 
        </>
      )}
    </div>
  );
}