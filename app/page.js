import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ServiceAccordion from './components/ServiceAccordion';
import StoreGrid from './components/StoreGrid';
import Stats from './components/Stats';
import LogoTicker from './components/LogoTicker';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <ServiceAccordion />
        <LogoTicker />
        <StoreGrid />
        <Stats />
      </main>
      <Footer />
    </>
  );
}
