import React from "react";
import { getDictionary } from "../dictionaries";
import { blogPosts } from "@/lib/blog-data";
import Image from "next/image";
import Link from "next/link";
import Navbar1 from "@/components/landing/NavBar";
import Footer from "@/components/landing/footer";

type Props = {
  params: Promise<{ lang: "en" | "fr" | "ar" }>;
};

const BlogPage = async ({ params }: Props) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isRtl = lang === "ar";

  return (
    <div
      className="min-h-screen bg-slate-50 dark:bg-[#020617] overflow-x-hidden font-montserrat"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex justify-center w-full relative">
        <Navbar1 dict={dict.navbar} lang={lang} color="black" />
      </div>

      <main className="pt-40 pb-24">
        <div className="container mx-auto px-4 md:px-24">
          <div
            className={`flex flex-col mb-20 ${isRtl ? "text-right" : "text-left"}`}
          >
            <span className="text-orange-500 font-semibold tracking-wider uppercase mb-3 block">
              {dict.blog.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold from-black to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent bg-gradient-to-r mb-6">
              {dict.blog.heading}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl text-xl leading-relaxed">
              {dict.blog.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post) => {
              const translation = post.translations[lang];
              return (
                <Link
                  key={post.id}
                  href={`/${lang}/blog/${post.slug}`}
                  className="group"
                >
                  <div className="relative h-full flex flex-col bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-72 w-full overflow-hidden">
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
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
                        {translation.title}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 text-base mb-8 line-clamp-3 leading-relaxed">
                        {translation.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-2 text-orange-500 font-bold group/btn">
                        <span className="text-sm uppercase tracking-wider">
                          {dict.blog.readMore}
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
              );
            })}
          </div>
        </div>
      </main>

      <Footer dict={dict.footer} lang={lang} />
    </div>
  );
};

export default BlogPage;
