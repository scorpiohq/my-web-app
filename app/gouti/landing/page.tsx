import { redirect } from "next/navigation";

/** Old gouti URL — live homepage is now v2. */
export default function GoutiLandingRedirectPage() {
  redirect("/");
}
