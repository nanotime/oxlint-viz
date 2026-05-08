import { echarts, ChartOption } from "@/logic/chartWrapper";
import { ParentComponent, onMount, createEffect, onCleanup } from "solid-js";

interface Props {
  options: ChartOption;
  class?: string;
}

export const ChartBase: ParentComponent<Props> = (props) => {
  // oxlint-disable-next-line no-unassigned-vars
  let chartRef: HTMLDivElement | undefined;
  let chartInstance: echarts.ECharts | undefined;

  onMount(() => {
    if (!chartRef) return;
    chartInstance = echarts.init(chartRef);
    chartInstance.setOption(props.options);

    const resizeObserver = new ResizeObserver(() => chartInstance?.resize());
    resizeObserver.observe(chartRef);

    onCleanup(() => {
      resizeObserver.disconnect();
      chartInstance?.dispose();
    });

    createEffect(() => {
      chartInstance?.setOption(props.options);
    });
  });

  return <div ref={chartRef} class={`w-full h-full ${props.class}`} />;
};
