import { GridBase } from "@/components/shared/GridBase";
import { ParentComponent } from "solid-js";

interface SectionProps {
  id: string;
  class?: string;
}

interface SideProps {
  class?: string;
}

interface Composition {
  Left: ParentComponent<SideProps>;
  Right: ParentComponent<SideProps>;
}

type ComposedParent = ParentComponent<SectionProps> & Composition;

export const Section: ComposedParent = (props) => {
  return (
    <GridBase class={props.class} id={props.id}>
      {props.children}
    </GridBase>
  );
};

Section.Left = (props) => <div class={props.class}>{props.children}</div>;

Section.Right = (props) => <div class={props.class}>{props.children}</div>;
