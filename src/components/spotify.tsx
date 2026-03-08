import { Marquee } from "@/components/marquee";
import { DISCORD_SNOWFLAKE } from "@/utils/constants";
import { fetchSpotifyStatus } from "@/utils/spotify";
import {
  AnimatePresence,
  motion,
  type MotionNodeAnimationOptions,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Types } from "use-lanyard";
import { useLanyardWS } from "use-lanyard";

const EQUALIZER_DELAYS = [0, 0.15, 0.3];

const EQUALIZER_ANIMATION = {
  animate: {
    scaleY: [2, 10, 4, 8, 2].map((h) => h / 10),
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    layout: {
      type: "tween",
      ease: "easeInOut",
    },
  },
} as const satisfies MotionNodeAnimationOptions;

const SONG_CHANGE = {
  initial: {
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  transition: {
    duration: 0.3,
  },
} as const satisfies MotionNodeAnimationOptions;

const GLOW_FADE = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.5,
  },
} as const satisfies MotionNodeAnimationOptions;

const SPOTIFY_PILL_ANIMATION = {
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  initial: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
  },
  transition: {
    type: "spring",
    stiffness: 60,
    delay: 0.8,
  },
} as const satisfies MotionNodeAnimationOptions;

interface SpotifyState {
  song: string;
  artist: string;
  albumArtUrl: string;
  isPlaying: boolean;
}

export function Spotify() {
  const data = useLanyardWS(DISCORD_SNOWFLAKE);
  const [spotify, setSpotify] = useState<SpotifyState | null>(null);
  const staleWSData = useRef<Types.Spotify | null>(null);

  const currentSong = data?.spotify?.song;
  const isConnected = data !== undefined;

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    if (data?.spotify) {
      setSpotify({
        song: data.spotify.song,
        artist: data.spotify.artist ?? "",
        albumArtUrl: data.spotify.album_art_url ?? "",
        isPlaying: true,
      });

      staleWSData.current = data.spotify;
      return;
    }

    if (spotify && staleWSData.current !== null) {
      setSpotify({
        ...spotify,
        isPlaying: false,
      });

      return;
    }

    fetchSpotifyStatus().then((res) => {
      if (!res.lastTrack) return;

      const albumArt =
        res.lastTrack.image.find((img) => img.size === "extralarge")?.[
          "#text"
        ] ?? "";

      setSpotify({
        song: res.lastTrack.name,
        artist: res.lastTrack.artist.name,
        albumArtUrl: albumArt,
        isPlaying: false,
      });
    });
  }, [currentSong, isConnected]);

  return (
    <AnimatePresence>
      {spotify ? (
        <motion.div
          animate={SPOTIFY_PILL_ANIMATION.animate}
          initial={SPOTIFY_PILL_ANIMATION.initial}
          exit={SPOTIFY_PILL_ANIMATION.initial}
          transition={SPOTIFY_PILL_ANIMATION.transition}
          className="will-change-[transform,opacity,filter] grid"
        >
          <motion.div
            layout
            style={{
              borderRadius: 9999,
            }}
            className="absolute -top-10 p-0.5 overflow-hidden bg-surface min-w-48 max-w-[calc(100vw-3rem)] sm:max-w-md rounded-[9999px]"
          >
            <AnimatePresence mode="popLayout">
              {spotify.albumArtUrl ? (
                <motion.img
                  key={spotify.albumArtUrl}
                  initial={GLOW_FADE.initial}
                  animate={GLOW_FADE.animate}
                  exit={GLOW_FADE.initial}
                  transition={GLOW_FADE.transition}
                  className="absolute inset-0 h-full w-full object-cover scale-150 blur-3xl saturate-200 will-change-[transform,opacity]"
                  src={spotify.albumArtUrl}
                  alt=""
                />
              ) : null}
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-surface/50 to-surface" />

            <motion.div
              layout
              style={{
                borderRadius: 9999,
              }}
              className="relative flex gap-2 items-center bg-surface-alt overflow-hidden rounded-[9999px]"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={spotify.song}
                  className="flex items-center min-w-0 pl-2 py-2 will-change-[transform,opacity,filter]"
                  animate={SONG_CHANGE.animate}
                  initial={SONG_CHANGE.initial}
                  exit={SONG_CHANGE.initial}
                  transition={SONG_CHANGE.transition}
                >
                  <div className="shrink-0">
                    {spotify.albumArtUrl ? (
                      <>
                        <motion.div layout className="relative z-10">
                          <img
                            className="size-6 rounded-lg"
                            src={spotify.albumArtUrl}
                            alt={`${spotify.song} by ${spotify.artist}`}
                          />
                        </motion.div>

                        <img
                          className="absolute size-18 left-0 top-0 z-0 blur-3xl"
                          src={spotify.albumArtUrl}
                          alt={`${spotify.song} by ${spotify.artist}`}
                        />
                      </>
                    ) : null}
                  </div>
                  <Marquee className="min-w-0">
                    <motion.span layout className="text-content text-sm pl-2">
                      {spotify.song}
                    </motion.span>
                    <motion.span
                      layout
                      className="text-muted text-sm pl-2 whitespace-nowrap"
                    >
                      {spotify.artist}
                    </motion.span>
                  </Marquee>
                </motion.div>
              </AnimatePresence>

              <div className="relative flex items-center gap-0.5 h-[stretch] ml-auto pr-2 bg-surface-alt">
                <div className="absolute right-full h-full w-3 bg-linear-to-r from-transparent to-surface-alt pointer-events-none" />
                {EQUALIZER_DELAYS.map((delay, i) => (
                  <motion.div
                    layout
                    key={i}
                    className={
                      (spotify.isPlaying
                        ? "bg-accent h-2.5"
                        : "bg-faint h-1") +
                      " w-0.5 rounded-full origin-center will-change-transform"
                    }
                    animate={
                      spotify.isPlaying
                        ? EQUALIZER_ANIMATION.animate
                        : undefined
                    }
                    transition={{
                      ...EQUALIZER_ANIMATION.transition,
                      delay,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
