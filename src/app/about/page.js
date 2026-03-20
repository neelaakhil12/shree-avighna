"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  CheckBadgeIcon, 
  BeakerIcon, 
  HeartIcon, 
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

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
  },
  {
    q: "What types of oils do you offer?",
    a: "We offer premium wood cold pressed oils, such as Groundnut Oil, Sesame Oil, Sunflower Oil, Safflower Oil, Mustard Oil, Flax Seed Oil, Badam Oil and Coconut Oil, produced using traditional methods."
  },
  {
    q: "Can wood cold pressed oils be used for cooking and frying?",
    a: "Yes. Our oils are suitable for daily cooking, sautéing, and deep frying, while also enhancing the natural flavor of food."
  },
  {
    q: "How should the oil be stored?",
    a: "Store the oil in a cool and dry place, away from direct sunlight, and keep the bottle tightly closed after use."
  },
  {
    q: "What is the shelf life of Shree Avighna oils?",
    a: "Our oils are best consumed within 9–12 months from the date of packaging for maximum freshness and quality."
  }
];

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

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-stone-100 py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 mb-4 tracking-tight">
            Shree Avighna – <span className="text-secondary italic">Crafted by Tradition,</span> <br className="hidden md:block" /> Trusted by Families
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-medium">
            At Shree Avighna, our oils are produced using traditional wood cold-pressing methods that help preserve natural nutrients, purity, and authentic flavor.
          </p>
        </div>
      </section>

      {/* About Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-stone-100" data-aos="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src="/services_showcase.png" 
                alt="Shree Avighna Premium Wood Cold Pressed Oils" 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                With a strong commitment to quality and chemical-free processing, we ensure that every product reflects the richness of traditional food practices. Our oils bring the goodness of tradition to modern families, offering natural and wholesome products that people can trust every day.
              </p>
              <div className="bg-secondary/5 border-l-4 border-secondary p-8 rounded-r-2xl">
                <h3 className="text-secondary font-bold text-xl mb-3">Our Goal</h3>
                <p className="text-stone-800 text-lg leading-relaxed font-semibold italic">
                  "To deliver high-quality wood cold pressed oils that bring purity, health, and traditional goodness to every household."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">Why Choose Shree Avighna</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChoose.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="organic-card p-8 group flex flex-col items-center text-center"
              data-aos="fade-up"
              data-aos-delay={idx * 50}
            >
              <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-secondary mb-6 transition-all group-hover:bg-secondary group-hover:text-white shadow-inner">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 mb-4">{item.title}</h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-stone-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">FAQ's</h2>
            <p className="text-stone-500">Everything you need to know about our products & process.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 md:p-12" data-aos="fade-up">
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
      </section>
    </div>
  );
}
