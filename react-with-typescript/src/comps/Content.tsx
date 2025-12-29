interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface CourseParts {
  courseParts: CoursePart[]
}


const Content = (props: CourseParts) => {
  console.log(typeof(props));
  console.log('part', props.courseParts[0]);
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <div key={index}>
          <p> {part.name} {part.exerciseCount}</p>
        </div>
      ))}
    </div>
  )
}

export default Content
