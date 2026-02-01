import React from "react"
import { LanguageProvider } from "@/components/language-provider";

export const metadata = {
  title: "Admin Dashboard | Gonzo Studio",
  description: "Manage your Gonzo Studio portfolio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
