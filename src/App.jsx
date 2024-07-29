import Navbar from './components/Navbar';
import BarGraph from './components/BarGraph';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import ScatterChart from './components/ScatterChart';
import Table from './components/Table';
const backend_url = import.meta.env.VITE_BACKEND_URL;


function App() {

  return (
    <div className="w-full h-full min-h-screen max-h-fit bg-gray-950">
      <Navbar />
      <div className="container max-h-fit mx-auto px-2 pb-2 mt-2 flex flex-col md:flex-row gap-1">
        <div className='px-2'>
          <BarGraph url={backend_url} />
          <PieChart url={backend_url} />
          <ScatterChart url={backend_url} />
          <LineChart url={backend_url} />
        </div>

        <div className='w-full px-2'>
          <Table url={backend_url} />
        </div>
      </div>
    </div>
  );
}

export default App;
