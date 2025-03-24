import "./App.css";
import AllRoute from "./components/AllRoute";
// import React, { useState } from "react";
function App() {
  // const [isOpen, setIsOpen] = useState(false);

  // return (
  // <div style={{ textAlign: "center", marginTop: "50px" }}>
  //   <Button type="primary" onClick={() => setIsOpen(true)}>
  //     Mở Modal
  //   </Button>
  //   <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  // </div>
  // );
  return (
    //   <>
    <AllRoute />
    //     {/* <LayoutIntroduce /> */}
    //     {/* <div
    //       style={{ display: "flex", justifyContent: "center", padding: "20px" }}
    //     >
    //       <GoalCard
    //         name="Mercedes Car"
    //         target={250000000}
    //         progress={40}
    //         startDate="01/01/2024"
    //         endDate="12/12/2025"
    //       />
    //     </div> */}
    //     <AuthForm />
    //   </>
  );
}

export default App;
