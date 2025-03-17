export default function LoadingBox() {
  return (
    <div className="flex justify-center">
      <div className="animate-bounce border-black border-2  min-h-50 p-4 m-4  rounded-full"></div>
      <div className="animate-bounce animation-delay-200 border-blue-600 border-2 bg-blue-600 min-h-50 p-4 m-4 rounded-full"></div>
      <div className="animate-bounce animation-delay-400 border-black border-2 bg-black min-h-50 p-4 m-4 rounded-full"></div>
      <div className="animate-bounce animation-delay-600 border-red-600 border-2 bg-red-600 min-h-50 p-4 m-4 rounded-full"></div>
      <div className="animate-bounce animation-delay-800 border-green-800 border-2 bg-green-800 min-h-50 p-4 m-4 rounded-full"></div>
    </div>
  )
}
