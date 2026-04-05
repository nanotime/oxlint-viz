import * as echarts from "echarts/core";
import {
  BarChart,
  PieChart,
  TreemapChart,
  GaugeChart,
  HeatmapChart,
  BarSeriesOption,
  PieSeriesOption,
  TreemapSeriesOption,
  GaugeSeriesOption,
  HeatmapSeriesOption,
} from "echarts/charts";
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  DatasetComponent,
  DatasetComponentOption,
  LegendComponent,
  LegendComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
} from "echarts/components";

import { SVGRenderer } from "echarts/renderers";
import type { ComposeOption } from "echarts/core";

echarts.use([
  BarChart,
  PieChart,
  TreemapChart,
  GaugeChart,
  HeatmapChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  VisualMapComponent,
  SVGRenderer,
]);

export type ChartOption = ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | TreemapSeriesOption
  | GaugeSeriesOption
  | HeatmapSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | VisualMapComponentOption
>;

export { echarts };
