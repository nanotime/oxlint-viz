import { Component, For } from "solid-js";

interface Stats {
  stats: Array<{ statTitle: string; stat: number }>;
}

export const StatCard: Component<Stats> = (props) => {
  return (
    <div class="stats shadow">
      <For each={props.stats}>
        {(stat) => (
          <div class="stat">
            <div class="stat-title">{stat.statTitle}</div>
            <div class="stat-value">{stat.stat}</div>
          </div>
        )}
      </For>
    </div>
  );
};
