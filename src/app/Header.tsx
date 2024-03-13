import Link from "next/link"

export default function Header() {
  return (
    <div>
      <Link href='/'>Home</Link>
      <Link href="/ImportData">Import Data</Link>
    </div>
  );
}