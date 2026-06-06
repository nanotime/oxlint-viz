import { Component, createSignal, For, Show, onMount } from "solid-js";
import { useNavigate } from "@tanstack/solid-router";
import { getAllAnalyses, deleteAnalysis } from "@/db/operations";
import type { SavedAnalysis } from "@/db/types";

export const SavedAnalyses: Component = () => {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = createSignal<SavedAnalysis[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = createSignal<string | null>(null);

  onMount(async () => {
    try {
      const data = await getAllAnalyses();
      setAnalyses(data);
    } catch (e) {
      if (e instanceof Error && e.name === "SecurityError") {
        setError("Storage unavailable. IndexedDB may be disabled or blocked in this browser.");
      } else {
        setError("Failed to load saved analyses.");
      }
    } finally {
      setLoading(false);
    }
  });

  const handleLoad = (id: string) => {
    void navigate({ to: "/analysis", search: { id } });
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirm() !== id) {
      setDeleteConfirm(id);
      return;
    }
    try {
      await deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error("Failed to delete analysis:", e);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const getFileCount = (analysis: SavedAnalysis) => {
    return analysis.normalizedData.summary.totalFiles;
  };

  return (
    <div class="flex flex-col gap-6 py-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Saved Analyses</h1>
        <button class="btn btn-primary" onClick={() => navigate({ to: "/" })}>
          New Analysis
        </button>
      </div>

      <Show when={error()}>
        <div role="alert" class="alert alert-error">
          <span>{error()}</span>
        </div>
      </Show>

      <Show when={loading()}>
        <div class="flex justify-center py-8">
          <span class="loading loading-dots loading-lg"></span>
        </div>
      </Show>

      <Show when={!loading() && analyses().length === 0 && !error()}>
        <div class="text-center py-12">
          <p class="text-lg text-gray-500 mb-4">No saved analyses yet</p>
          <button class="btn btn-primary" onClick={() => navigate({ to: "/" })}>
            Start your first analysis
          </button>
        </div>
      </Show>

      <Show when={!loading() && analyses().length > 0}>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Files</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <For each={analyses()}>
                {(analysis) => (
                  <tr>
                    <td class="font-medium">{analysis.name}</td>
                    <td class="text-gray-500">{formatDate(analysis.createdAt)}</td>
                    <td>{getFileCount(analysis)}</td>
                    <td class="flex gap-2">
                      <button
                        class="btn btn-sm btn-primary"
                        onClick={() => handleLoad(analysis.id)}
                      >
                        Load
                      </button>
                      <Show
                        when={deleteConfirm() === analysis.id}
                        fallback={
                          <button
                            class="btn btn-sm btn-outline btn-error"
                            onClick={() => handleDelete(analysis.id)}
                          >
                            Delete
                          </button>
                        }
                      >
                        <button
                          class="btn btn-sm btn-error"
                          onClick={() => handleDelete(analysis.id)}
                        >
                          Confirm
                        </button>
                        <button class="btn btn-sm btn-ghost" onClick={handleCancelDelete}>
                          Cancel
                        </button>
                      </Show>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Show>
    </div>
  );
};
