import { Fragment } from "react";
import RampChart from "../components/ramps/RampChart";
import RouteConditions from "../components/routes/RouteConditions";
import WeatherOverview from "../components/weather/WeatherOverview";
import { SampleRoutes } from "../interfaces/Routes";
import { getTomorrow, SampleWeatherData } from "../interfaces/Weather";

type SidebarProps = {
  tomorrowChanceOfRain?: number;
  routeOverrides?: { [rteId: number]: number };
};

const Sidebar = (props: SidebarProps) => {
  const { tomorrowChanceOfRain, routeOverrides } = props;

  //#region WEATHER DATA
  /**
   * SampleWeatherData is in ./interfaces/Weather.tsx
   *
   * DEMO WEATHER
   * tomorrow chanceOfRain is used to choose the icon for sub/cloud/storm
   *      value > 80 is storm trigger
   *      value > 40 is cloud trigger
   *      value else sunny
   *
   * Set demoWeather true and change the tomorrowTrigger to see the icon
   * change for tomorrow
   *
   */

  const demoWeather = tomorrowChanceOfRain ? true : false;
  const tomorrowTrigger = tomorrowChanceOfRain || 90;
  /**
   * Instead of just using the data given in the test spec make the component
   * a bit more responsive to data changes for effect
   */
  const weatherDataForDisplay = SampleWeatherData["14"].map((weather) => {
    let chanceOfRain = weather.chanceOfRain;
    if (demoWeather && weather.date.toDateString() === getTomorrow().toDateString())
      chanceOfRain = tomorrowTrigger;
    return { ...weather, chanceOfRain };
  });
  //#endregion

  //#region ROUTE DATA
  /**
   * SampleRoutes are in ./interfaces/Routes.tsx
   *
   * DEMO ROUTES
   * delayOverrides is an dictionary of [rteId]:value used for the coloured dot
   *      value > 60 displays red
   *      value > 30 display yellow
   *      value else green
   *
   * Set demoRoutes true and change the delayOverrides to see the dots colour
   * change on the delayed routes
   */
  const demoRoutes = routeOverrides ? true : false;
  const delayOverrides: { [rteId: number]: number } = routeOverrides
    ? { ...routeOverrides }
    : {
        1: 30,
        2: 30,
        3: 90,
        4: 50,
      };

  /**
   * could have just loaded the route data as per the test spec, but wanted to
   * enable a method of showing dynamic component and overrides
   */
  const routeDataForDisplay = SampleRoutes.map((rte) => {
    // if not demo, just use the route delay, otherwise if a delayOverride for
    // this route-id then use that
    const travelTimeToUse = !demoRoutes
      ? rte.time
      : delayOverrides[rte.id]
      ? delayOverrides[rte.id]
      : rte.time;
    return { ...rte, time: travelTimeToUse };
  });
  //#endregion

  return (
    <Fragment>
      <div style={{ marginBottom: "12px" }}>
        <WeatherOverview weatherData={weatherDataForDisplay} />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <RouteConditions routeData={routeDataForDisplay} />
      </div>
      <div>
        <RampChart />
      </div>
    </Fragment>
  );
};

export default Sidebar;
