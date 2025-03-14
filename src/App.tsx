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
              title: "Full market access",
              description: "Get pre-screened, verified access to market insights in selected procurement RFPs",
              video: "/v1.mp4",
              cornerIcon: "/frame1.svg"
          },
          {
              title: "Full market access",
              description: "Get pre-screened, verified access to market insights in selected procurement RFPs",
              video: "/v2.mp4",
              cornerIcon: "/frame1.svg"
          },
          {
              title: "End-to-End Integration",
              description: "Streamlined process from RFPs to post-bidding and meetings support",
              video: "/v1.mp4",
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
          description: "Get transparent pro-active recommendations with clear execution steps and risk models",
          video: "/v1.mp4",
          cornerIcon: "/frame1.svg"
      },
      {
          title: "Interactive AI consultant",
          description: "Ask any question to understand your business drivers and explore optimization opportunities through AI",
          video: "/v2.mp4",
          cornerIcon: "/frame1.svg"
      },
      {
          title: "Continuous learning",
          description: "Keep a full history of targets, actions, and decisions to refine future spend strategies and track execution in real-time",
          video: "/v1.mp4",cornerIcon: "/frame1.svg"
      }]
  }
]
const testimonialdata3 = [
  {
    order:"row",
      features: [{
          title: "Seamless harmonization",
          description: "Compare transient stays, extended stays, meetings, and group bookings in a unified dashboard",
          video: "/v1.mp4",cornerIcon: "/frame1.svg"
      },
      {
          title: "Intelligent targets",
          description: "Set and monitor company goals with AI-driven alerts for optimization",
          video: "/v2.mp4",cornerIcon: "/frame1.svg"
      },
      {
          title: "Performance benchmarking",
          description: "Compare your spend patterns with industry and competitors across global benchmark",
          video: "/v1.mp4",cornerIcon: "/frame1.svg"
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