import { DemoDashboard } from "@/components/demo/DemoDashboard";

export const metadata = {
  title: "Live Demo — Nexus-OS Personal Dashboard",
  description:
    "Interactive mock of Marcus Chen's personal OS dashboard with habits, projects, finance, AI terminal, and more.",
};

export default function DemoPage() {
  return <DemoDashboard />;
}
