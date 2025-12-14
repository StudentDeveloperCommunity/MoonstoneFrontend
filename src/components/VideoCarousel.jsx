export default function About() {
  return (
  <div className="min-h-screen bg-black flex items-center justify-center py-16 px-4">
  <div className="w-full max-w-[1440px] mx-auto rounded-t-[25px] overflow-hidden">
    <div className="flex flex-col lg:flex-row items-stretch min-h-[500px]">
      <div className="w-full lg:w-[500px] flex-shrink-0 bg-black rounded-r-[25px] lg:rounded-r-[25px] lg:rounded-l-none p-6 lg:p-4 flex items-center justify-center overflow-hidden">
        <video
          className="w-full h-full object-cover rounded-lg"
          controls
          poster="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
        >
          <source src="" type="video/mp4" />
          video
        </video>
      </div>

          <div className="flex-1 px-6 lg:px-12 py-8 lg:py-16 flex flex-col justify-center">
            <h2 
              className="text-lg md:text-xl lg:text-2xl font-bold uppercase mb-4 tracking-wide"
              style={{
                WebkitTextStroke: '1px #696969',
                color: 'transparent'
              }}
            >
              About Moonstone
            </h2>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase mb-6 lg:mb-8">
              It's Back
            </h3>
            
            <p className="text-white text-sm md:text-base lg:text-xl leading-relaxed text-justify max-w-[671px] mb-8">
              The fest is an unbeatable combination of talent and teamwork, featuring nail-biting techno-management competitions, intense sports challenges, exciting club activities, and captivating cultural performances. The fest is an unbeatable combination of talent and teamwork, featuring nail-biting techno-management competitions, intense sports challenges, exciting club activities, and captivating cultural performances. The fest is an unbeatable combination of talent and teamwork, featuring nail-biting techno-management competitions.
            </p>
            
            <a 
              href="#" 
              className="text-gray-400 text-base md:text-lg lg:text-xl underline hover:text-gray-300 transition-colors inline-flex items-center gap-1 self-start"
            >
              Read more →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
