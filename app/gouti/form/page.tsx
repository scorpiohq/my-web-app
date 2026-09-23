import { redirect } from "next/navigation";

/**
 * Gouti conversion journey — shared form, then checkout (Stripe or Lemon).
 */
export default function GoutiFormPage() {
  redirect("/form?journey=gouti");
}
