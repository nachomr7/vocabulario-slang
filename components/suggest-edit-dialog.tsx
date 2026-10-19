"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { Copy } from "@/lib/copy";
import type { VocabEntry } from "@/lib/types";

export function SuggestEditDialog({
  entry,
  copy,
}: {
  entry: VocabEntry;
  copy: Copy;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const wordLabel = [entry.slang_es, entry.slang_cl].filter(Boolean).join(" / ");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast.error(copy.toastMissingFeedback);
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.from("suggestions").insert({
        edit_slug: entry.slug,
        definicion: feedback.trim(),
      });

      if (error) {
        toast.error(copy.toastSubmitError);
        return;
      }

      toast.success(copy.toastEditSubmitSuccess);
      setFeedback("");
      setOpen(false);
    } catch {
      toast.error(copy.toastSubmitError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            aria-label={copy.editButton}
            className="rounded-full p-1.5 text-muted-foreground/50 transition-transform hover:scale-110 hover:text-foreground"
          />
        }
      >
        ✏️
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{copy.editDialogTitle}</DialogTitle>
            <DialogDescription>
              {wordLabel} — {copy.editDialogDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="feedback">{copy.labelFeedback}</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={copy.feedbackPlaceholder}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? copy.submitting : copy.submitEdit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
