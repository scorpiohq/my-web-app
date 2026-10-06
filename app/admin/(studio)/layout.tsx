import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/admin-session";

export default async function AdminStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  if (!isValidAdminSession(jar.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  return children;
}
