import { db } from "./database";
import type { SaveAnalysisInput, SavedAnalysis } from "./types";

export async function saveAnalysis(input: SaveAnalysisInput): Promise<string> {
  const now = new Date();
  const id = crypto.randomUUID();
  const record: SavedAnalysis = {
    id,
    ...input,
    createdAt: now,
    updatedAt: now,
  };
  await db.analyses.add(record);
  return id;
}

export async function getAnalysis(id: string): Promise<SavedAnalysis | undefined> {
  return db.analyses.get(id);
}

export async function getAllAnalyses(): Promise<SavedAnalysis[]> {
  return db.analyses.orderBy("createdAt").reverse().toArray();
}

export async function deleteAnalysis(id: string): Promise<boolean> {
  const existing = await db.analyses.get(id);
  if (!existing) return false;
  await db.analyses.delete(id);
  return true;
}

export async function updateAnalysis(
  id: string,
  updates: Partial<Pick<SavedAnalysis, "name">>,
): Promise<boolean> {
  const existing = await db.analyses.get(id);
  if (!existing) return false;

  await db.analyses.update(id, {
    ...updates,
    updatedAt: new Date(),
  });
  return true;
}
