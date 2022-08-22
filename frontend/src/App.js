import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SkillList from "./components/SkillList";

function App() {
  return (
    <div className="App">
      <header># To Do</header>
      <SkillList title="Front End" />
      <SkillList title="Back End" />
    </div>
  );
}

export default App;
