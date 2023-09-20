/* eslint-disable react/prop-types */
const Header = (props) => {
  return (
    <>
      <h1> {props.course} </h1>
    </>
  );
};

const Content = (props) => {
  return (
    // <>
    //   <Part part={props.part1} exercises={props.exercises1}></Part>
    //   <Part part={props.part2} exercises={props.exercises2}></Part>
    //   <Part part={props.part3} exercises={props.exercises3}></Part>
    // </>
    <>
    <p> {props.parts[0].name} {props.parts[0].exercises} </p>
    <p> {props.parts[1].name} {props.parts[1].exercises} </p>
    <p> {props.parts[2].name} {props.parts[2].exercises} </p>
  </>
  );
};

// const Part  = (props) => {
//   return (
//     <>
//       <p> {props.part[0].name} {props.part[0].exercises} </p>
//       <p> {props.part[1].name} {props.part[1].exercises} </p>
//       <p> {props.part[2].name} {props.part[2].exercises} </p>
//     </>
//   )
// }

const Total = (props) => {
  return (
    <>
      <p>Number of exercises { props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = "Half Stack application development";

  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
