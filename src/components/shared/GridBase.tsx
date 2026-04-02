import { ParentComponent } from "solid-js";

interface Props {
  id: string;
  class?: string;
}

export const GridBase: ParentComponent<Props> = (props) => {
  return (
    <section class={`grid grid-cols-12 gap-6 ${props.class}`} id={props.id}>
      {props.children}
    </section>
  );
};
