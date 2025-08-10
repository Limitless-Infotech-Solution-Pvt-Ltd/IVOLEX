import Link from "next/link";
import { Facebook, Twitter, Instagram, Pinterest } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral text-neutral-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About IVOLEX</h3>
            <p className="text-neutral-foreground/80 mb-4">
              Premium furniture, electronics and interior design solutions for modern living.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-neutral-foreground/80 hover:text-primary">
                <Facebook />
              </Link>
              <Link href="#" className="text-neutral-foreground/80 hover:text-primary">
                <Twitter />
              </Link>
              <Link href="#" className="text-neutral-foreground/80 hover:text-primary">
                <Instagram />
              </Link>
              <Link href="#" className="text-neutral-foreground/80 hover:text-primary">
                <Pinterest />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-neutral-foreground/80 hover:text-primary">Home</Link></li>
              <li><Link href="/products" className="text-neutral-foreground/80 hover:text-primary">Products</Link></li>
              <li><Link href="/categories" className="text-neutral-foreground/80 hover:text-primary">Categories</Link></li>
              <li><Link href="/design-services" className="text-neutral-foreground/80 hover:text-primary">Design Services</Link></li>
              <li><Link href="/about" className="text-neutral-foreground/80 hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-neutral-foreground/80 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/category/living-room" className="text-neutral-foreground/80 hover:text-primary">Living Room</Link></li>
              <li><Link href="/category/bedroom" className="text-neutral-foreground/80 hover:text-primary">Bedroom</Link></li>
              <li><Link href="/category/dining" className="text-neutral-foreground/80 hover:text-primary">Dining</Link></li>
              <li><Link href="/category/home-office" className="text-neutral-foreground/80 hover:text-primary">Home Office</Link></li>
              <li><Link href="/category/outdoor" className="text-neutral-foreground/80 hover:text-primary">Outdoor</Link></li>
              <li><Link href="/category/decor" className="text-neutral-foreground/80 hover:text-primary">Decor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-neutral-foreground/80">
              <li className="flex items-center">123 Design Street, Creative City</li>
              <li className="flex items-center">+1 (555) 123-4567</li>
              <li className="flex items-center">info@ivolex.com</li>
              <li className="flex items-center">Mon-Fri: 9AM - 8PM, Sat-Sun: 10AM - 6PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-foreground/20 pt-8 text-center text-neutral-foreground/60">
          <p>&copy; {new Date().getFullYear()} IVOLEX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
