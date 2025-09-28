import Hero from './Hero';
import MapSection from './MapSection';
import Statistics from './Statistics';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <main className="container mx-auto px-6 py-8">
        <Hero />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MapSection />
          </div>
          <div className="lg:col-span-1">
            <Statistics />
          </div>
        </div>
      </main>
    </div>
  );
}