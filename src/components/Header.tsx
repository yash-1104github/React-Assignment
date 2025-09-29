export default function Header() {
  return (

    <header className="py-5 md:px-8 bg-white/80 backdrop-blur border-b sticky top-0 z-20">
      
      <div className="w-full px-8 md:px-4 lg:px-8 xl:px-18  flex items-center justify-between ">
      
        <div className="text-2xl md:text-3xl font-light  flex flex-col gap-1 mr-2">
          Atmosly SpaceX Mission Explorer
          <div className="text-sm md:text-base font-light text-gray-500">Fetch real data from the SpaceX public API. Filter, explore and save favorite launches</div>
        </div>
      
        <div className="hidden md:block text-sm text-slate-600">
          Developed by Yash Gupta with  lots of ❤️ and coffee ☕
        </div>
    
      </div>
    </header>
  );
}