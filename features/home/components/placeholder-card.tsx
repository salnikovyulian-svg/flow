import { Card, CardContent } from "@/components/ui/card";

export function PlaceholderCard() {
  return (
    <Card className="rounded-2xl border-white/[0.07] bg-card/80">
      <CardContent className="flex min-h-28 items-center p-5">
        <div
          aria-hidden="true"
          className="h-px w-10 bg-gradient-to-r from-primary/60 to-transparent"
        />
      </CardContent>
    </Card>
  );
}
