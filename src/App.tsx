import Header from "../src/components/Header";
import Filters from "../src/components/Filters";
import LaunchList from "../src/components/LaunchList";
import {LaunchesProvider} from "../src/context/LaunchesContext";

export default function App() {
  return (
    <LaunchesProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="grid grid-1 md:grid-2 lg:grid-3 px-6 md:px-12 lg:px-20 xl:px-30 py-4 md:py-6 flex-1">
          <div className="mb-4 h-fit ">
            <Filters />
          </div>
          <section className="">
            <LaunchList />
          </section>
        </main>
      </div>
    </LaunchesProvider>
  );
}