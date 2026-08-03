import VideoPlayer from './components/VideoPlayer';
import LiveChat from './components/LiveChat';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <h1 className="text-white text-2xl font-bold mb-4">Church Stream</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <VideoPlayer src="http://localhost/hls/test.m3u8" />
        </div>
        <div>
          <LiveChat />
        </div>
      </div>
    </div>
  );
}

export default App;