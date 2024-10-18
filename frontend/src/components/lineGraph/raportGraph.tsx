import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

export default function RaportGraph() {
  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];
  return (
    <Card variant="outlined" sx={{ width: "90%", padding: "5%" }}>
      <CardContent>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          ></Stack>
          <Typography
            variant="caption"
            component="h1"
            sx={{ color: "text.primary", fontSize: "6rem", fontWeight: "bold" }}
          >
            Voting Results For The Last Week
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          sx={{
            "& .MuiChartsAxis-root .MuiChartsAxis-label": {
              fontSize: "2rem !important", // For axis labels (like "Days" and "Votes")
            },
            "& .MuiChartsAxis-root .MuiChartsAxis-tickLabel": {
              fontSize: "2rem !important", // For tick labels along the axis
            },
          }}
          xAxis={
            [
              {
                scaleType: "band",
                categoryGapRatio: 0.5,
                data: ["1", "2", "3", "4", "5", "6", "7"],
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ] as any
          }
          series={[
            {
              id: "page-views",
              label: "Page views",
              data: [1234, 387, 298, 415, 357, 289, 298],
              stack: "A",
            },
            // {
            //   id: "downloads",
            //   label: "Downloads",
            //   data: [3098, 4215, 2384, 2101, 4752, 3593, 2384],
            //   stack: "A",
            // },
            // {
            //   id: "conversions",
            //   label: "Conversions",
            //   data: [4051, 2275, 3129, 4693, 3904, 2038, 2275],
            //   stack: "A",
            // },
          ]}
          height={650}
          // margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          margin={{ left: 100, right: 20, top: 20, bottom: 50 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import { LineChart } from "@mui/x-charts/LineChart";

// function AreaGradient({ color, id }: { color: string; id: string }) {
//   return (
//     <defs>
//       <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
//         <stop offset="0%" stopColor={color} stopOpacity={0.5} />
//         <stop offset="100%" stopColor={color} stopOpacity={0} />
//       </linearGradient>
//     </defs>
//   );
// }

// function getDaysInMonth(month: number, year: number) {
//   const date = new Date(year, month, 0);
//   const monthName = date.toLocaleDateString("en-US", {
//     month: "short",
//   });
//   // const daysInMonth = date.getDate();
//   const daysInMonth = 10;
//   const days = [];
//   let i = 1;
//   while (days.length < daysInMonth) {
//     days.push(`${monthName} ${i}`);
//     i += 1;
//   }
//   return days;
// }

// export default function RaportGraph() {
//   const theme = useTheme();
//   const data = getDaysInMonth(4, 2024);

//   const colorPalette = [
//     theme.palette.primary.light,
//     theme.palette.primary.main,
//     theme.palette.primary.dark,
//   ];

//   return (
//     <Card variant="outlined" sx={{ width: "100vw", aspectRatio: "9/16" }}>
//       <CardContent>
//         <Stack sx={{ justifyContent: "space-between" }}>
//           <Stack
//             direction="row"
//             sx={{
//               alignContent: { xs: "center", sm: "flex-start" },
//               alignItems: "center",
//               gap: 1,
//             }}
//           ></Stack>
//           <Typography
//             variant="caption"
//             component="h1"
//             sx={{ color: "text.primary", fontSize: "6rem" }}
//           >
//             Voting results for the las 10 days
//           </Typography>
//         </Stack>
//         <LineChart
//           colors={colorPalette}
//           xAxis={[
//             {
//               scaleType: "point",
//               data,
//               tickInterval: (_, i) => (i + 1) % 1 === 0,
//             },
//           ]}
//           series={[
//             {
//               id: "organic",
//               label: "Organic",
//               showMark: false,
//               curve: "linear",
//               stack: "total",
//               stackOrder: "ascending",
//               data: [
//                 1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800,
//               ],
//               area: true,
//             },
//           ]}
//           height={550}
//           margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
//           grid={{ horizontal: true }}
//           sx={{
//             "& .MuiAreaElement-series-organic": {
//               fill: "url('#organic')",
//             },

//             "& .MuiAxis-label": {
//               fontSize: "5rem",
//               color: "red",
//             },
//             "& .MuiAxis-tickLabel": {
//               fontSize: "5rem",
//               color: "red",
//             },
//           }}
//           slotProps={{
//             legend: {
//               hidden: true,
//             },
//           }}
//         >
//           <AreaGradient color={theme.palette.primary.dark} id="organic" />
//         </LineChart>
//       </CardContent>
//     </Card>
//   );
// }
