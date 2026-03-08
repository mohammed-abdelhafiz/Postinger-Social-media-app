import { withAuth } from "@/features/auth/components/WithAuth";

const page = () => {
  return <div>page</div>;
};

export default withAuth(page);
