"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blog-data";
import { ArrowRight } from "lucide-react";

interface BlogSectionProps {
  dict: {
    badge: string;
    heading: string;
    subheading: string;
    readMore: string;
  };
  lang: "en" | "fr" | "ar";
}

const BlogSection = ({ dict, lang }: BlogSectionProps) => {
  const isRtl = lang === "ar";

  // Get latest 3 posts
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 overflow-hidden" id="blog">
      <div className="container mx-auto px-4 md:px-24">
        <div
          className={`flex flex-col justify-center items-center mb-16 text-center`}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-500 font-semibold tracking-wider uppercase mb-2 block"
          >
            {dict.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold from-black to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent bg-gradient-to-r mb-4"
          >
            {dict.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg"
          >
            {dict.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => {
            const translation = post.translations[lang];
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/${lang}/blog/${post.slug}`} className="group">
                  <div className="relative h-full flex flex-col bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={translation.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/80 backdrop-blur-md text-black dark:text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-lg">
                        {translation.category}
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-[2px] bg-orange-500"></span>
                        <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">
                          {new Date(post.date).toLocaleDateString(lang, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
                        {translation.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-base mb-8 line-clamp-3 leading-relaxed">
                        {translation.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-2 text-orange-500 font-bold group/btn">
                        <span className="text-sm uppercase tracking-wider">
                          {dict.readMore}
                        </span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 ${isRtl ? "rotate-180 group-hover/btn:-translate-x-1" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 justify-center px-4 py-3 rounded-full bg-[#000] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {isRtl
              ? "عرض كل المقالات"
              : lang === "fr"
                ? "Voir tous les articles"
                : "View all articles"}
            <div className="rounded-full border-2 bg-white p-2 text-black ">
              <ArrowRight
                className={`w-4 h-4 transition-transform -rotate-45 duration-300 group-hover/btn:translate-x-1 ${isRtl ? "rotate-180 group-hover/btn:-translate-x-1" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </ArrowRight>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
