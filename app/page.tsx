import { Introduction } from "@/components/introduction";
import { AboutMe } from "@/components/about-me";
import { MyServices } from "@/components/my-services";
import { DesignApproach } from "@/components/design-approach";
import { Portfolio } from "@/components/portfolio";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Introduction />
      <MyServices />
      <AboutMe />
      <DesignApproach />
      <Portfolio />
      <Footer />
    </main>
  );
}
