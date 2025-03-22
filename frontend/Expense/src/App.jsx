import "./App.css";
import AllRoute from "./components/AllRoute";
import DigitalClock from "./components/DigitalClock";
import LayoutIntroduce from "./layout/LayoutIntroduce";
import GoalCard from "./components/Test";
function App() {
  return (
    <>
      <AllRoute />
      {/* <LayoutIntroduce /> */}
      {/* <DigitalClock /> */}
      {/* <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <GoalCard
          name="Mercedes Car"
          target={250000000}
          progress={40}
          startDate="01/01/2024"
          endDate="12/12/2025"
        />
      </div> */}
    </>
  );
}

export default App;
