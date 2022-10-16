export interface RouteData {
  id: number;
  delay: number;
  name: string;
  from: string;
  to: string;
  distance: number;
  time: number;
}

export const SampleRoutes: RouteData[] = [
  {
    id: 1,
    delay: 90,
    name: "Monash Fwy Out",
    from: "Kings Way",
    to: "EastLink",
    distance: 13,
    time: 45,
  },
  {
    id: 2,
    delay: 70,
    name: "Monash Fwy Out",
    from: "Kings Way",
    to: "EastLink",
    distance: 15,
    time: 28,
  },
  {
    id: 3,
    delay: 50,
    name: "Western Ring Rd",
    from: "West Gate Fwy",
    to: "Western Fwy",
    distance: 5,
    time: 5,
  },
  {
    id: 4,
    delay: 45,
    name: "Eastern Fwy",
    from: "Hoddle St",
    to: "Springvale Rd",
    distance: 15,
    time: 25,
  },
];
