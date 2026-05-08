import { Component, For, JSX, Show } from "solid-js";

interface Stats {
  stats: Array<{ statTitle: string; stat: number; icon?: JSX.Element; desc?: string }>;
}

export const StatCard: Component<Stats> = (props) => {
  return (
    <div class="stats shadow">
      <For each={props.stats}>
        {(stat) => (
          <div class="stat items-center">
            <Show when={stat.icon}>
              <div class="stat-figure">{stat.icon}</div>
            </Show>
            <div class="stat-title">{stat.statTitle}</div>
            <div class="stat-value">{stat.stat}</div>
            <Show when={stat.desc}>
              <div class="stat-desc">{stat.desc}</div>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};
