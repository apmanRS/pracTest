export const greenTrigger = 50;
export const yellowTrigger = 30;

export const getDotColor = (avSpeed: number) => {
  return avSpeed > greenTrigger ? "green" : avSpeed > yellowTrigger ? "yellow" : "red";
};

export interface RouteData {
  id: number;
  name: string;
  from: string;
  to: string;
  distance: number;
  time: number;
}

export const SampleRoutes: RouteData[] = [
  {
    id: 1,
    name: "Monash Fwy Out",
    from: "Kings Way",
    to: "EastLink",
    distance: 13,
    time: 45,
  },
  {
    id: 2,
    name: "Monash Fwy Out",
    from: "Kings Way",
    to: "EastLink",
    distance: 15,
    time: 28,
  },
  {
    id: 3,
    name: "Western Ring Rd",
    from: "West Gate Fwy",
    to: "Western Fwy",
    distance: 5,
    time: 5,
  },
  {
    id: 4,
    name: "Eastern Fwy",
    from: "Hoddle St",
    to: "Springvale Rd",
    distance: 15,
    time: 25,
  },
];
