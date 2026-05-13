import React from "react";
import { getDictionary } from "../../dictionaries";
import { blogPosts } from "@/lib/blog-data";
import Image from "next/image";
import Link from "next/link";
import Navbar1 from "@/components/landing/NavBar";
import Footer from "@/components/landing/footer";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ lang: "en" | "fr" | "ar"; slug: string }>;
};

const BlogDetailPage = async ({ params }: Props) => {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const isRtl = lang === "ar";

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const translation = post.translations[lang];

  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden font-montserrat"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex justify-center w-full relative ">
        <Navbar1 dict={dict.navbar} lang={lang} color="black" />
      </div>

      <main className="pt-40 pb-24">
        <article className="container mx-auto px-4 md:px-24 max-w-7xl">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-12 transition-all hover:-translate-x-1 group font-medium"
          >
            <span className={isRtl ? "ml-2" : "mr-2"}>{isRtl ? "←" : "←"}</span>
            {isRtl ? "العودة إلى المدونة" : dict.blog.backToList}
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/20">
                {translation.category}
              </span>
              <span className="text-slate-500 text-sm font-medium">
                {dict.blog.publishedOn}{" "}
                {new Date(post.date).toLocaleDateString(lang, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 mb-10 leading-[1.1] tracking-tight">
              {translation.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">
                <span className="text-orange-600 font-bold">B</span>
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">
                  {post.author}
                </p>
                <p className="text-sm text-slate-500 font-medium">
                  Build360 Experts
                </p>
              </div>
            </div>
          </header>

          <div className="relative h-[400px] md:h-[600px] w-full mb-16 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl">
            <Image
              src={post.image}
              alt={translation.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className={`prose prose-lg max-w-none prose-slate ${isRtl ? "text-right" : "text-left"} prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50/50 prose-blockquote:py-4 prose-blockquote:rounded-r-xl`}
          >
            <p className="text-2xl text-slate-700 leading-relaxed mb-12 font-medium border-l-4 border-orange-500 pl-8 py-2 bg-orange-50/50 rounded-r-2xl">
              {translation.excerpt}
            </p>
            
            <div 
              className="blog-content text-slate-600 space-y-6 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: translation.content }}
            />

            <div className="mt-12 text-slate-600 space-y-8 text-lg leading-relaxed">
              <blockquote className="border-l-4 border-orange-500 pl-8 my-12 italic text-slate-900 text-2xl font-medium bg-slate-50 py-8 pr-8 rounded-r-3xl shadow-sm">
                &quot;3D virtual tours are not just a luxury anymore, they are a
                necessity for any business that wants to stand out in the
                digital age.&quot;
              </blockquote>
            </div>
          </div>

          <footer className="mt-20 pt-10 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <span className="text-slate-900 font-bold text-lg">
                  {isRtl ? "شارك المقال:" : "Share this article:"}
                </span>
                <div className="flex gap-3">
                  {["Twitter", "Facebook", "LinkedIn"].map((platform) => (
                    <button
                      key={platform}
                      className="p-3 bg-white hover:bg-orange-50 text-slate-600 hover:text-orange-500 transition-all rounded-2xl border border-slate-200 hover:border-orange-200 shadow-sm"
                    >
                      <span className="sr-only">{platform}</span>
                      <div className="h-6 w-6 font-bold flex items-center justify-center text-xs">
                        {platform[0]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </article>
      </main>

      <Footer dict={dict.footer} lang={lang} />
    </div>
  );
};

export default BlogDetailPage;
