"use client";

export default function CardSkeleton({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div className={className || "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-slate-950 border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl animate-pulse flex flex-col justify-between h-full"
        >
          {/* Top Image Placeholder */}
          <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-slate-800/60 animate-ping opacity-30" />
            <div className="absolute top-3 left-3 w-20 h-5 bg-slate-800 rounded-md" />
            <div className="absolute top-3 right-3 w-24 h-6 bg-slate-800 rounded-lg" />
            <div className="absolute bottom-3 left-3 w-28 h-4 bg-slate-800/90 rounded" />
          </div>

          {/* Content Body Placeholder */}
          <div className="p-5 sm:p-6 space-y-4 flex-grow flex flex-col justify-between">
            <div className="space-y-3">
              {/* Title */}
              <div className="h-6 bg-slate-800/80 rounded-md w-3/4" />
              
              {/* Subtitle */}
              <div className="h-4 bg-slate-800/60 rounded-md w-1/2" />

              {/* Description lines */}
              <div className="space-y-2 pt-1">
                <div className="h-3.5 bg-slate-800/50 rounded w-full" />
                <div className="h-3.5 bg-slate-800/50 rounded w-5/6" />
              </div>

              {/* Feature bullets */}
              <div className="pt-2 space-y-2 border-t border-slate-900">
                <div className="h-3 w-3/4 bg-slate-800/60 rounded" />
                <div className="h-3 w-2/3 bg-slate-800/60 rounded" />
                <div className="h-3 w-4/5 bg-slate-800/60 rounded" />
              </div>
            </div>

            {/* Action Button Placeholder */}
            <div className="pt-4 border-t border-slate-900 flex gap-3">
              <div className="h-10 flex-1 bg-slate-800/70 rounded-lg" />
              <div className="h-10 w-20 bg-slate-800/50 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
