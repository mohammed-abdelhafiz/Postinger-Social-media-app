import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PostsFilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function PostsFilterTabs({
  activeTab,
  setActiveTab,
}: PostsFilterTabsProps) {
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