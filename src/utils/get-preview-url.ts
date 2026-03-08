import duskpool from "@/assets/duskpool.png";
import robolend from "@/assets/robolend.png";
import unmasked from "@/assets/unmasked.png";
import obscura from "@/assets/obscura.png";
import sorobanDecoder from "@/assets/soroban-decoder.png";
import anchorLite from "@/assets/anchor-lite.png";
import markRs from "@/assets/mark-rs.png";

const PREVIEW_IMAGES: Record<string, string> = {
  duskpool,
  robolend,
  unmasked,
  obscura,
  "soroban-decoder": sorobanDecoder,
  anchorlite: anchorLite,
  "mark-rs": markRs,
};

const getPreviewUrl = (item: {
  slug: string;
  image?: string;
}): string | null => {
  return PREVIEW_IMAGES[item.slug] ?? null;
};

export default getPreviewUrl;
