import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden pt-[72px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(55% 45% at 50% 20%, rgba(139,77,255,0.25), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="shell py-20 text-center">
        <p className="kicker text-brand">Error 404</p>
        <h1 className="mt-4 text-[clamp(56px,14vw,150px)] font-bold leading-none text-outline">Off map</h1>
        <p className="mx-auto mt-4 max-w-md text-[14px] text-muted">
          That page rotated out of the draft. Head back to base and pick a lane.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">Back to home</ButtonLink>
          <ButtonLink href="/matches" variant="outline" size="lg">See the schedule</ButtonLink>
        </div>
      </div>
    </div>
  );
}
