import Grid from "@mui/material/Grid";
import { getTomorrow, WeatherData } from "../../interfaces/Weather";
import { formatTimeForWeather } from "../Utils";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import cloudy from "../../images/cloudy.png";
import { makeStyles } from "@material-ui/styles";

type WeatherOverviewProps = {
  weatherData: WeatherData[];
};

const defaultWindUnits = "kmh";
const noWeatherMessage = "N/A";
const stormTrigger = 80;
const cloudTrigger = 40;
const stormIcon = <ThunderstormIcon />;
const cloudIcon = <CloudIcon />;
const sunIcon = <WbSunnyIcon />;

//#region Styles
const innerStyles = makeStyles({
  widget: {
    display: "flex",
    justifyContent: "center",
    fontSize: "18px",
    color: "#D9D9D9",
    "& .MuiGrid-item": {
      marginBottom: "8px",
    },
  },
  label: {
    display: "flex",
    justifyContent: "start",
    color: "#7E7E7E",
  },
  tempLabel: {
    fontSize: "62px",
    color: "#D9D9D9",
  },
  timeLabel: {
    fontSize: "14px",
    color: "#7E7E7E",
  },
  data: {
    display: "flex",
    justifyContent: "start",
  },
});
//#endregion

const WeatherOverview = (props: WeatherOverviewProps) => {
  const { weatherData } = props;
  const styles = innerStyles();

  /**
   * Get the weather for a given date
   * @param date JS Date to find
   * @returns WeatherData | undefined
   */
  const getWeather = (date: Date) => {
    if (!Date) return;
    const theWeather = weatherData.find(
      (wd) => wd.date.toDateString() === new Date(date).toDateString()
    );
    return theWeather;
  };

  /**
   * Uses the constants stormTrigger and cloudTrigger to return an icon
   * @param cor - number | null Chance Of Rain - assume a number 0 - 100
   * @returns
   */
  const getWeatherIcon = (cor: number | null) => {
    if (!cor) return;
    return cor > stormTrigger ? stormIcon : cor > cloudTrigger ? cloudIcon : sunIcon;
  };

  /**
   * Return a div to summarize tomorrows weather
   * @param tWeather - weather data
   * @returns <div> containing the weather summary temp & icon
   */
  const getTomorrowSummary = (tWeather: WeatherData | null | undefined) => {
    return tWeather ? (
      <div style={{ display: "flex", alignItems: "center" }}>
        {`${tWeather.temperature.max}`}&deg; {getWeatherIcon(tWeather.chanceOfRain)}
      </div>
    ) : (
      <div>{noWeatherMessage}</div>
    );
  };

  const todayWeather = getWeather(new Date());
  const tomorrowWeather = getWeather(getTomorrow()) || null;

  return todayWeather ? (
    <div className={styles.widget}>
      <Grid container style={{ width: "70%" }}>
        <Grid item xs={6} className={styles.label} style={{ display: "block" }}>
          <div>{todayWeather.location_name}</div>
          <div className={styles.tempLabel}>{todayWeather?.temperature.max}&deg;</div>
          <div className={styles.timeLabel}>{formatTimeForWeather(new Date())}</div>
        </Grid>
        <Grid item xs={6}>
          <img src={cloudy} alt="cloudy img from pdf" />
        </Grid>
        <Grid item xs={8} className={styles.label}>
          Humidity
        </Grid>
        <Grid item xs={4} className={styles.data}>
          {`${todayWeather.humidity.max}%`}
        </Grid>
        <Grid item xs={8} className={styles.label}>
          Chance of Rain
        </Grid>
        <Grid item xs={4} className={styles.data}>
          {`${todayWeather.chanceOfRain}%`}
        </Grid>
        <Grid item xs={8} className={styles.label}>
          Wind
        </Grid>
        <Grid item xs={4} className={styles.data}>
          {`${todayWeather.wind.max} ${defaultWindUnits}`}
        </Grid>
        <Grid item xs={8} className={styles.label}>
          Tomorrow
        </Grid>
        <Grid item xs={4} className={styles.data}>
          {getTomorrowSummary(tomorrowWeather)}
        </Grid>
      </Grid>
    </div>
  ) : (
    <div>{noWeatherMessage}</div>
  );
};

export default WeatherOverview;
