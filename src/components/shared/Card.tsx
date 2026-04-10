import { ParentComponent, Show } from "solid-js";

type CardProps = {
  class?: string;
};

interface CardComposition {
  Header: ParentComponent<CardProps & { tooltip?: string }>;
  Body: ParentComponent<CardProps>;
  Actions: ParentComponent<CardProps>;
}

type ComposedParent = ParentComponent<CardProps> & CardComposition;

export const Card: ComposedParent = (props) => {
  return (
    <div class={`card card-border shadow-sm bg-base-100 ${props.class ?? ""}`}>
      {props.children}
    </div>
  );
};

Card.Header = (props) => (
  <div class={`card-title justify-between ${props.class ?? ""}`}>
    <h2>{props.children}</h2>
    <Show when={props.tooltip}>
      <div class="tooltip" data-tip={props.tooltip}>
        <span class="btn btn-ghost btn-xs">?</span>
      </div>
    </Show>
  </div>
);

Card.Body = (props) => <div class={`card-body ${props.class ?? ""}`}>{props.children}</div>;

Card.Actions = (props) => (
  <div class={`card-actions justify-end ${props.class ?? ""}`}>{props.children}</div>
);
