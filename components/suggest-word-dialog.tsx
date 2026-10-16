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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { Copy } from "@/lib/copy";
import type { Country } from "@/hooks/use-country";

export function SuggestWordDialog({ copy }: { copy: Copy }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [country, setCountry] = useState<Country | "">("");
  const [word, setWord] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!country) {
      toast.error(copy.toastMissingCountry);
      return;
    }
    if (!word.trim()) {
      toast.error(copy.toastMissingWord);
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.from("suggestions").insert({
        slang_es: country === "es" ? word.trim() : null,
        slang_cl: country === "cl" ? word.trim() : null,
      });

      if (error) {
        toast.error(copy.toastSubmitError);
        return;
      }

      toast.success(copy.toastSubmitSuccess);
      setCountry("");
      setWord("");
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
        render={<Button variant="outline" className="rounded-full" />}
      >
        💡 {copy.suggestButton}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{copy.dialogTitle}</DialogTitle>
            <DialogDescription>{copy.dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="country">{copy.labelCountry}</Label>
              <Select
                value={country}
                onValueChange={(value) => setCountry(value as Country)}
              >
                <SelectTrigger id="country" className="w-full">
                  <SelectValue placeholder="—">
                    {(value: Country | "") =>
                      value === "es"
                        ? `🇪🇸 ${copy.optionEs}`
                        : value === "cl"
                          ? `🇨🇱 ${copy.optionCl}`
                          : "—"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">🇪🇸 {copy.optionEs}</SelectItem>
                  <SelectItem value="cl">🇨🇱 {copy.optionCl}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="word">{copy.labelWord}</Label>
              <Input
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="ej: guay, bacán…"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? copy.submitting : copy.submit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
