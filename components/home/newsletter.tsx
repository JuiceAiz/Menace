"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/content";
import { cn } from "@/lib/cn";

type State = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setState("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string; mode?: string };
      if (!response.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      setState("success");
      setMessage(
        data.mode === "demo"
          ? "You're on the list (demo mode — connect a mailing list to go live)."
          : "You're on the list. Watch your inbox for matchday drops.",
      );
      setEmail("");
    } catch (submitError) {
      setState("error");
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    }
  };

  return (
    <section className="shell py-16 md:py-20" aria-labelledby="signup-heading">
      <div className="relative overflow-hidden clip-card border border-line/90 bg-gradient-to-br from-[#241040] via-[#170d26] to-[#0f0819] p-6 sm:p-8 md:p-10">
        <div
          className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-brand/25 blur-[70px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-gold/10 blur-[80px]"
          aria-hidden
        />

        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="kicker text-gold">Matchday dispatch</p>
            <h2 id="signup-heading" className="mt-3 text-[clamp(26px,4vw,38px)] font-bold">
              Never miss a series.
            </h2>
            <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-muted">
              Lineups, results and drops the moment they land. One email per match week — no spam,
              no filler, unsubscribe in a click.
            </p>
            <ButtonLink href={site.discord.url} external variant="outline" className="mt-5">
              Or join the Discord
            </ButtonLink>
          </div>

          <div>
            <form onSubmit={submit} noValidate className="w-full">
              <label htmlFor="newsletter-email" className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                Email address
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) {
                      setError("");
                      setState("idle");
                    }
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className={cn(
                    "h-12 w-full border bg-ink/60 px-3.5 text-[14px] text-white placeholder:text-muted/70 focus:border-brand focus:outline-none",
                    error ? "border-loss/70" : "border-line",
                  )}
                />
                <Button type="submit" size="lg" disabled={state === "loading"} className="shrink-0">
                  {state === "loading" ? "Joining…" : "Subscribe"}
                </Button>
              </div>
              {error ? (
                <p id="newsletter-error" role="alert" className="mt-2 text-[12px] text-loss">
                  {error}
                </p>
              ) : null}
              {state === "success" ? (
                <p role="status" className="mt-2 text-[12px] text-win">
                  {message}
                </p>
              ) : null}
              <p className="mt-3 text-[10.5px] leading-relaxed text-muted">
                By subscribing you agree to receive Menace match updates. We store your email only for
                that purpose.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
