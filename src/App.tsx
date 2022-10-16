import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import WeatherOverview from "./components/weather/WeatherOverview";
import Sidebar from "./Views/Sidebar";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";

function App() {
  const [tomorrowChanceOfRain, setTomorrowChanceOfRain] = useState<
    number | undefined
  >(undefined);
  const setChanceOfRain = (val: any) => {
    setTomorrowChanceOfRain(val);
  };
  const [routeOverrides, setRouteOverrides] = useState<{
    [rteId: number]: number;
  }>({});
  const setRouteDelay = (rteId: number, val: any) => {
    let currentDelays = { ...routeOverrides };
    if (val == "undefined") delete currentDelays[rteId];
    else currentDelays[rteId] = val;
    setRouteOverrides(currentDelays);
  };

  const drawRouteDelayChanger = (rteId: number) => {
    return (
      <Grid
        item
        xs={12}
        key={`route${rteId}`}
        style={{ display: "flex", alignItems: "center" }}
      >
        Route {rteId}
        <FormControl>
          <RadioGroup
            style={{ marginLeft: "25px" }}
            name={`route${rteId}`}
            row
            onChange={(val) => setRouteDelay(rteId, val.target.value)}
          >
            <FormControlLabel
              value="undefined"
              control={<Radio />}
              label="Default"
            />
            <FormControlLabel value="90" control={<Radio />} label="Major" />
            <FormControlLabel value="40" control={<Radio />} label="Average" />
            <FormControlLabel value="10" control={<Radio />} label="Minimal" />
          </RadioGroup>
        </FormControl>
      </Grid>
    );
  };

  return (
    <div className="App">
      <div className="row">
        <div className="leftColumn">
          <Sidebar
            tomorrowChanceOfRain={tomorrowChanceOfRain}
            routeOverrides={routeOverrides}
          />
        </div>
        <div className="mainPage">
          <Grid container>
            <Grid item xs={12}>
              <Paper style={{ padding: 15, margin: "25px", marginLeft: 0 }}>
                <p>
                  Thanks for the opportunity to interview for your company.
                  <br />I enjoy doing this type of thing, and unless you give me
                  a timebox I could just tinker forever.
                </p>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: 15, margin: "25px", marginLeft: 0 }}>
                <strong>Weather Component</strong>
                <p>
                  Even though you said the weather component could be hard
                  coded, I've made it a little interactive.
                  <br />
                  The source is drawn from seed data, based on your image in the
                  pdf.
                  <br />
                  I've added a bit of validation and an opportinity for you to
                  play god and change the outlook for tomorrow.
                </p>
                <FormControl>
                  <RadioGroup
                    name="weather"
                    row
                    onChange={(val) => setChanceOfRain(val.target.value)}
                  >
                    <FormControlLabel
                      value="undefined"
                      control={<Radio />}
                      label="Default"
                    />
                    <FormControlLabel
                      value="20"
                      control={<Radio />}
                      label="Sunny"
                    />
                    <FormControlLabel
                      value="60"
                      control={<Radio />}
                      label="Cloudy"
                    />
                    <FormControlLabel
                      value="90"
                      control={<Radio />}
                      label="Storm"
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: 15, margin: "25px", marginLeft: 0 }}>
                <strong>Route Conditions</strong>
                <p>
                  There are also ways to tweak the route conditions in the
                  sidebar code
                </p>
                <p>
                  Or change the delay here and the coloured dot will change in
                  the Delayed Routes Component.
                </p>
                <Grid container>
                  {[1, 2, 3, 4].map((rteId) => drawRouteDelayChanger(rteId))}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: 15, margin: "25px", marginLeft: 0 }}>
                <strong>Ramp Chart</strong>
                <p>
                  I let the side down a bit on the only truly dynamic bit of the
                  test, and that is the Ramp Chart.
                  <br />
                  Yes, it draws information from the little api-ish bit you
                  supplied, but my machine was getting a bit of a race condition
                  and sometimes updating at "weird" intervals. So I put a
                  wrapper inside the update to ensure it had been at least 500ms
                  since the update. This was an effort to stop a super flashing
                  display.
                </p>
                <p>
                  Again, I could go at this for days but I went with a
                  google-charts pie chart, and struggled a bit with it to make
                  it look like yours.
                </p>
                <p>
                  If my lawn wasn't quite so long, and it wasn't Sunday I
                  probably would have had a look around for a more suitable
                  library, or in-fact done my own HTML5 canvas so I can set up
                  everything just the way I want it.
                </p>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;
