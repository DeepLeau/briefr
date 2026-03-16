export default function DashboardLoading() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        {/* Header skeleton */}
        <div className="h-14 w-48 bg-[#111] rounded-lg animate-pulse mb-6" />
        
        {/* Stats skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#111] border border-white/[0.07] rounded-lg p-4">
              <div className="h-3 w-20 bg-white/[0.06] rounded mb-3" />
              <div className="h-7 w-24 bg-white/[0.05] rounded" />
            </div>
          ))}
        </div>

        {/* Briefs skeleton */}
        <div className="bg-[#111] border border-white/[0.07] rounded-lg overflow-hidden">
          <div className="h-12 bg-white/[0.04] border-b border-white/[0.06]" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 border-b border-white/[0.04] p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-white/[0.06] rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-white/[0.06] rounded" />
                <div className="h-3 w-2/3 bg-white/[0.05] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
