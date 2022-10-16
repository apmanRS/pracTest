# Welcome

Thanks for the opportunity to interview for your company.
I enjoy doing this type of thing, and unless you give me a timebox I could just tinker forever.

Drag the code down and run it to interact with the components.

### Libraries

**Material Design** was developed by Google in 2014. I've used MUI for building out this UI because I've used it a lot on my last project and find it has a lot of quality sensible components, as well as a bunch of icons.

**Google-charts** - react-google-charts was where I landed for the donut chart. I have a few other JS based charts, but due to time constraints I went with a fairly simple setup and implementation.

## Weather Component

Even though the weather component could be hard coded, I've made it a bit interactive.
The source is drawn from seed data, based on the image in the pdf.
Within the main page you have an opportinity to play god and change the outlook for tomorrow.

## Route Conditions

There are ways to tweak the route conditions in the sidebar code
Or within the Main Page you can change the travel delay and the data will override the Delayed Routes Component.

This section uses a multi-dimensional array to define;
[routeId, [long time,avg time,quick time]] then uses .map
to build each row, and pass the chosen travel time and routeId back to the sidebar from the onChange event.
data: [[1, [45, 25, 10]], [2, [48, 28, 12]], [3, [20, 9, 5]], [4, [42, 26, 13]]]

## Ramp Chart

I let the side down a bit on the only truly dynamic bit of the test, and that is the Ramp Chart.
Yes, it draws information from the little api-ish bit you supplied, but my machine was getting a bit of a race condition and sometimes updating at "weird" intervals. So I put a wrapper inside the update to ensure it had been at least 500ms since the update. This was an effort to stop a super flashing display.

Again, I could go at this for days but I went with a google-charts pie chart, and struggled a bit with it to make it look like yours.

If my lawn wasn't quite so long, and it wasn't Sunday I probably would have had a look around for a more suitable library, or in-fact done my own HTML5 canvas so I can set up everything just the way I want it.

## Testing

For this prac I put 3 tests together for the Route Conditions Component.

The tests are;

1. Make sure there is Route Data
2. Check that the Component Renders in the Sidebar by looking for it's headerText
3. Check the routes to make sure that the route distance & time don't end up with an average speed greater than the national limit
