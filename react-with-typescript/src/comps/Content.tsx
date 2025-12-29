import type { CoursePart } from "../types";
import Part from "./Part";
interface CourseParts {
  courseParts: CoursePart[]
}


const Content = ({courseParts}: CourseParts) => {
  console.log(typeof(courseParts));
  console.log('courseParts---from content comp', courseParts[0]);

  return (
    <div>
      {courseParts.map((part, index) => (
        <div key={index}>
          <Part part={part} />
        </div>
      ))}
    </div>
  )
}

export default Content
