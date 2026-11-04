"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { toast } from "@heroui/react";
import {
  HiOutlineSparkles,
  HiOutlineBookOpen,
  HiOutlineArrowPath,
  HiOutlineClipboardDocumentCheck,
  HiCheck,
  HiOutlineClock,
  HiOutlineLightBulb,
  HiOutlineArrowRight,
  HiOutlineHeart,
} from "react-icons/hi2";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  style: ["italic", "normal"],
});

interface QuoteItem {
  quote: string;
  author: string;
  source: string;
  tag: string;
}

const LITERARY_QUOTES: QuoteItem[] = [
  {
    quote: "I have always imagined that Paradise will be a kind of a library.",
    author: "Jorge Luis Borges",
    source: "Poem of the Gifts",
    tag: "Sanctuary",
  },
  {
    quote:
      "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin",
    source: "A Dance with Dragons",
    tag: "Perspective",
  },
  {
    quote: "There is no friend as loyal as a book.",
    author: "Ernest Hemingway",
    source: "Reflections on Reading",
    tag: "Companionship",
  },
  {
    quote: "Books are a uniquely portable magic.",
    author: "Stephen King",
    source: "On Writing",
    tag: "Wonder",
  },
  {
    quote: "The mind is not a vessel to be filled, but a fire to be kindled.",
    author: "Plutarch",
    source: "On Listening to Lectures",
    tag: "Enlightenment",
  },
  {
    quote:
      "It is what you read when you don't have to that determines what you will be when you can't help it.",
    author: "Oscar Wilde",
    source: "Epigrams",
    tag: "Curiosity",
  },
  {
    quote:
      "You can never get a cup of tea large enough or a book long enough to suit me.",
    author: "C.S. Lewis",
    source: "Collected Letters",
    tag: "Comfort",
  },
];

const CODE_QUOTES: QuoteItem[] = [
  {
    quote:
      "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson & Gerald Jay Sussman",
    source: "Structure and Interpretation of Computer Programs",
    tag: "Humanity",
  },
  {
    quote:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    source: "Refactoring: Improving the Design of Existing Code",
    tag: "Clarity",
  },
  {
    quote: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    source: "EWD498",
    tag: "Elegance",
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    source: "Software Craftsmanship",
    tag: "Strategy",
  },
  {
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    source: "Linux Kernel Mailing List",
    tag: "Pragmatism",
  },
  {
    quote: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
    source: "Clean Architecture Principles",
    tag: "Intuition",
  },
  {
    quote: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
    source: "UI/UX & Systems Design",
    tag: "Empathy",
  },
];

interface VibeTheme {
  id: string;
  label: string;
  vibeText: string;
  accentGradient: string;
  borderColor: string;
  badgeBg: string;
  companionTip: string;
}

const VIBE_THEMES: VibeTheme[] = [
  {
    id: "cozy",
    label: "#CozyRainyRead",
    vibeText: "Steaming tea, distant thunder, and unhurried contemplation.",
    accentGradient: "from-amber-500 via-[#ff5b49] to-[#ff0018]",
    borderColor: "border-amber-400/40 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/10 text-amber-700 border-amber-300/40",
    companionTip: "Brew chamomile tea and set your lamp to a golden 2700K warmth.",
  },
  {
    id: "coding",
    label: "#LateNightCoding",
    vibeText: "Sharp logic, quiet midnight silence, and rhythmic keystrokes.",
    accentGradient: "from-indigo-500 via-purple-600 to-[#ff5b49]",
    borderColor: "border-indigo-400/40 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/10 text-indigo-700 border-indigo-300/40",
    companionTip: "Listen to ambient synth or gentle lo-fi to anchor your mental flow.",
  },
  {
    id: "philosophical",
    label: "#PhilosophicalDusk",
    vibeText: "Twilight questions, expanding horizons, and lingering thoughts.",
    accentGradient: "from-rose-600 via-orange-600 to-amber-600",
    borderColor: "border-rose-400/40 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/10 text-rose-700 border-rose-300/40",
    companionTip: "Keep a physical notebook beside you to jot down sudden epiphanies.",
  },
  {
    id: "pageturner",
    label: "#PageTurnerSprint",
    vibeText: "Pounding pulse, rapid chapters, and an insatiable desire to know.",
    accentGradient: "from-[#ff0018] via-rose-500 to-pink-500",
    borderColor: "border-rose-400/40 hover:border-rose-500/60",
    badgeBg: "bg-[#ff0018]/10 text-[#ff0018] border-rose-300/40",
    companionTip: "Silence notifications entirely. Give the prose your absolute focus.",
  },
];

export default function SanctuaryOfMinds() {
  const [activeTab, setActiveTab] = useState<"literature" | "code">(
    "literature",
  );
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Vibe state
  const [activeVibe, setActiveVibe] = useState<VibeTheme>(VIBE_THEMES[0]);
  const [pagesCount, setPagesCount] = useState<number>(35);

  const activeQuoteList =
    activeTab === "literature" ? LITERARY_QUOTES : CODE_QUOTES;
  const currentQuote = activeQuoteList[quoteIndex % activeQuoteList.length];

  // Shuffle wisdom within active category with smooth fade-up animation
  const handleShuffleQuote = () => {
    setIsFading(true);
    setTimeout(() => {
      setQuoteIndex((prev) => {
        let nextIndex = Math.floor(Math.random() * activeQuoteList.length);
        if (nextIndex === prev && activeQuoteList.length > 1) {
          nextIndex = (nextIndex + 1) % activeQuoteList.length;
        }
        return nextIndex;
      });
      setIsFading(false);
    }, 180);
  };

  // Switch category tabs with graceful fade
  const handleTabChange = (tab: "literature" | "code") => {
    if (tab === activeTab) return;
    setIsFading(true);
    setActiveTab(tab);
    setTimeout(() => {
      setQuoteIndex(0);
      setIsFading(false);
    }, 150);
  };

  // Copy quote to clipboard with tactile feedback
  const handleCopyQuote = () => {
    const textToCopy = `"${currentQuote.quote}" — ${currentQuote.author} (${currentQuote.source})`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast.success("Wisdom copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2200);
    } else {
      toast.success("Wisdom selected!");
    }
  };

  // Reading time estimator (~1.15 minutes per page)
  const estimatedMinutes = Math.max(1, Math.round(pagesCount * 1.15));

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24 bg-linear-to-b from-white via-[#fcfbf9] to-[#f7f5f0] dark:from-[#0f0f10] dark:via-[#141416] dark:to-[#0f0f10] text-[#121212] dark:text-neutral-100 border-t border-neutral-200/70 dark:border-neutral-800 transition-colors duration-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-amber-500/20 shadow-xs text-amber-600 dark:text-amber-400">
            <HiOutlineSparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-pulse" />
            <span>The Intersection of Thought</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] dark:text-white tracking-tight leading-tight">
            The Sanctuary of Minds:<br/>
            <span className="bg-linear-to-r from-amber-500 via-rose-500 to-rose-600 bg-clip-text text-transparent">
              Code &amp; Literature
            </span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Where the rhythm of poetic prose converges with the elegance of
            computational craftsmanship. Pause here to draw inspiration, calibrate
            your reading rhythm, and embrace the architecture of ideas.
          </p>
        </div>

        {/* Main Grid: Dual-Wisdom Vault + Vibe & Reading Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Component A: Dual-Wisdom Vault (7 Cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-7 sm:p-9 md:p-10 rounded-[2rem] backdrop-blur-xl bg-white/80 dark:bg-[#18181b]/80 border border-[#ff5b49] shadow-2xl shadow-stone-900/5 ring-1 ring-amber-500/10 dark:ring-amber-500/20 transition-all relative overflow-hidden group">
            <div className="space-y-6 relative z-10">
              {/* Category Toggle Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 dark:border-amber-500/30 pb-5">
                <div className="flex items-center p-1.5 bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-2xl w-fit border border-neutral-200/40 dark:border-neutral-700/60 shadow-inner">
                  <button
                    type="button"
                    onClick={() => handleTabChange("literature")}
                    className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                      activeTab === "literature"
                        ? "bg-white dark:bg-neutral-900 text-[#b45309] dark:text-amber-400 shadow-md shadow-neutral-300/40 dark:shadow-black/50 scale-102"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:scale-[1.02]"
                    }`}
                  >
                    <HiOutlineBookOpen className="w-4 h-4" />
                    <span>Literary Soul</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange("code")}
                    className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                      activeTab === "code"
                        ? "bg-white dark:bg-neutral-900 text-[#ff5b49] dark:text-[#ff0018] shadow-md shadow-neutral-300/40 dark:shadow-black/50 scale-102"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:scale-[1.02]"
                    }`}
                  >
                    {"</>"}
                    <span>Developer&apos;s Mind</span>
                  </button>
                </div>

                {/* Active Category Tag */}
                <span className="self-start sm:self-auto px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-[#b45309] dark:text-amber-300 border border-amber-500/20 dark:border-amber-500/30 shadow-2xs">
                  {currentQuote.tag}
                </span>
              </div>

              {/* Quote Display Area */}
              <div
                className={`min-h-42.5 sm:min-h-40 flex flex-col justify-center transition-all duration-300 ease-out ${
                  isFading
                    ? "opacity-0 translate-y-3 scale-[0.98]"
                    : "opacity-100 translate-y-0 scale-100"
                }`}
              >
                <div className="text-5xl sm:text-6xl text-[#d97706] dark:text-[#f59e0b] font-serif leading-none select-none -mb-3">
                  &ldquo;
                </div>
                <blockquote
                  className={`${playfair.className} text-xl sm:text-2xl lg:text-[1.7rem] italic font-medium text-[#b45309] dark:text-[#fbbf24] leading-snug tracking-normal`}
                >
                  {currentQuote.quote}
                </blockquote>

                <div className="pt-5 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2.5 border-t border-amber-500/20 dark:border-amber-500/30 mt-4">
                  <span className="font-bold text-[#92400e] dark:text-[#fde68a] text-sm sm:text-base tracking-tight">
                    — {currentQuote.author}
                  </span>
                  <span className="text-xs text-[#b45309]/80 dark:text-[#fbbf24]/80 font-medium italic">
                    ({currentQuote.source})
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons for Wisdom Vault */}
            <div className="pt-6 mt-6 border-t border-amber-500/20 dark:border-amber-500/30 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <button
                type="button"
                onClick={handleShuffleQuote}
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] rounded-2xl shadow-lg shadow-[#ff5b49]/25 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <HiOutlineArrowPath
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isFading ? "rotate-180" : ""
                  }`}
                />
                <span>Shuffle Wisdom</span>
              </button>

              <button
                type="button"
                onClick={handleCopyQuote}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200 bg-white/90 dark:bg-neutral-800/90 hover:bg-amber-50/50 dark:hover:bg-neutral-700/80 hover:text-amber-800 dark:hover:text-amber-300 border border-amber-500/20 dark:border-amber-500/30 shadow-xs hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <HiCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <HiOutlineClipboardDocumentCheck className="w-4 h-4 text-[#d97706] dark:text-[#f59e0b]" />
                    <span>Copy Wisdom</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Component B: Interactive Mini-Tool / Vibe Widget (5 Cols on desktop) */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between p-7 sm:p-9 md:p-10 rounded-[2rem] backdrop-blur-xl bg-white/80 dark:bg-[#18181b]/80 border ${activeVibe.borderColor} shadow-2xl shadow-stone-900/5 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500 relative overflow-hidden`}
          >
            {/* Top Accent Gradient Bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r ${activeVibe.accentGradient}`}
            />

            <div className="space-y-6 relative z-10">
              {/* Widget Title & Vibe Tag Pills */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <HiOutlineLightBulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span>Reading Mood &amp; Pace</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {VIBE_THEMES.map((theme) => {
                    const isSelected = activeVibe.id === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setActiveVibe(theme)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? `${theme.badgeBg} font-bold shadow-sm scale-105 ring-1 ring-current`
                            : "bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border-neutral-200/80 dark:border-neutral-700/80 hover:bg-white dark:hover:bg-neutral-700 hover:scale-105 active:scale-95"
                        }`}
                      >
                        {theme.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 italic pt-1 leading-relaxed">
                  &ldquo;{activeVibe.vibeText}&rdquo;
                </p>
              </div>

              {/* Reading Time Estimator Slider */}
              <div className="space-y-3 pt-4 border-t border-neutral-200/60 dark:border-neutral-800">
                <div className="flex justify-between items-center text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <span>Volume Length / Planned Pages:</span>
                  <span className="font-bold text-neutral-900 dark:text-white bg-white dark:bg-neutral-900 px-3 py-1 rounded-xl border border-[#ff0018]/20 dark:border-[#ff0018]/30 shadow-xs scale-102 transition-transform">
                    {pagesCount} pages
                  </span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={pagesCount}
                  onChange={(e) => setPagesCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-neutral-200/80 dark:bg-neutral-700/80 rounded-lg appearance-none cursor-pointer accent-[#ff0018] focus:outline-none transition-all"
                />

                <div className="flex justify-between text-[11px] text-neutral-400 dark:text-neutral-500">
                  <span>A short chapter (5p)</span>
                  <span>Novella deep-dive (150p)</span>
                </div>
              </div>

              {/* Computed Pace Result Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#ff0018]/10 dark:bg-[#ff0018]/15 border border-[#ff0018]/20 dark:border-[#ff0018]/30 space-y-2 shadow-lg shadow-[#ff0018]/10 transition-all duration-300">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <HiOutlineClock className="w-4 h-4 text-[#ff5b49] dark:text-[#ff0018]" />
                  <span>Estimated Sanctuary Time:</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                  ~{estimatedMinutes} Minutes{" "}
                  <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                    of uninterrupted focus
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-amber-500/20 dark:border-amber-500/30 pt-2.5">
                  <strong className="text-neutral-800 dark:text-neutral-100">Curator Tip:</strong>{" "}
                  {activeVibe.companionTip}
                </p>
              </div>
            </div>

            {/* Vibe Footer Note */}
            <div className="pt-4 mt-4 border-t border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 relative z-10">
              <span className="flex items-center gap-1.5">
                <HiOutlineHeart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                Calibrated for deep thinkers
              </span>
              <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                BookNook Vibe Engine
              </span>
            </div>
          </div>
        </div>

        {/* Component C: Universal Call-to-Action (CTA Banner) */}
        <div className="relative rounded-[2rem] p-8 sm:p-12 md:p-14 bg-linear-to-r from-[#18181b] via-[#232327] to-[#18181b] dark:from-[#111113] dark:via-[#19191d] dark:to-[#111113] text-white shadow-2xl border border-neutral-800 dark:border-neutral-700/60 overflow-hidden group">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3.5 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-white/10 text-white/90 border border-white/15 backdrop-blur-md">
                ✦ An Open Invitation
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Whether You {" "} <span className="text-[#ff0018] dark:text-[#ff5b49]"> Craft Algorithms </span> {" "} or Devour Chapters, You Belong Here
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Step beyond the digital noise. Borrow a companion for tonight, or
                bestow a cherished volume from your personal shelf upon our
                enduring library commons.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full lg:w-auto justify-center">
              <Link
                href="/books"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] rounded-2xl shadow-lg shadow-[#ff5b49]/25 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Peruse Grand Catalog</span>
                <HiOutlineArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/add-book"
                className="group inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-neutral-200 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/15 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Bestow a Volume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
