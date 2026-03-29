import { ProfileCard } from "@/features/users/components/profile/ProfileCard";
import { ProfileFeed } from "@/features/users/components/profile/profile-feed/ProfileFeed";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <ProfileCard username={username} />
      <ProfileFeed username={username} />
    </div>
  );
}
