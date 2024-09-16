import type { FC } from "react";
import type { EChartOption } from "echarts";

import { ChartCard } from "~/components/Cards/ChartCard";
import { useScaledWeiAmounts } from "~/hooks/useScaledWeiAmounts";
import type { DailyBlockStats } from "~/types";
import { buildTimeSeriesOptions, formatNumber } from "~/utils";

export type DailyAvgBlobGasPriceChartProps = {
  days: DailyBlockStats["days"];
  avgBlobGasPrices: DailyBlockStats["avgBlobGasPrices"];
};

export const DailyAvgBlobGasPriceChart: FC<
  Partial<DailyAvgBlobGasPriceChartProps>
> = function ({ days, avgBlobGasPrices }) {
  const { scaledValues, unit } = useScaledWeiAmounts(avgBlobGasPrices);

  const options: EChartOption<EChartOption.Series> = {
    ...buildTimeSeriesOptions({
      dates: days,
      axisFormatters: {
        yAxisTooltip: (value) => `${formatNumber(value, "compact")} ${unit}`,
        yAxisLabel: (value) => `${formatNumber(value, "compact")} ${unit}`,
      },
      yUnit: "ethereum",
    }),
    grid: {
      containLabel: true,
    },
    series: [
      {
        name: "Avg. Blob Gas Prices",
        data: scaledValues,
        type: "line",
      },
    ],
    animationEasing: "cubicOut",
  };

  return (
    <ChartCard title="Daily Avg. Blob Gas Price" size="sm" options={options} />
  );
};
