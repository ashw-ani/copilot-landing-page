import { useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Preview from './components/Preview';

import CardStack from './components/CardStack';
import BenefitCards from './components/BenefitCards';
import References from './components/References';
import Technologies from './components/Technologies';



function App() {

  const testimonialdata1 = [
    {
        order:"row",
        features: [
          {
              title: "Seamless harmonization",
              description: "Consolidated spend data display across transient, extended stays, groups and meetings in a converged, historized overview that enables to benchmark suppliers, markets, points of sale, business divisions, and traveler personas.",
              video: "/Seamless_harmonization.mp4",
              cornerIcon: "/frame1.svg"
          },
          {
              title: "Intelligent Targets",
              description: "Configure company targets and strategies to govern your lodging and meeting program. Get notified with optimization recommendations when targets are at risk.",
              video: "/Intelligent_Targets.mp4",
              cornerIcon: "/frame1.svg"
          },
          {
              title: "Industry Benchmarking",
              description: "Compare your targets, strategies and spend patterns against global and industry-specific benchmarks.",
              video: "/Industry_Benchmarking.mp4",
              cornerIcon: "/frame1.svg"
          }
      ]
    }
]

const testimonialdata2 = [
  {
    order:"row-reverse",
      features: [{
          title: "Actionable insights",
          description: "AI-generated spend optimizations with transparent execution steps and pre-modelled risks derived from configured company targets.",
          video: "/Actionable_Insights.mp4",
          cornerIcon: "/frame1.svg"
      },
      {
          title: "GPT",
          description: " Interactive virtual consultant and caretaker supporting to explore insights and spend drivers",
          video: "/GPT.mp4",
          cornerIcon: "/frame1.svg"
      },
      {
          title: "Full market access",
          description: "Simplified procurement experience unlocking time for unbiased full market negotiations in 1 click.",
          video: "/Full_market_access.mp4",cornerIcon: "/frame1.svg"
      }]
  }
]
const testimonialdata3 = [
  {
    order:"row",
      features: [{
          title: "Automated Execution",
          description: "Transparent insights into Copilots execution of your decisions with an Action Log and Easy Reporting on taken activities and performance impact.",
          video: "/Automated_Execution.mp4",cornerIcon: "/frame1.svg"
      },
      {
          title: "Continuous Learning",
          description: "Never loose the history of targets and strategies set, spending, recommended and approved actions, and execution logs.",
          video: "/Continuous_Learning.mp4",cornerIcon: "/frame1.svg"
      },
      {
          title: "End-to-end integration",
          description: "Seamlessly connect Copilot technology into your existing lodging and meetings ecosystem through HRS procure-to-reclaim platform.",
          video: "/End_to_end_integration.mp4",cornerIcon: "/frame1.svg"
      }]
  }
]


  useEffect(() => {
    // Force scroll to top on initial load
    window.scrollTo(0, 0);
    // Prevent default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="App">
      {/* <FloatingCircle /> */}
      <Navbar />
      <Hero />
      <Preview />
      <CardStack/>
      
      <BenefitCards/>
      <References/>
      <Testimonials data={testimonialdata1} isReversed={false}/>
      <Testimonials data={testimonialdata2} isReversed={false}/>
      <Testimonials data={testimonialdata3} isReversed={false}/>
      <Technologies/>
      <div className='copilot-in-action'>
        <motion.h1
          initial={{ 
            opacity: 0, 
            y: 20,
            letterSpacing: "0.5em"
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            letterSpacing: "0.02em",
            transition: {
              duration: 1.2,
              ease: [0.215, 0.610, 0.355, 1.000],
              opacity: { duration: 0.8 },
              letterSpacing: { duration: 1.2 }
            }
          }}
          viewport={{ amount: 0.8 }}
        >
          See Copilot in action
        </motion.h1>
      </div>
      <Features />
      {/* <End /> */}
    </div>
  );
}

export default App;