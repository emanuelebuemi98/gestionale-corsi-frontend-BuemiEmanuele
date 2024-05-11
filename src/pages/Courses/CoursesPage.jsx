import { useContext} from "react";
import { Courses } from "../../components/Courses/Courses";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { CreateCourseForm } from "../../components/Courses/CreateCourseForm";
import { DeleteCourse } from "../../components/Courses/DeleteCourse";

export function CoursesPage() {

  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <div>
      <Courses />
      {user && user.isAuthorized && user.tipologia === "Admin" && (
        <>
          <CreateCourseForm token={user.token} />
          
        </>
      )}
    </div>
  );
}