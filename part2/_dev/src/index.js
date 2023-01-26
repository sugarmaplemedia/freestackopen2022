// import { createRoot } from 'react-dom/client';
// import App from './notes/App';

// const root = createRoot(document.getElementById('root'))
// root.render(<App />)

import ReactDOM from "react-dom/client"

import App from "./notes/App"

const notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true,
    },
]

ReactDOM.createRoot(document.getElementById("root")).render(
    <App notes={notes} />
)