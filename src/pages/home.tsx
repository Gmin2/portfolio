import AnimatedText from "@/components/animated-text";
import HoverPreview from "@/components/hover-preview";
import { PROJECTS, WORK_ITEMS } from "@/utils/constants";
import getPreviewUrl from "@/utils/get-preview-url";
import {
  motion,
  type MotionNodeAnimationOptions,
  type Transition,
} from "motion/react";
import { memo, useCallback, useState } from "react";

type HoverState = {
  id: string;
  rect: DOMRect;
  previewUrl: string;
} | null;

const ITEM_ANIMATION = {
  initial: {
    opacity: 0,
    y: 5,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  transition: {
    duration: 1,
    ease: [0.2, 0.65, 0.3, 0.9],
  },
} as const satisfies MotionNodeAnimationOptions;

const ITEM_HOVER_TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 30,
} as const satisfies Transition;

const WORK_PREVIEW_URLS = new Map(
  WORK_ITEMS.map((item) => [item.slug, getPreviewUrl(item) ?? ""]),
);
const PROJECT_PREVIEW_URLS = new Map(
  PROJECTS.map((item) => [item.slug, getPreviewUrl(item) ?? ""]),
);

type ItemRowProps = {
  id: string;
  label: string;
  role: string;
  about: string;
  date?: string;
  url: string;
  isHovered: boolean;
  layoutId: string;
  delay: number;
  previewUrl: string;
  onHover: (id: string, previewUrl: string, rect: DOMRect) => void;
};

const ItemRow = memo(function ItemRow({
  id,
  label,
  role,
  about,
  date,
  url,
  isHovered,
  layoutId,
  delay,
  previewUrl,
  onHover,
}: ItemRowProps) {
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      onHover(id, previewUrl, e.currentTarget.getBoundingClientRect());
    },
    [onHover, id, previewUrl],
  );

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="relative flex flex-col items-start will-change-transform -mx-2 px-2 -my-1 py-1 text-left"
        initial={ITEM_ANIMATION.initial}
        animate={ITEM_ANIMATION.animate}
        transition={{
          ...ITEM_ANIMATION.transition,
          delay,
        }}
        onMouseEnter={handleMouseEnter}
      >
        {isHovered ? (
          <motion.div
            layoutId={layoutId}
            className="absolute inset-0 bg-hover-bg/30 border border-hover-bg/50 rounded-md"
            transition={ITEM_HOVER_TRANSITION}
          />
        ) : null}

        <div className="relative flex items-baseline justify-between gap-2 sm:gap-8 w-full">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="font-bold text-heading truncate">{label}</span>
            <span className="text-sm text-muted hidden sm:inline">
              {role}
            </span>
          </div>
          {date ? (
            <span className="text-sm text-faint whitespace-nowrap hidden sm:inline">
              {date}
            </span>
          ) : null}
        </div>

        <span className="relative text-xs text-muted sm:hidden">
          {role}
        </span>

        <span className="relative text-xs text-body">{about}</span>
        <img src={previewUrl} alt="" className="hidden" fetchPriority="low" />
      </motion.div>
    </a>
  );
});

export default function Home() {
  const [hoveredWork, setHoveredWork] = useState<HoverState>(null);
  const [hoveredProject, setHoveredProject] = useState<HoverState>(null);

  const handleWorkHover = useCallback(
    (id: string, previewUrl: string, rect: DOMRect) => {
      setHoveredWork({ id, rect, previewUrl });
    },
    [],
  );

  const handleProjectHover = useCallback(
    (id: string, previewUrl: string, rect: DOMRect) => {
      setHoveredProject({ id, rect, previewUrl });
    },
    [],
  );

  const clearWorkHover = useCallback(() => setHoveredWork(null), []);
  const clearProjectHover = useCallback(() => setHoveredProject(null), []);

  // Derive fill from hover state
  const hoveredWorkIdx = hoveredWork
    ? WORK_ITEMS.findIndex((w) => w.company === hoveredWork.id)
    : -1;
  const hoveredProjectIdx = hoveredProject
    ? PROJECTS.findIndex((p) => p.name === hoveredProject.id)
    : -1;

  // When hovering a project item, work line is fully filled
  const workFill =
    hoveredProjectIdx >= 0
      ? 1
      : hoveredWorkIdx >= 0
        ? (hoveredWorkIdx + 1) / WORK_ITEMS.length
        : 0;
  const projectFill =
    hoveredProjectIdx >= 0
      ? (hoveredProjectIdx + 1) / PROJECTS.length
      : 0;

  const workOutCurveFilled = workFill > 0;
  const incomingCurveFilled = workFill >= 1;
  const projectDotFilled = incomingCurveFilled;
  const projectOutCurveFilled = projectFill > 0;

  return (
    <>
      {/* ── Work Section ── */}
      <div className="relative mt-6">
        {/* Section header: dot + title */}
        <div className="relative flex items-center h-6">
          <div className="absolute left-[-28px] top-[8px] w-2 h-2 rounded-full bg-accent ring-4 ring-surface z-10" />
          <AnimatedText
            className="text-xl font-bold"
            element="h2"
            text="work"
            artificialDelay={0.3}
          />
        </div>

        {/* Outgoing curve: header dot → items line */}
        <svg
          className={`absolute left-[-24.5px] top-[12px] w-[14px] h-[16px] transition-colors duration-300 ${workOutCurveFilled ? "text-accent" : "text-line"}`}
          fill="none"
          stroke="currentColor"
        >
          <path d="M 0.5 0 C 0.5 8, 13 8, 13 16" strokeWidth="1" />
        </svg>

        {/* Items with vertical line */}
        <div className="relative pt-2 pb-4">
          {/* Background line */}
          <div className="absolute left-[-12px] top-[4px] bottom-[12px] w-px bg-line" />
          {/* Accent fill line */}
          <div
            className="absolute left-[-12px] top-[4px] bottom-[12px] w-px bg-accent origin-top transition-transform duration-300"
            style={{ transform: `scaleY(${workFill})` }}
          />
          <div
            className="flex flex-col gap-3"
            onMouseLeave={clearWorkHover}
          >
            {WORK_ITEMS.map((item, i) => {
              const filled =
                workFill > (i + 0.3) / WORK_ITEMS.length;
              return (
                <div
                  key={item.slug}
                  className="relative group/tl"
                >
                  <div
                    className={`absolute left-[-14px] top-[10px] w-[5px] h-[5px] rounded-full z-10 transition-colors duration-200 ${filled ? "bg-accent" : "bg-line group-hover/tl:bg-dot"}`}
                  />
                  <ItemRow
                    id={item.company}
                    label={item.company}
                    role={item.role}
                    about={item.about}
                    date={item.date}
                    url={item.url}
                    isHovered={hoveredWork?.id === item.company}
                    layoutId="work-hover"
                    delay={0.5 + i * 0.15}
                    previewUrl={WORK_PREVIEW_URLS.get(item.slug) ?? ""}
                    onHover={handleWorkHover}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Projects Section ── */}
      <div className="relative">
        {/* Incoming curve: work items line → projects header dot */}
        <svg
          className={`absolute left-[-24.5px] top-[-12px] w-[14px] h-[24px] transition-colors duration-300 ${incomingCurveFilled ? "text-accent" : "text-line"}`}
          fill="none"
          stroke="currentColor"
        >
          <path d="M 13 0 C 13 12, 0.5 12, 0.5 24" strokeWidth="1" />
        </svg>

        {/* Section header: dot + title */}
        <div className="relative flex items-center h-6">
          <div
            className={`absolute left-[-28px] top-[8px] w-2 h-2 rounded-full ring-4 ring-surface z-10 transition-colors duration-300 ${projectDotFilled ? "bg-accent" : "bg-dot"}`}
          />
          <AnimatedText
            className="text-xl font-bold"
            element="h2"
            text="projects"
            artificialDelay={0.3}
          />
        </div>

        {/* Outgoing curve: header dot → items line */}
        <svg
          className={`absolute left-[-24.5px] top-[12px] w-[14px] h-[16px] transition-colors duration-300 ${projectOutCurveFilled ? "text-accent" : "text-line"}`}
          fill="none"
          stroke="currentColor"
        >
          <path d="M 0.5 0 C 0.5 8, 13 8, 13 16" strokeWidth="1" />
        </svg>

        {/* Items with vertical line */}
        <div className="relative pt-2 pb-4">
          {/* Background line */}
          <div className="absolute left-[-12px] top-[4px] bottom-[24px] w-px bg-line" />
          {/* Accent fill line */}
          <div
            className="absolute left-[-12px] top-[4px] bottom-[24px] w-px bg-accent origin-top transition-transform duration-300"
            style={{ transform: `scaleY(${projectFill})` }}
          />
          <div
            className="flex flex-col gap-3"
            onMouseLeave={clearProjectHover}
          >
            {PROJECTS.map((project, i) => {
              const filled =
                projectFill > (i + 0.3) / PROJECTS.length;
              return (
                <div
                  key={project.slug}
                  className="relative group/tl"
                >
                  <div
                    className={`absolute left-[-14px] top-[10px] w-[5px] h-[5px] rounded-full z-10 transition-colors duration-200 ${filled ? "bg-accent" : "bg-line group-hover/tl:bg-dot"}`}
                  />
                  <ItemRow
                    id={project.name}
                    label={project.name}
                    role={project.role}
                    about={project.about}
                    url={project.url}
                    isHovered={hoveredProject?.id === project.name}
                    layoutId="project-hover"
                    delay={0.5 + i * 0.15}
                    previewUrl={PROJECT_PREVIEW_URLS.get(project.slug) ?? ""}
                    onHover={handleProjectHover}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <HoverPreview
          previewUrl={
            hoveredWork?.previewUrl || hoveredProject?.previewUrl || null
          }
          anchorRect={hoveredWork?.rect || hoveredProject?.rect || null}
        />
      </div>
    </>
  );
}
