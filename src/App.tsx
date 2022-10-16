import { useState } from "react";
import "./App.css";
import Sidebar from "./views/Sidebar";
import MainPage from "./views/MainPage";

function App() {
  //#region SETUP INTERACTIONS
  const [tomorrowChanceOfRain, setTomorrowChanceOfRain] = useState<number | undefined>(undefined);
  const setChanceOfRain = (val: any) => {
    setTomorrowChanceOfRain(val);
  };

  const [routeOverrides, setRouteOverrides] = useState<{
    [rteId: number]: number;
  }>({});
  const setRouteTravelTime = (rteId: number, val: any) => {
    let currentDelays = { ...routeOverrides };
    if (val === "undefined") delete currentDelays[rteId];
    else currentDelays[rteId] = val;
    setRouteOverrides(currentDelays);
  };
  //#endregion

  return (
    <div className="App">
      <div className="row">
        <div className="leftColumn">
          <Sidebar tomorrowChanceOfRain={tomorrowChanceOfRain} routeOverrides={routeOverrides} />
        </div>
        <div className="mainPage">
          <MainPage setRouteTravelTime={setRouteTravelTime} setChanceOfRain={setChanceOfRain} />
        </div>
      </div>
    </div>
  );
}

export default App;
