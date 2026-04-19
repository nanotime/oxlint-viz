import { NormalizedReport } from "@/model/output";
import { normalizer } from "./normalizer";
import { parser } from "./parser";
import { SeverityConfig } from "@/model/severityConfig";

export type WorkerMessage =
  | { data: NormalizedReport; success: true }
  | { error: Error; success: false };

self.onmessage = (e: MessageEvent<{ report: string; severityConfig: SeverityConfig }>) => {
  try {
    const parsed = parser(e.data.report);
    const data = normalizer(parsed, e.data.severityConfig);
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
