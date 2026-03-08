import { cookies } from "next/headers";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  console.log(cookieStore.getAll());
  return <div></div>;
}
