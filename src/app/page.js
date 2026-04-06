"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { 
  ShieldCheckIcon, 
  HeartIcon, 
  SparklesIcon, 
  ArrowRightIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon, 
  MapPinIcon,
  LockClosedIcon,
  EyeIcon,
  DocumentTextIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  BeakerIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

import { supabase } from "@/lib/supabase";

const initialFeaturedProducts = [
  {
    id: "groundnut-oil",
    name: "Groundnut Oil",
    prices: { "250ml": 95, "500ml": 185, "1lt": 370, "5lts": 1850, "10lts": 3700, "15lts": 5550 },
    caption: "Carefully Selected Groundnuts, Wood Cold Pressed for Purity",
    description: "Our Groundnut Wood Cold Pressed Oil is made from carefully selected farm-fresh groundnuts, extracted using the traditional wooden ghani method.",
    image: "/products/groundnut.png",
    category: "Wood Pressed"
  },
  {
    id: "black-sesame-oil",
    name: "Black Sesame Oil",
    prices: { "250ml": 150, "500ml": 295, "1lt": 590, "5lts": 2950, "10lts": 5900, "15lts": 8850 },
    caption: "Black Sesame. Wood Pressed. Naturally Powerful.",
    description: "At Shree Avighna, we use premium-quality black sesame seeds to produce pure wood cold-pressed sesame oil.",
    image: "/products/black-sesame.png",
    category: "Wood Pressed"
  },
  {
    id: "sunflower-oil",
    name: "Sunflower Oil",
    prices: { "250ml": 130, "500ml": 245, "1lt": 490, "5lts": 2450, "10lts": 4900, "15lts": 7350 },
    caption: "Light, Healthy, and Naturally Nourishing – That's Sunflower Oil.",
    description: "At Shree Avighna, premium-quality sunflower seeds are used to produce pure wood cold-pressed sunflower oil.",
    image: "/products/sunflower.png",
    category: "Wood Pressed"
  }
];

const benefits = [
  {
    title: "100% Natural",
    desc: "No preservatives, no chemicals, no additives. Pure as nature intended.",
    icon: ShieldCheckIcon
  },
  {
    title: "Cold Pressed",
    desc: "Extracted at low temperatures to preserve all vital nutrients.",
    icon: SparklesIcon
  },
  {
    title: "Health First",
    desc: "Rich in antioxidants and healthy fats for a stronger heart.",
    icon: HeartIcon
  }
];

const initialAllProducts = [
  {
    id: "groundnut-oil",
    name: "Groundnut Oil",
    prices: { "250ml": 95, "500ml": 185, "1lt": 370, "5lts": 1850, "10lts": 3700, "15lts": 5550 },
    caption: "Carefully Selected Groundnuts, Wood Cold Pressed for Purity",
    description: "Our Groundnut Wood Cold Pressed Oil is made from carefully selected farm-fresh groundnuts, extracted using the traditional wooden ghani method.",
    image: "/products/groundnut.png",
    category: "Wood Pressed"
  },
  {
    id: "white-sesame-oil",
    name: "White Sesame Oil",
    prices: { "250ml": 150, "500ml": 295, "1lt": 590, "5lts": 2950, "10lts": 5900, "15lts": 8850 },
    caption: "Nature’s goodness, traditionally extracted.",
    description: "White Sesame Seeds are traditionally known for producing high-quality sesame oil through natural wood cold-pressing methods.",
    image: "/products/white-sesame.png",
    category: "Wood Pressed"
  },
  {
    id: "black-sesame-oil",
    name: "Black Sesame Oil",
    prices: { "250ml": 150, "500ml": 295, "1lt": 590, "5lts": 2950, "10lts": 5900, "15lts": 8850 },
    caption: "Black Sesame. Wood Pressed. Naturally Powerful.",
    description: "At Shree Avighna, we use premium-quality black sesame seeds to produce pure wood cold-pressed sesame oil.",
    image: "/products/black-sesame.png",
    category: "Wood Pressed"
  },
  {
    id: "safflower-oil",
    name: "Safflower Oil",
    prices: { "250ml": 130, "500ml": 245, "1lt": 490, "5lts": 2450, "10lts": 4900, "15lts": 7350 },
    caption: "Premium Hulled Safflower Seeds.",
    description: "Safflower seeds are known for their high content of healthy unsaturated fats.",
    image: "/products/safflower.png",
    category: "Wood Pressed"
  },
  {
    id: "sunflower-oil",
    name: "Sunflower Oil",
    prices: { "250ml": 130, "500ml": 245, "1lt": 490, "5lts": 2450, "10lts": 4900, "15lts": 7350 },
    caption: "Light, Healthy, and Naturally Nourishing.",
    description: "At Shree Avighna, premium-quality sunflower seeds are used to produce pure wood cold-pressed sunflower oil.",
    image: "/products/sunflower.png",
    category: "Wood Pressed"
  },
  {
    id: "badam-oil",
    name: "Badam Oil",
    prices: { "500ml": 0, "1lt": 0, "5lts": 0, "10lts": 0, "15lts": 0 },
    caption: "Nature's Secret for Skin and Hair",
    description: "Pure, unrefined almond oil, traditionally extracted through wood cold pressing.",
    image: "/products/badam.png",
    category: "Premium Oils"
  },
  {
    id: "mustard-oil",
    name: "Mustard Oil",
    prices: { "250ml": 105, "500ml": 210, "1lt": 420, "5lts": 2100, "10lts": 4200, "15lts": 6300 },
    caption: "Pure Strength, Naturally Pressed",
    description: "Mustard seeds are small, round seeds obtained from the mustard plant.",
    image: "/products/mustard.png",
    category: "Wood Pressed"
  },
  {
    id: "neem-oil",
    name: "Neem Oil",
    prices: { "250ml": 175, "500ml": 350, "1lt": 700, "5lts": 3500, "10lts": 7000, "15lts": 10500 },
    caption: "Nature's Shield for Skin and Hair.",
    description: "Our refined Neem Oil is extracted from premium quality neem seeds.",
    image: "/products/neem.png",
    category: "Natural Extracts"
  },
  {
    id: "kuridi-oil",
    name: "Coconut Oil (Kuridi)",
    prices: { "250ml": 225, "500ml": 450, "1lt": 900, "5lts": 4500, "10lts": 9000, "15lts": 13500 },
    caption: "From Fresh Coconuts to Your Glow",
    description: "Pure, unrefined coconut oil, traditionally wood cold pressed from fresh coconuts.",
    image: "/products/kuridi.png",
    category: "Wood Pressed"
  },
  {
    id: "flax-seeds-oil",
    name: "Flax Seed Oil",
    prices: { "500ml": 0, "1lt": 0, "5lts": 0, "10lts": 0, "15lts": 0 },
    caption: "Nature's Omega Boost in Every Drop",
    description: "Flax seed oil, extracted from premium flax seeds using traditional wood cold pressing.",
    image: "/products/flax.png",
    category: "Wellness"
  },
  {
    id: "castor-oil",
    name: "Castor Oil",
    prices: { "250ml": 105, "500ml": 210, "1lt": 420, "5lts": 2100, "10lts": 4200, "15lts": 6300 },
    caption: "Nature's Elixir for Hair and Skin",
    description: "At Shree Avighna, premium-quality castor seeds are used to produce pure wood cold-pressed castor oil.",
    image: "/products/castor.png",
    category: "Natural Extracts"
  }
];

const whyChoose = [
  {
    title: "Traditional Wood Cold Pressing",
    desc: "Oils extracted using the wooden ghani method to preserve natural nutrients and authentic taste.",
    icon: SparklesIcon
  },
  {
    title: "100% Natural & Chemical-Free",
    desc: "No refining, no additives, and no preservatives. Pure as nature intended.",
    icon: ShieldCheckIcon
  },
  {
    title: "Rich in Nutrients",
    desc: "Retains essential nutrients and antioxidants beneficial for healthy living.",
    icon: HeartIcon
  },
  {
    title: "Authentic Aroma & Flavor",
    desc: "Naturally processed to maintain the original aroma and taste of the oil.",
    icon: BeakerIcon
  },
  {
    title: "Quality You Can Trust",
    desc: "Carefully produced with strict quality standards for purity and freshness.",
    icon: CheckBadgeIcon
  },
  {
    title: "Healthy Choice for Families",
    desc: "Ideal for daily cooking, deep frying, and traditional recipes for every household.",
    icon: UserGroupIcon
  }
];

const faqs = [
  {
    q: "What is Wood Cold Pressed Oil?",
    a: "Wood cold pressed oil is extracted using the traditional wooden ghani method at low temperatures, which helps retain the oil’s natural nutrients, aroma, and flavor."
  },
  {
    q: "How is wood cold pressed oil different from refined oil?",
    a: "Unlike refined oils, wood cold pressed oils are not exposed to high heat or chemical processing, which helps preserve natural antioxidants, vitamins, and essential nutrients."
  },
  {
    q: "Are Shree Avighna oils chemical-free?",
    a: "Yes. Shree Avighna oils are 100% natural and chemical-free, with no additives, preservatives, or artificial processing."
  }
];

// Count-up animation component
function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Typewriter animation component
function TypeWriter({ text, speed = 35, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          const t = setTimeout(() => setHasStarted(true), delay);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, delay]);

  useEffect(() => {
    if (!hasStarted) return;
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [hasStarted, text, speed]);

  return (
    <span ref={ref}>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-[0.85em] bg-stone-400 ml-0.5 animate-pulse align-middle rounded-full" />
      )}
    </span>
  );
}

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div className="border-b border-stone-200">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
      >
        <span className="text-lg font-semibold text-stone-800 group-hover:text-secondary transition-colors">
          {q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-stone-400 group-hover:text-secondary"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-stone-600 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (!error && data && data.length > 0) {
          // If live products exist, prioritize them
          // We map them so they replace hardcoded versions if names match
          const merged = [...initialAllProducts];
          data.forEach(dbProd => {
            const idx = merged.findIndex(p => p.name === dbProd.name);
            if (idx !== -1) {
              merged[idx] = { ...merged[idx], ...dbProd };
            } else {
              merged.unshift(dbProd);
            }
          });
          setAllProducts(merged);
          setFeaturedProducts(merged.slice(0, 3));
        }
      } catch (err) {
        console.error("Link error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveProducts();
  }, []);

  return (
    <div className="flex flex-col gap-8 md:gap-10 pb-8 md:pb-12 overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full sm:max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 mt-0 sm:mt-6">
        <Link 
          href="/products" 
          className="block relative w-full overflow-hidden rounded-none sm:rounded-[3.5rem] shadow-2xl group aspect-[3/2] sm:aspect-[2048/770] h-auto"
        >
          <img 
            src="/hero-v15.png" 
            alt="Shree Avighna Premium Oils" 
            className="relative z-10 w-full h-full object-cover object-center block"
          />
          {/* Tagline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end items-center pb-8 md:pb-16 px-4 z-10 pointer-events-none">
            <div className="w-full flex flex-col items-center gap-3 md:gap-6 animate-fade-in-up">
              <h2 className="typewriter-text text-white text-[10px] sm:text-sm md:text-xl font-bold tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.4em] uppercase drop-shadow-xl text-center">
                100% Pure • Natural • Wood-Pressed
              </h2>
              <div className="inline-flex items-center gap-2 bg-primary text-stone-900 font-bold px-8 py-3 rounded-full transition-all hover:bg-yellow-500 hover:scale-105 active:scale-95 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider shadow-lg">
                Shop Now <ArrowRightIcon className="w-3 h-3 sm:w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-2 md:pt-4 pb-6 md:pb-12" id="products">
        <div className="flex justify-between items-end mb-6 md:mb-16" data-aos="fade-up">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-2">Our Products</h2>
            <p className="text-stone-500">Pure, healthy, and delivered fresh.</p>
          </div>
        </div>
        
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden"
        >
          {loading ? (
             [...Array(showAllProducts ? 8 : 3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-stone-100 h-[400px] rounded-3xl" />
            ))
          ) : (
            (showAllProducts ? allProducts : featuredProducts).map((product, idx) => (
              <motion.div 
                layout
                key={product.id || idx} 
                data-aos="fade-up" 
                data-aos-delay={idx * 100}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          )}
        </motion.div>

        <div className="mt-12 text-center" data-aos="fade-up">
          <Link 
            href="/products"
            className="group inline-flex items-center gap-2 font-bold text-secondary hover:text-secondary/80 transition-all bg-white border-2 border-secondary px-8 py-3 rounded-full"
          >
            View All Products <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#3C2A21] py-12 md:py-20" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16" data-aos="zoom-in">
            <h2 className="text-4xl font-bold text-stone-50 mb-4 font-serif">Why Choose Shree Avighna?</h2>
            <p className="text-stone-300 max-w-2xl mx-auto">We are committed to delivering the highest quality edible oils through traditional and natural methods.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, idx) => (
              <div key={benefit.title} className="text-center group" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-stone-900 transition-all duration-300">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-stone-50 mb-3">
                  {benefit.title === '100% Natural' ? (
                    <><CountUp target={100} suffix="%" /> Natural</>
                  ) : benefit.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  <TypeWriter text={benefit.desc} speed={35} delay={idx * 300} />
                </p>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showFullAbout && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden mt-20"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {whyChoose.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col items-center text-center group hover:bg-secondary hover:text-white transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-white group-hover:text-secondary transition-all">
                        <item.icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                      <p className="text-stone-500 group-hover:text-stone-200 leading-relaxed text-sm">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-24 max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-stone-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-stone-500">Find answers to common questions about our process and products.</p>
                  </div>
                  <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 md:p-12">
                    {faqs.map((faq, idx) => (
                      <FAQItem 
                        key={idx} 
                        q={faq.q} 
                        a={faq.a} 
                        isOpen={openFaq === idx}
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 text-center" data-aos="fade-up">
            <Link 
              href="/about"
              className="group inline-flex items-center gap-2 font-bold text-primary hover:text-white transition-all text-sm uppercase tracking-widest"
            >
              Learn More About Our Process <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 md:py-12" id="contact">
        <div className="text-center mb-6 md:mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">Get in Touch</h2>
          <p className="text-stone-500">Have questions? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {[
              { title: "Email Us", value: "shreeavighnanaturals@gmail.com", icon: EnvelopeIcon },
              { title: "Call Us", value: "9885801623 & +91 63042 18374", icon: PhoneIcon },
              { title: "Visit Us", value: "9-1-364/B/38/2, Gandhi Nagar, Bapu ghat, Golconda, Hyderabad, 500008, Telangana", icon: MapPinIcon }
            ].map((info, idx) => (
              <div key={info.title} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-4" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <info.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">{info.title}</h3>
                  <p className="text-stone-600 text-sm">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-stone-100 shadow-xl" data-aos="fade-left">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"></textarea>
              <button type="submit" className="btn-primary w-full py-4 text-lg font-bold">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-secondary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden flex flex-col items-center text-center" data-aos="flip-up">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/3 translate-y-1/3" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Ready to Switch to <br /> Healthy Living?</h2>
          <p className="text-green-100 max-w-xl mb-10 relative z-10">Start your journey towards health today with our pure, wood-pressed oils. Delivered straight to your doorstep.</p>
          <Link href="/products" className="btn-primary py-4 px-10 text-lg relative z-10 border-2 border-primary">
            Start Shopping Now
          </Link>
        </div>
      </section>
    </div>
  );
}
