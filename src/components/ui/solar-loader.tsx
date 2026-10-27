import { BloomLoader } from "./bloom-loader";

/** Kept under its original name so every existing `loading.tsx` import keeps working. */
export function SolarLoader({ size = 88, label = "Loading" }: { size?: number; label?: string }) {
  return <BloomLoader size={size} label={label} />;
}
