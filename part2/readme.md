# Fullstack Part 2
## Usage
I switched my development environment from `create-react-app` to `Vite` because `Vite` is quite a bit better. Also, to simplify my programs' usage, there is no need to run individual Node/Express environments for each program; just run them in the dev environment!
### Program names
- courses
- notes
- phonebook
- countries
### How to change program
In `src/main.jsx`, change Line 3's import statement URI to match any of the previous program names. Then, run `npm run dev` to start the Vite server.
In programs requiring a JSON Server to view, run `npm run {program}-server` in the CLI alongside the Vite server.