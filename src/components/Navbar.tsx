import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
  { name: 'Account', href: '/account' },
  { name: 'Signup', href: '/signup' },
  { name: 'Login', href: '/login' },
  // Add more links as you create more pages
];

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <span className="text-white font-bold text-xl">AITradingGenie</span>
      <ul className="flex gap-6">
        {navLinks.map(link => (
          <li key={link.href}>
            <Link href={link.href} className="text-white hover:text-yellow-300 transition">{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
