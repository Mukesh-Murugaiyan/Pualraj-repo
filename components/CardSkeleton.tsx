"use client";

export default function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-slate-950 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl animate-pulse flex flex-col justify-between"
        >
          {/* Top Image Placeholder */}
          <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-slate-800/60 animate-ping opacity-30" />
            <div className="absolute top-3 left-3 w-20 h-4 bg-slate-800 rounded" />
            <div className="absolute bottom-3 left-3 w-28 h-4 bg-slate-800/90 rounded" />
          </div>

          {/* Content Body Placeholder */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Title */}
            <div className="h-5 bg-slate-800/80 rounded w-3/4" />
            
            {/* Subtitle */}
            <div className="h-3 bg-slate-800/60 rounded w-1/2" />

            {/* Description lines */}
            <div className="space-y-2 pt-1">
              <div className="h-3 bg-slate-800/50 rounded w-full" />
              <div className="h-3 bg-slate-800/50 rounded w-5/6" />
            </div>

            {/* Spec tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-900">
              <div className="h-4 w-20 bg-slate-800/60 rounded" />
              <div className="h-4 w-24 bg-slate-800/60 rounded" />
            </div>

            {/* Action Button Placeholder */}
            <div className="pt-3 flex gap-3">
              <div className="h-10 flex-1 bg-slate-800/70 rounded-lg" />
              <div className="h-10 w-20 bg-slate-800/50 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
