export function EmptySuggestionCard({ className }: { className?: string }) {
  return (
    <div className={`p-6 text-center ${className}`}>
      <p className="text-sm text-muted-foreground italic">
        No suggestions at the moment
      </p>
    </div>
  );
}
