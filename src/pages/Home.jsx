import { lazy } from "react";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Footer from "../components/Footer";

const Features = lazy(() => import("../sections/Features"));
const Products = lazy(() => import("../sections/Products"));
const Testimonials = lazy(() => import("../sections/Testimonials"));
const CTA = lazy(() => import("../sections/CTA"));
import ScrollToTopButton from "../components/ScrollToTopButton";
import Chaticon from "../components/ChatIcon";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <Features />
        <Products />
        <Testimonials />
        <CTA />
      </Suspense>
      <Footer />
      <ScrollToTopButton />
      <Chaticon />
    </>
  );
}

export default Home;
