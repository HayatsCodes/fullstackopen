interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesc {
  description: string;
}

interface CoursePartBasic extends CoursePartBase, CoursePartDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase, CoursePartDesc {
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;


const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      )

    default:
      break;
  }
}

const Header = ({ name }: { name: string }) => (<h1>{name}</h1>)
const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.name} part={part}/>
      ))}
    </div>
  );
}

const Total = ({ amount }: { amount: number }) => (<p>Number of exercises {amount}</p>)


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total amount={totalExercises} />
    </div>
  );
};

export default App;