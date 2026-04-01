import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white text-stone-600 pt-16 pb-8 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <img
                src="/splash-logo.png?v=1"
                alt="Shree Avigna Logo"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Purity in every drop. We provide 100% natural, wood cold-pressed edible oils for a healthier lifestyle. Traditional methods meeting modern standards.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-stone-900 font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-secondary transition-colors">Our Products</Link></li>
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-stone-900 font-bold mb-6">Popular Products</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/products" className="hover:text-secondary transition-colors">Groundnut Oil</Link></li>
              <li><Link href="/products" className="hover:text-secondary transition-colors">Sesame Oil</Link></li>
              <li><Link href="/products" className="hover:text-secondary transition-colors">Sunflower Oil</Link></li>
              <li><Link href="/products" className="hover:text-secondary transition-colors">Badam Oil</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-stone-900 font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col">
                <span className="text-stone-400 uppercase text-[10px] font-bold tracking-widest leading-none mb-1">Email</span>
                <span className="text-stone-900">info@shreeavigna.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-stone-400 uppercase text-[10px] font-bold tracking-widest leading-none mb-1">Phone</span>
                <span className="text-stone-900">+91 91234 56789</span>
              </li>
              <li className="flex flex-col">
                <span className="text-stone-400 uppercase text-[10px] font-bold tracking-widest leading-none mb-1">Address</span>
                <span className="text-stone-900">5th Floor, Swathi Plaza, Leela Nagar, Ameerpet, Hyderabad, 500016</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-stone-400">© {new Date().getFullYear()} Shree Avigna Natural Oils. All rights reserved.</p>
            <span className="hidden md:block text-stone-200">|</span>
            <Link 
              href="https://www.codtechitsolutions.com/" 
              target="_blank" 
              className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1"
            >
              Developed by <span className="text-stone-900 font-black tracking-tight underline decoration-stone-200 underline-offset-4 hover:decoration-secondary">Codtech IT Solutions</span>
            </Link>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-secondary transition-colors uppercase tracking-widest text-[10px]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-secondary transition-colors uppercase tracking-widest text-[10px]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
