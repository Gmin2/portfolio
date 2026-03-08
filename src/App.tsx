import AnimatedText from "@/components/animated-text";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { Spotify } from "@/components/spotify";
import Home from "@/pages/home";
import { PROJECTS, SOCIALS, WORK_ITEMS } from "@/utils/constants";
import {
  LayoutGroup,
  motion,
  type MotionNodeAnimationOptions,
  type Transition,
} from "motion/react";
import { useState } from "react";

const LAYOUT_SPRING = {
  type: "spring",
  stiffness: 80,
  damping: 20,
} as const satisfies Transition;

const FADE_UP = {
  initial: {
    opacity: 0,
    y: 12,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  transition: {
    duration: 0.8,
    ease: [0.2, 0.65, 0.3, 0.9],
  },
} as const satisfies MotionNodeAnimationOptions;

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <GitHubIcon />,
  X: <XIcon />,
  LinkedIn: <LinkedInIcon />,
};

export default function App() {
  const [showResume, setShowResume] = useState(false);

  return (
    <main className="flex h-full w-full overflow-hidden">
      <motion.div className="flex flex-1 bg-surface">
        <div className="flex-1 flex justify-center px-6 py-[15vh] overflow-y-auto">
          <LayoutGroup>
            <motion.div
              layout
              className="relative flex flex-col items-start w-full md:w-auto max-w-md md:max-w-none"
              transition={LAYOUT_SPRING}
            >
              <Spotify />

              <motion.h1
                layout
                className="font-bold whitespace-nowrap will-change-transform"
                style={{
                  fontSize: "clamp(1.13rem, 13.13vw, 3.75rem)",
                }}
                initial={FADE_UP.initial}
                animate={FADE_UP.animate}
                transition={{ ...FADE_UP.transition, delay: 0.1 }}
              >
                Gmin2
              </motion.h1>

              <AnimatedText
                text="software engineer"
                element="p"
              />

              <div className="flex items-center gap-3 mt-1">
                {SOCIALS.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-faint hover:text-body transition-colors"
                    initial={FADE_UP.initial}
                    animate={FADE_UP.animate}
                    transition={{
                      ...FADE_UP.transition,
                      delay: 0.3 + i * 0.1,
                    }}
                  >
                    {SOCIAL_ICONS[social.label]}
                  </motion.a>
                ))}

                <motion.span
                  className="text-faint text-xs"
                  initial={FADE_UP.initial}
                  animate={FADE_UP.animate}
                  transition={{ ...FADE_UP.transition, delay: 0.65 }}
                >
                  /
                </motion.span>

                <motion.a
                  href="https://gmin.blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-faint hover:text-body text-sm transition-colors"
                  initial={FADE_UP.initial}
                  animate={FADE_UP.animate}
                  transition={{ ...FADE_UP.transition, delay: 0.7 }}
                >
                  blog
                </motion.a>

                <motion.span
                  className="text-faint text-xs"
                  initial={FADE_UP.initial}
                  animate={FADE_UP.animate}
                  transition={{ ...FADE_UP.transition, delay: 0.75 }}
                >
                  /
                </motion.span>

                <motion.button
                  onClick={() => setShowResume(true)}
                  className="text-faint hover:text-body text-sm transition-colors cursor-pointer"
                  initial={FADE_UP.initial}
                  animate={FADE_UP.animate}
                  transition={{ ...FADE_UP.transition, delay: 0.8 }}
                >
                  resume
                </motion.button>
              </div>

              <Home />

              <noscript>
                <p>software engineer</p>
                <nav>
                  {SOCIALS.map((social) => (
                    <a key={social.label} href={social.href}>
                      {social.label}
                    </a>
                  ))}
                </nav>

                <h2>work</h2>
                {WORK_ITEMS.map((item) => (
                  <div key={item.slug}>
                    <a href={item.url}>
                      <strong>{item.company}</strong> — {item.role}
                    </a>
                    <p>{item.about}</p>
                    <span>{item.date}</span>
                  </div>
                ))}

                <h2>projects</h2>
                {PROJECTS.map((project) => (
                  <div key={project.slug}>
                    <a href={project.url}>
                      <strong>{project.name}</strong> — {project.role}
                    </a>
                    <p>{project.about}</p>
                  </div>
                ))}
              </noscript>
            </motion.div>
          </LayoutGroup>
        </div>
      </motion.div>
      {showResume ? (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowResume(false)}
        >
          <div
            className="absolute inset-4 sm:inset-8 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                open in new tab
              </a>
              <button
                onClick={() => setShowResume(false)}
                className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer"
              >
                close
              </button>
            </div>
            <object
              data="/resume.pdf"
              type="application/pdf"
              className="w-full flex-1 rounded-lg"
            >
              <div className="flex flex-col items-center justify-center h-full gap-2 bg-surface-alt rounded-lg">
                <p className="text-muted text-sm">Unable to display PDF</p>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-faint hover:text-body text-sm transition-colors underline"
                >
                  Download resume
                </a>
              </div>
            </object>
          </div>
        </motion.div>
      ) : null}
    </main>
  );
}
