import AdminDashboard from "@/components/admin/AdminDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Product Management | Electra Weighing Systems (EWS)",
  description: "Administrative dashboard for managing weighing automation products, load cell specifications, images, and videos.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
