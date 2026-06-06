import { describe, it, expect, vi } from "vite-plus/test";
import {
  saveAnalysis,
  getAnalysis,
  getAllAnalyses,
  deleteAnalysis,
  updateAnalysis,
} from "../operations";
import { db } from "../database";
import type { SaveAnalysisInput } from "../types";

vi.mock("../database", () => ({
  db: {
    analyses: {
      add: vi.fn(),
      get: vi.fn(),
      orderBy: vi.fn().mockReturnThis(),
      reverse: vi.fn().mockReturnThis(),
      toArray: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const mockInput: SaveAnalysisInput = {
  name: "Test Analysis",
  rawReport: '{"diagnostics":[]}',
  normalizedData: {
    summary: { totalIssues: 0, totalFiles: 0, filesWithIssues: 0 },
    distribution: { severity: { error: 0, warning: 0, advice: 0 }, categories: {} },
    rules: {},
    hotspots: {},
  },
  preset: "cleanCode",
};

describe("saveAnalysis", () => {
  it("should save analysis and return id", async () => {
    vi.mocked(db.analyses.add).mockResolvedValue(undefined as never);
    const id = await saveAnalysis(mockInput);
    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
    expect(db.analyses.add).toHaveBeenCalled();
  });
});

describe("getAnalysis", () => {
  it("should return analysis when found", async () => {
    const mockRecord = { id: "123", ...mockInput, createdAt: new Date(), updatedAt: new Date() };
    vi.mocked(db.analyses.get).mockResolvedValue(mockRecord as never);
    const result = await getAnalysis("123");
    expect(result).toEqual(mockRecord);
  });

  it("should return undefined when not found", async () => {
    vi.mocked(db.analyses.get).mockResolvedValue(undefined as never);
    const result = await getAnalysis("nonexistent");
    expect(result).toBeUndefined();
  });
});

describe("getAllAnalyses", () => {
  it("should return empty array when no analyses", async () => {
    vi.mocked(db.analyses.orderBy("createdAt").reverse().toArray).mockResolvedValue([] as never);
    const result = await getAllAnalyses();
    expect(result).toEqual([]);
  });
});

describe("deleteAnalysis", () => {
  it("should return true when deleted", async () => {
    vi.mocked(db.analyses.get).mockResolvedValue({
      id: "123",
      ...mockInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never);
    vi.mocked(db.analyses.delete).mockResolvedValue(undefined as never);
    const result = await deleteAnalysis("123");
    expect(result).toBe(true);
  });

  it("should return false when not found", async () => {
    vi.mocked(db.analyses.get).mockResolvedValue(undefined as never);
    const result = await deleteAnalysis("nonexistent");
    expect(result).toBe(false);
  });
});

describe("updateAnalysis", () => {
  it("should return true when updated", async () => {
    vi.mocked(db.analyses.get).mockResolvedValue({
      id: "123",
      ...mockInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never);
    vi.mocked(db.analyses.update).mockResolvedValue(undefined as never);
    const result = await updateAnalysis("123", { name: "New Name" });
    expect(result).toBe(true);
  });

  it("should return false when not found", async () => {
    vi.mocked(db.analyses.get).mockResolvedValue(undefined as never);
    const result = await updateAnalysis("nonexistent", { name: "New Name" });
    expect(result).toBe(false);
  });
});
