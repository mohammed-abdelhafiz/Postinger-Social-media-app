import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useFeedStore } from "@/shared/store/feed.store";

export function PostsFilterTabs() {
  const { activeTab, setActiveTab } = useFeedStore();
  return (
    <Tabs
      className="w-full sticky top-0 z-10"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="w-full">
        <TabsTrigger value="for-you">For you</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}