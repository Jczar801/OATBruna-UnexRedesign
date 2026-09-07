import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Cursos from "./components/Cursos";
import Depoimentos from "./components/Depoimentos";
import Unidades from "./components/Unidades";
import Noticias from "./components/Noticias";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Cursos />
        <Depoimentos />
        <Unidades />
        <Noticias />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
