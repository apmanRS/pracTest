import { FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup } from "@mui/material";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import { SampleRoutes } from "../interfaces/Routes";

type MainPageProps = {
  setRouteTravelTime: any;
  setChanceOfRain: any;
};

/**
 * A page with a few interactive elements to show event handling
 * and response to user input
 *
 * @param props - change functions from parent
 * @returns
 */
const MainPage = (props: MainPageProps) => {
  const { setChanceOfRain, setRouteTravelTime } = props;

  const drawRouteDelayChanger = (rteInfo: any) => {
    const rteId: number = rteInfo[0];
    const options: number[] = rteInfo[1];
    const thisRoute = SampleRoutes.find((rte) => rte.id === rteId);
    const routeName = thisRoute ? thisRoute.name : `Route ${rteId}`;
    return (
      <Grid item xs={12} key={`route${rteId}`} style={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={2}>
          {routeName}
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <RadioGroup
              style={{ marginLeft: "25px" }}
              name={`route${rteId}`}
              row
              onChange={(val) => setRouteTravelTime(rteId, val.target.value)}
            >
              <FormControlLabel value="undefined" control={<Radio />} label="Default" />
              <FormControlLabel value={options[0]} control={<Radio />} label="Major" />
              <FormControlLabel value={options[1]} control={<Radio />} label="Average" />
              <FormControlLabel value={options[2]} control={<Radio />} label="Minimal" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper style={{ padding: 15, margin: "25px", marginLeft: 0 }}>
          <p>
            Thanks for the opportunity to interview for your company.
            <br />I enjoy doing this type of thing, and unless you give me a timebox I could just
            tinker forever.
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: 15, margin: "25px", marginLeft: 0 }}>
          <strong>Weather Component</strong>
          <p>
            Even though you said the weather component could be hard coded, I've made it a little
            interactive.
            <br />
            The source is drawn from seed data, based on your image in the pdf.
            <br />
            I've added a bit of validation and an opportinity for you to play god and change the
            outlook for tomorrow.
          </p>
          <FormControl>
            <RadioGroup name="weather" row onChange={(val) => setChanceOfRain(val.target.value)}>
              <FormControlLabel value="undefined" control={<Radio />} label="Default" />
              <FormControlLabel value="20" control={<Radio />} label={<WbSunnyIcon />} />
              <FormControlLabel value="60" control={<Radio />} label={<CloudIcon />} />
              <FormControlLabel value="90" control={<Radio />} label={<ThunderstormIcon />} />
            </RadioGroup>
          </FormControl>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: 15, margin: "25px", marginLeft: 0 }}>
          <strong>Route Conditions</strong>
          <p>There are also ways to tweak the route conditions in the sidebar code</p>
          <p>
            Or change the delay here and the coloured dot will change in the Delayed Routes
            Component.
          </p>
          <pre>
            This section uses a multi-dimensional array to define;
            <br />
            [routeId, [long time,avg time,quick time]] then uses .map
            <br />
            to build each row, and pass the chosen travel time and routeId back to the sidebar from
            the onChange event.
            <br />
            data: [[1, [45, 25, 10]], [2, [48, 28, 12]], [3, [20, 9, 5]], [4, [42, 26, 13]]]
          </pre>
          <Grid container>
            {[
              [1, [45, 25, 10]],
              [2, [48, 28, 12]],
              [3, [20, 9, 5]],
              [4, [42, 26, 13]],
            ].map((rteInfo) => drawRouteDelayChanger(rteInfo))}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: 15, margin: "25px", marginLeft: 0 }}>
          <strong>Ramp Chart</strong>
          <p>
            I let the side down a bit on the only truly dynamic bit of the test, and that is the
            Ramp Chart.
            <br />
            Yes, it draws information from the little api-ish bit you supplied, but my machine was
            getting a bit of a race condition and sometimes updating at "weird" intervals. So I put
            a wrapper inside the update to ensure it had been at least 500ms since the update. This
            was an effort to stop a super flashing display.
          </p>
          <p>
            Again, I could go at this for days but I went with a google-charts pie chart, and
            struggled a bit with it to make it look like yours.
          </p>
          <p>
            If my lawn wasn't quite so long, and it wasn't Sunday I probably would have had a look
            around for a more suitable library, or in-fact done my own HTML5 canvas so I can set up
            everything just the way I want it.
          </p>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainPage;
