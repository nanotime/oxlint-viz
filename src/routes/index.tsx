import { createFileRoute } from "@tanstack/solid-router";
import { InputZone } from "@/components/landing/InputZone";

export const Route = createFileRoute("/")({
  component: InputZone,
});
