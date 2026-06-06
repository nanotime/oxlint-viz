import Dexie, { type Table } from "dexie";
import type { SavedAnalysis } from "./types";

export class OxlintDatabase extends Dexie {
  analyses!: Table<SavedAnalysis, string>;

  constructor() {
    super("oxlint-viz-db");
    this.version(1).stores({
      analyses: "id, name, createdAt",
    });
  }
}

export const db = new OxlintDatabase();
