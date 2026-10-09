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
import { Textarea } from "@/components/ui/textarea";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { Copy } from "@/lib/copy";

const initialForm = {
  slang_es: "",
  slang_cl: "",
  definicion: "",
  categoria: "",
  email: "",
};

export function SuggestWordDialog({ copy }: { copy: Copy }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);

  const update = (field: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.slang_es.trim() && !form.slang_cl.trim()) {
      toast.error(copy.toastMissingWord);
      return;
    }
    if (!form.definicion.trim()) {
      toast.error(copy.toastMissingDef);
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.from("suggestions").insert({
        slang_es: form.slang_es.trim() || null,
        slang_cl: form.slang_cl.trim() || null,
        definicion: form.definicion.trim(),
        categoria: form.categoria.trim() || null,
        email: form.email.trim() || null,
      });

      if (error) {
        toast.error(copy.toastSubmitError);
        return;
      }

      toast.success(copy.toastSubmitSuccess);
      setForm(initialForm);
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
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="slang_es">{copy.labelSlangEs}</Label>
                <Input
                  id="slang_es"
                  value={form.slang_es}
                  onChange={update("slang_es")}
                  placeholder="ej: guay"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="slang_cl">{copy.labelSlangCl}</Label>
                <Input
                  id="slang_cl"
                  value={form.slang_cl}
                  onChange={update("slang_cl")}
                  placeholder="ej: bacán"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="definicion">{copy.labelDefinicion}</Label>
              <Textarea
                id="definicion"
                value={form.definicion}
                onChange={update("definicion")}
                placeholder="¿Qué significa?"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="categoria">{copy.labelCategoria}</Label>
              <Input
                id="categoria"
                value={form.categoria}
                onChange={update("categoria")}
                placeholder="ej: comida_bebida, dinero, fiesta…"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">{copy.labelEmail}</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="tú@ejemplo.com"
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
