import Link from "next/link";
/* import { Button } from "../ui/button"; */

export default function Header() {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-50 w-full px-8 md:px-0">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Speetch</h1>
        <nav>
          <ul className="flex items-center gap-4">
            <li className="relative">
              <Link href="/changelog">What's New</Link>
              <div className="w-1 h-1 bg-red-500 rounded-full absolute top-0 -right-2 animate-pulse"></div>
            </li>

            {/* Sign In and Sign Up Buttons */}

            {/* <li> 
              <Link href="/">
                <Button variant="outline">Sign In</Button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <Button>Sign Up</Button>
              </Link>
            </li> 
            */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
