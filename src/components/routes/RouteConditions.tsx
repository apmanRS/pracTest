import Grid from "@mui/material/Grid";
import SouthIcon from "@mui/icons-material/South";
import { makeStyles } from "@material-ui/styles";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { RouteData } from "../../interfaces/Routes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

type RouteConditionsProps = {
  routeData: RouteData[];
};

const defaultTitle = "Delayed Routes";
const noDataMessage = "No information";
const greenTrigger = 50;
const yellowTrigger = 30;
const dotSize = 10;
const defaultBackgroundColor = "#161D27";
const defaultForegroundColor = "#BEBEBE";

//#region Styles
const innerStyles = makeStyles({
  widget: {
    fontSize: "18px",
    color: "#D9D9D9",
    "& .MuiAccordion-root": {
      backgroundColor: "#161D27",
    },
    "& .MuiAccordionSummary-root": {
      borderBottom: "2px solid #1F2630",
      minHeight: "unset",
    },
    "& .MuiAccordionSummary-content": {
      margin: "0 !important",
      marginTop: "10px !important",
      marginBottom: "10px !important",
    },
    "& .MuiGrid-item": {
      marginBottom: "8px",
    },
  },
  routeContainer: {
    borderBottom: "2px solid #1F2630",
    paddingTop: "8px",
    paddingBottom: 0,
    "&:last-child": {
      borderBottom: 0,
    },
  },
  distLabel: {
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
    fontSize: "16px",
    color: "#747B83",
    paddingRight: "10px",
  },
  timeLabel: {
    color: "#FBFAFB",
    fontSize: "24px",
    display: "flex",
    alignItems: "end",
    justifyContent: "end",
    paddingRight: "10px",
    "& .units": {
      fontSize: "14px",
      marginLeft: "4px",
      lineHeight: "24px",
    },
  },
  nameBlock: {
    display: "flex",
    justifyContent: "start",
    "&.fromTo": {
      color: "#747B83",
      fontSize: "small",
      display: "flex",
      flexDirection: "column",
      "& .MuiGrid-item": {
        display: "flex",
        justifyContent: "start",
      },
    },
  },
  dot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
//#endregion

const RouteConditions = (props: RouteConditionsProps) => {
  const { routeData } = props;
  const styles = innerStyles();
  const [expanded, setExpanded] = useState(true);
  const doExpand = () => {
    setExpanded(!expanded);
  };

  /**
   * Calculates average speed in kph use this to
   * return a coloured dot
   * @param dist Distance Travelled in km
   * @param travelTime Time take in minutes
   * @returns dot representing average speed
   */
  const getDot = (dist: number, travelTime: number) => {
    const avSpeed = Math.ceil((dist / travelTime) * 60);
    console.log(dist, travelTime, avSpeed);
    const color = avSpeed > greenTrigger ? "green" : avSpeed > yellowTrigger ? "yellow" : "red";
    return (
      <div
        style={{
          borderRadius: dotSize / 2,
          backgroundColor: color,
          height: dotSize,
          width: dotSize,
        }}
      ></div>
    );
  };

  /**
   * Created the output row for a Rampp
   * @param routeData
   * @returns formated Grid container with display
   */
  const drawDataBlock = (routeData: RouteData) => {
    return (
      <Grid container key={`rc-${routeData.id}`} className={styles.routeContainer}>
        <Grid item xs={1} className={styles.dot}>
          {getDot(routeData.distance, routeData.time)}
        </Grid>
        <Grid item xs={8} className={styles.nameBlock}>
          {routeData.name}
        </Grid>
        <Grid item xs={3} className={styles.distLabel}>
          {routeData.distance}km
        </Grid>
        <Grid item xs={1} className={styles.dot}>
          <SouthIcon />
        </Grid>
        <Grid item xs={8} className={`${styles.nameBlock} fromTo`}>
          <Grid item xs={12}>
            {routeData.from}
          </Grid>
          <Grid item xs={12}>
            {routeData.to}
          </Grid>
        </Grid>
        <Grid item xs={3} className={styles.timeLabel}>
          {routeData.time}
          <span className="units">min</span>
        </Grid>
      </Grid>
    );
  };

  return (
    <Accordion
      expanded={expanded}
      onClick={() => doExpand()}
      className={styles.widget}
      style={{
        backgroundColor: defaultBackgroundColor,
        color: defaultForegroundColor,
        border: "2px solid #1F2630",
      }}
    >
      <AccordionSummary
        style={{ borderBottom: expanded ? "" : "none" }}
        expandIcon={<ExpandMoreIcon style={{ color: "#BEBEBE" }} />}
      >
        {defaultTitle}
      </AccordionSummary>
      <AccordionDetails style={{ padding: 0 }}>
        {routeData && routeData.length > 0 ? (
          <div>
            {routeData &&
              routeData.map((rte) => {
                return drawDataBlock(rte);
              })}
          </div>
        ) : (
          <div>{noDataMessage}</div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default RouteConditions;
