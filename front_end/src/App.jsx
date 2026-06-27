import Navbar from './component/Navbar'
// import Manager from './component/Manager';
import Footer from './component/Footer'


export default function App() {
  return (
    <div class="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#fefce8] via-[#fee2e2] via-[#f3e8ff] to-[#fae8ff]">
      <Navbar />
      {/* <Manager /> */}
      <Footer />
    </div>
  );
}