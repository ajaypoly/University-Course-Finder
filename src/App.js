import "./App.css";
import logo from "./assets/images/dom-fou-YRMWVcdyhmI-unsplash.jpg";
import CourseLists from "./components/CourseList";
function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" />
      <CourseLists />
    </div>
  );
}

export default App;
