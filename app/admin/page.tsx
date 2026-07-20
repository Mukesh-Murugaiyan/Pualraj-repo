import AdminDashboard from "@/components/admin/AdminDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Product Management | TCP Automation",
  description: "Administrative dashboard for managing automation products, images, videos, and specifications.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
