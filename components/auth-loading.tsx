export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-purple-400 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        {/* Loading spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-bold text-white mb-2">
          meetus<span className="text-purple-200">VR</span>
        </h2>
        <p className="text-white/80">Checking authentication...</p>
      </div>
    </div>
  )
}
