const Header = ({ children }) => <h2>{children}</h2>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
const Total = ({ dataset, values }) => <p><strong>total of {dataset.reduce((sum, item) => sum + item[values], 0)} {values}</strong></p>

const Content = ({ parts }) => (
    <main>
        {parts.map(item => 
            <Part key={item.id} part={item} />
        )}
        <Total dataset={parts} values={"exercises"} />
    </main>
)

const Course = ({ course }) => (
    <div>
        <Header>{course.name}</Header>
        <Content parts={course.parts} />
        {/* <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises} /> */}
    </div>   
)

export default Course;