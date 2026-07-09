import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";

export function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-primary">
      <Hero />
      <About />
      <Projects />
      <Skills />
    </main>
  );
}
