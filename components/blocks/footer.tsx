import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { TextHoverEffect } from "../ui/text-hover-effect";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <TextHoverEffect text="Speetch" />
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <Link href="#" className="hover:text-primary">
              Home
            </Link>
            <Link href="#" className="hover:text-primary">
              About
            </Link>
            <Link href="#" className="hover:text-primary">
              Services
            </Link>
            <Link href="#" className="hover:text-primary">
              Products
            </Link>
            <Link href="#" className="hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
          <div className="mb-8 w-full max-w-md">
            <form className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="rounded-full"
                />
              </div>
              <Button type="submit" className="rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-400">
                Subscribe
              </Button>
            </form>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Speetch. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
