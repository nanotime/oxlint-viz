import { normalizer } from "./normalizer";
import { parser } from "./parser";

self.onmessage = (e: MessageEvent<string>) => {
  const parsed = parser(e.data);
  const data = normalizer(parsed);
  self.postMessage(data);
};
