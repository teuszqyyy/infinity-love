export default function Loading() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#070707" }}>
      {/* Hero Skeleton */}
      <div className="h-screen w-full relative">
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#070707] to-transparent z-10" />
        
        <div className="absolute bottom-16 left-0 right-0 z-20 px-6 flex flex-col items-center">
          <div className="h-12 w-64 bg-white/10 rounded-lg animate-pulse mb-4" />
          <div className="h-4 w-48 bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-6 py-12 space-y-12">
        {/* Timer Skeleton */}
        <div className="space-y-6">
          <div className="h-8 w-40 bg-white/10 rounded-lg animate-pulse mx-auto" />
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
        
        {/* Music Skeleton */}
        <div className="h-28 bg-white/5 rounded-3xl animate-pulse" />
        
        {/* Message Skeleton */}
        <div className="space-y-3 px-4">
          <div className="h-6 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-6 bg-white/10 rounded-lg animate-pulse w-5/6 mx-auto" />
          <div className="h-6 bg-white/10 rounded-lg animate-pulse w-4/6 mx-auto" />
        </div>
      </div>
    </div>
  )
}
