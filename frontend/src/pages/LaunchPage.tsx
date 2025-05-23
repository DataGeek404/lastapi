import React, {useState} from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/shared/PageHeader';
import Button from '@/components/shared/Button';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ProfileCard } from '@/components/shared/ProfileCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import launchVideo from '@/assets/vid1.mp4';
import topImage from '@/assets/peeps2.jpg';
import lowerImage from '@/assets/Rectangle 53.png';
import { speakers } from '../../src/data/speakersData'
import { panelists } from '../../src/data/panelists'
import { LivedExperiencesPanel } from "../components/layout/LivedExperiencePanel";
import { KeynoteSpeakers } from '../components/layout/KeynoteSpeakers';


const LaunchPage = () => {
  return (
    <>
      {/* <PageHeader
        title="Launch Your Initiative"
        subtitle="Get the support you need to bring your ideas to life and create positive change"
      /> */}

      {/* Launch Section */}
      <div id="launch" className="w-full bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 items-center"
          >
            <div className="md:pr-4 flex flex-col items-start">
              <span className="text-[#31AC6E] text-5xl md:text-6xl font-bold">The</span>
              <span className="text-[#31AC6E] text-5xl md:text-6xl font-bold">Launch</span>
            </div>
            <div className="md:pl-4 flex items-center">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                We launched a Symposium at the Cooperative University in Nairobi, Kenya, on 17th October 2024.
                <br /><br />
                This groundbreaking event—the first of its kind in Kenya and Africa—was themed <strong>“Lost Generation: Curse or Cause for Concern”</strong>, and brought together groups, organizations, professionals, and experts working on this issue.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-[300px] aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden shadow-xl">
              <video controls className="w-full h-full object-cover">
                <source src={launchVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>

        <div className="w-full bg-[#31AC6E] mt-16 -mb-16">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            src={topImage}
            alt="Symposium event"
            className="w-full h-auto max-h-[300px] md:max-h-[500px] object-cover object-center"
          />

          <div className="py-12"></div>

          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 mb-16"
            >
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
                  Objectives of the <br /> Symposium were :
                </h2>
                <img
                  src={lowerImage}
                  alt="Objectives visual"
                  className="w-full h-auto rounded-lg shadow-lg mb-6"
                />
              </div>
              <div className="flex items-center">
                <p className="text-white text-sm md:text-base leading-relaxed">
                  1. To convene stakeholders and lived experiences to share experiences 
                  and articulate strategies for tackling this significant issue as a shared responsibility.
                  <br /><br />
                  2. Participants will identify gaps and collaborate to address the root 
                  causes of illicit alcohol and drug abuse, learn from others providing support to those affected, 
                  and ultimately work to reduce the prevalence of substance abuse in society.
                  <br /><br />
                  3. To build and strengthen cooperation among medical practitioners, community based
                  programs, psychologists, mental health advocates, NGOs, and universities, encouraging continued 
                  conversation on illicit alcohol and drug abuse/addiction and its effects to the community and 
                  future generations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 pb-16"
            >
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
                  Symposium Agenda <br /> & Highlights
                </h2>
                <p className="text-white text-sm md:text-base">
                  The symposium featured engaging sessions and valuable discussions on substance abuse and its impact on society.
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Keynote Address by distinguished guests, setting the tone for the event.
                  <br /><br />
                  Presentation of Case Studies by NGOs, researchers, and medical professionals.
                  <br /><br />
                  Survivor Stories with personal narratives of overcoming addiction.
                  <br /><br />
                  Panel Discussions with audience interaction.
                  <br /><br />
                  Networking Opportunities to form lasting partnerships.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Keynote Speakers Section */}
  <KeynoteSpeakers/>

  <LivedExperiencesPanel />

    </>
  );
};

export default LaunchPage;
