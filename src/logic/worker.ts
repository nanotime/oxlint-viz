import { NormalizedReport } from "@/model/output";
import { normalizer } from "./normalizer";
import { parser } from "./parser";

export type WorkerMessage =
  | { data: NormalizedReport; success: true }
  | { error: Error; success: false };

self.onmessage = (e: MessageEvent<string>) => {
  try {
    const parsed = parser(e.data);
    const data = normalizer(parsed);
    const message = {
      success: true,
      data,
    };
    self.postMessage(message);
  } catch (error) {
    const message: WorkerMessage = {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
    };
    self.postMessage(message);
  }
};
