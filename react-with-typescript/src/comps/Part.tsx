import type { CoursePart } from "../types"

interface PartProps {
  part: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const Part = ({ part }: PartProps) => {
  console.log('part received from content', part)
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3> {part.name} {part.exerciseCount} </h3>
          <p><em>{part.description} </em></p>
        </div>
      )
    case "background":
      return (
        <div>
          <h3> {part.name} {part.exerciseCount} </h3>
          <p><em>{part.description} </em></p>
          <p>{part.backgroundMaterial}</p>
        </div>
      )
    case "group":
      return (
        <div>
          <h3> {part.name} {part.exerciseCount} </h3>
          <p>Project exercises: {part.groupProjectCount}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <h3> {part.name} {part.exerciseCount} </h3>
          <p><em>{part.description} </em></p>
          <p>Reuired skills: {part.requirements.join(', ')}</p>
        </div>
      )
    default:
      return(assertNever(part))
  }
}

export default Part
