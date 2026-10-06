import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/admin-session";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage() {
  const jar = await cookies();
  if (isValidAdminSession(jar.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin");
  }

  return <AdminLoginForm />;
}
