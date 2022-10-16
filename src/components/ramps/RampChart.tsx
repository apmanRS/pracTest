import { makeStyles } from "@material-ui/styles";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { NONAME } from "dns";
import { rmSync } from "fs";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import getRampAlgorithms from "../../api/Api";
import { RampData } from "../../interfaces/Ramps";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//#region Styles
const innerStyles = makeStyles({
  widget: {
    fontSize: "18px",
    color: "#D9D9D9",
    "& .MuiGrid-item": {
      marginBottom: "8px",
    },
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
  },
  data: {
    display: "flex",
    justifyContent: "start",
  },
});
//#endregion

export const seedData = [
  ["Algorithm", "Percentage"],
  ["Algorithm 1", 0],
  ["Algorithm 2", 0],
  ["Algorithm 3", 0],
  ["Algorithm 4", 0],
  ["Algorithm 5", 0], // CSS-style declaration
];

export const options = {
  legend: "none",
  pieHole: 0.65,
  is3D: false,
  chartArea: { left: 40, top: 40, bottom: 40, right: 40 },
  backgroundColor: "#000000",
  colors: ["#70D8D1", "#92E3DD", "#B3E3E0", "#6ED8D1", "#20B5A8"],
  slices: {
    0: { textStyle: { color: "#000000" } },
    1: { textStyle: { color: "#000000" } },
    2: { textStyle: { color: "#000000" } },
    3: { textStyle: { color: "#000000" } },
    4: { textStyle: { color: "#000000" } },
    5: { textStyle: { color: "#000000" } },
  },
  animation: {
    duration: 500,
    easing: "out",
    startup: true,
  },
};

const idealUpdateTime = 500; // to avoid race conditions from dodgy api response only refresh display this often
const defaultTitle = "Ramp Chart";
const noDataMessage = "No information";
const defaultBackgroundColor = "#161D27";
const defaultForegroundColor = "#BEBEBE";

const RampChart = () => {
  const styles = innerStyles();
  const [rampData, setRampData] = useState<RampData[]>([]);
  const [data, setData] = useState<(string | number)[][]>([]);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const doExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getRampAlgorithms((ramps: RampData[]) => {
      if (ramps && ramps.length > 0) setRampData(ramps);
    });
  }, []);

  useEffect(() => {
    if (rampData && rampData.length > 0) {
      const tsl = new Date().getTime() - lastUpdate;
      const newData = [
        ["Algorithm", "Percentage"],
        ["Algorithm 1", getPercentage("Algorithm 1", rampData)],
        ["Algorithm 2", getPercentage("Algorithm 2", rampData)],
        ["Algorithm 3", getPercentage("Algorithm 3", rampData)],
        ["Algorithm 4", getPercentage("Algorithm 4", rampData)],
        ["Algorithm 5", getPercentage("Algorithm 5", rampData)],
      ];
      if (tsl > idealUpdateTime) {
        setData(newData);
        setLastUpdate(new Date().getTime());
      }
    }
  }, [rampData]);

  const getPercentage = (filter: string, rampData: RampData[]) => {
    return rampData.filter((rd) => rd.algorithm == filter).length;
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
        {data && data.length > 0 ? (
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        ) : (
          <div>{noDataMessage}</div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default RampChart;
