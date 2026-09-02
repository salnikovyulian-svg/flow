"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";

import { deleteDecision } from "../actions/delete-decision";

type Props = {
  id: string;
};

export function DeleteDecisionButton({
  id,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this Decision Contract?",
    );

    if (!confirmed) return;

    startTransition(() => {
      deleteDecision(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-400/20 hover:bg-red-400/10 disabled:opacity-40"
    >
      <Trash2 size={15} />

      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
