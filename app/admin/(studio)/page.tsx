import GoutiLanding from "@/components/gouti/GoutiLanding";
import "@/app/gouti/landing/landing.css";

export const revalidate = 60;

export default function AdminHomePage() {
  return <GoutiLanding sectionPath="/admin" formHref="/admin/form" />;
}
