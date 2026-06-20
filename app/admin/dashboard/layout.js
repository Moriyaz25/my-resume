import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

export default function AdminDashboardLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const session = token ? verifySession(token) : null;

  if (!session) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
