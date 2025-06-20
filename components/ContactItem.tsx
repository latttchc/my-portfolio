"use client";
import Link from "next/link";

export default function ContactItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 hover:text-blue-400 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
