export default function KnowMoreVideo() {
    return (
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-primary-500">
            Conoce más
          </h2>
  
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <video
              src="/home_video.mp4"
              controls
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-white text-2xl font-bold ml-1">timault</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  