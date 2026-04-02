import { ParentComponent } from "solid-js";

type CardProps = {
  class?: string;
};

interface CardComposition {
  Header: ParentComponent<CardProps>;
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

Card.Header = (props) => <h2 class={`card-title ${props.class ?? ""}`}>{props.children}</h2>;

Card.Body = (props) => <div class={`card-body ${props.class ?? ""}`}>{props.children}</div>;

Card.Actions = (props) => (
  <div class={`card-actions justify-end ${props.class ?? ""}`}>{props.children}</div>
);
