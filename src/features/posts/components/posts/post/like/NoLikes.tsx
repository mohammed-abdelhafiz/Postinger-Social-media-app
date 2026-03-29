import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";

export function NoLikes({ item }: { item: "post" | "comment" }) {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyTitle>No likes yet</EmptyTitle>
          <EmptyDescription>Be the first to like this {item}!</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
