import React from "react";
import ReactEcharts from "echarts-for-react";
import data from "../Wine-Data.json";

const Scattergraphs = () => {
  // x-axis data
  const color_intensity_list = data.map((data) => data.Color_intensity);
  // y-axis data
  const hue_list = data.map((data) => data.Hue);

  // echart scattergraph configuration
  const option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: [
      {
        type: "category",
        data: color_intensity_list,
        name: "Color_intensity",
        nameLocation: "center",
        nameGap: 35,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "hue",
        nameLocation: "center",
        nameGap: 35,
      },
    ],
    series: [
      {
        data: hue_list,
        type: "scatter",
      },
    ],
  };
  return <ReactEcharts option={option} />;
};

export default Scattergraphs;
