import { Bloom } from "@/components/ui/bloom-loader";

export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div role="status" aria-label="Loading page">
        <Bloom size={88} showOrbit={false} />
      </div>
    </div>
  );
}
