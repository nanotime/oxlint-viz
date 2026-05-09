import { Component } from "solid-js";

interface Props {
  error?: string | null;
  reset: () => void;
}

export const ErrorCard: Component<Props> = (props) => {
  return (
    <div role="alert" class="alert alert-dash alert-error grid-cols-[1fr_auto]">
      <span>Error! {props.error ?? "Something happened"}</span>
      <button class="btn btn-ghost btn-sm text-gray-500" onClick={props.reset}>
        Close
      </button>
    </div>
  );
};
