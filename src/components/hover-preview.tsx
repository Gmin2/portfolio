import {
  AnimatePresence,
  motion,
  type MotionNodeAnimationOptions,
} from "motion/react";

const PREVIEW_TRANSITION = {
  initial: {
    opacity: 0,
    filter: "blur(4px)",
    x: -4,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
  },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 30,
  },
} as const satisfies MotionNodeAnimationOptions;

function HoverPreview({
  previewUrl,
  anchorRect,
}: {
  previewUrl: string | null;
  anchorRect: DOMRect | null;
}) {
  const isVisible = previewUrl !== null && anchorRect !== null;

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          layoutId="hover-preview"
          className="w-[500px] fixed z-50 pointer-events-none overflow-hidden rounded-lg border border-hover-bg/50 shadow-lg bg-surface"
          style={{
            top: anchorRect.top,
            left: anchorRect.right + 12,
            willChange: "transform, opacity, filter",
          }}
          initial={PREVIEW_TRANSITION.initial}
          animate={PREVIEW_TRANSITION.animate}
          exit={PREVIEW_TRANSITION.initial}
          transition={PREVIEW_TRANSITION}
        >
          <img
            key={previewUrl}
            src={previewUrl}
            alt=""
            className="w-full block aspect-16/10 object-cover"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default HoverPreview;
