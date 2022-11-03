import React from "react";
import ReactEcharts from "echarts-for-react";
import data from "../Wine-Data.json";

/**
 * Calculates average mallic acid for each alcohol category
 * @param  {JSON} data json array containing alcohols
 */
function avgMallicAcidForAlcohol(data) {
  var map = new Map();
  for (let i = 0; i < data.length; i++) {
    if (map.has(data[i]["Alcohol"])) {
      map.get(data[i]["Alcohol"]).push(data[i]["Malic_Acid"]);
    } else {
      let arr = [];
      arr.push(data[i]["Malic_Acid"]);
      map.set(data[i]["Alcohol"], arr);
    }
  }

  let result = [];

  map.forEach((mallic_acid_list, alcohol) => {
    let sum = 0;
    let count = mallic_acid_list.length;
    for (const mallic_acid of mallic_acid_list) {
      sum = sum + mallic_acid;
    }
    result.push({ key: alcohol, value: sum / count });
  });

  return result;
}

const Bargraphs = () => {
  const alcoholAvgMallicAcid = avgMallicAcidForAlcohol(data);

  // prepare data for bar graph
  const alcohol_list = alcoholAvgMallicAcid.map((data) => data.key);
  const avg_malic_acid_list = alcoholAvgMallicAcid.map((data) =>
    data.value.toFixed(2)
  );

  // bargraph configuration
  const option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      textStyle: {
        fontWeight: "bold",
      },
    },
    xAxis: {
      name: "Alcohol",
      nameLocation: "center",
      nameGap: 35,
      type: "category",
      data: alcohol_list,
    },
    yAxis: {
      name: "Malic Acid",
      nameLocation: "center",
      nameGap: 35,
      type: "value",
    },
    series: [
      {
        type: "bar",
        data: avg_malic_acid_list,
      },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default Bargraphs;
