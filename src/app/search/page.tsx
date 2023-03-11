"use client";
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react'

import {useRouter, useSearchParams } from "next/navigation"

import experimentData from "../../app/api/data/experimentos.json"

import bnccData from "../../app/api/data/bncc.json"
import topicGeneralData from "../../app/api/data/experimentGeneralData.json"
import topicSpecificData from "../../app/api/data/materias.json"

//Preciso colocar essa logica no home!

export default function Experiment() {
 
  const [experimentBnccData] = useState(bnccData)
  const [experimentGeneralData] = useState(topicGeneralData)
  const [experimentSpecificData] = useState(topicSpecificData)
  

  const router = useRouter();
  const searchParams = useSearchParams();
  const topicGeneral = searchParams.get('topicGeneral') || '';
  const topicSpecific = searchParams.get('topicSpecific') || '';
  const topicBncc = searchParams.get('topicBncc') || '';
  
  
  const filteredData = experimentData.filter(
    (experiment) =>
      (!topicGeneral || experiment.topicGeneral === topicGeneral) &&
      (!topicSpecific || experiment.topicSpecific === topicSpecific) &&
      (!topicBncc || experiment.topicBncc === topicBncc)
  );
  
  return (
    <>
     <div>
        <h1>Experiment data</h1>

        <select
          value={topicGeneral ?? ''}
          onChange={(e) => {
            const newTopicGeneral = e.target.value;
            router.push(`/search?topicGeneral=${newTopicGeneral}`);
          }}
        >
          <option value="">Select a general topic</option>
          {experimentGeneralData.map((topic) => (
            <option key={topic.id} value={topic.title}>
              {topic.title}
            </option>
          ))}
        </select>

        <select
          value={topicSpecific  ?? ''}
          onChange={(e) => {
            const newTopicSpecific = e.target.value;
            router.push(`/search?topicGeneral=${topicGeneral}&topicSpecific=${newTopicSpecific}`);
          }}
        >
          <option value="">Select a specific topic</option>
          {experimentSpecificData.map((topic) => (
            <option key={topic.id} value={topic.title}>
              {topic.title}
            </option>
          ))}
        </select>

        <select
          value={topicBncc  ?? ''}
          onChange={(e) => {
            const newTopicBncc = e.target.value;
            router.push(`/search?topicGeneral=${topicGeneral}&topicSpecific=${topicSpecific}&topicBncc=${newTopicBncc}`);
          }}
        >
          <option value="">Select a BNCC topic</option>
          {experimentBnccData.map((topic) => (
            <option key={topic.id} value={topic.title}>
              {topic.title}
            </option>
          ))}
        </select>

        {filteredData.length > 0 ? (
          <ul>
            {filteredData.map((experiment) => (
              <li key={experiment.id}><h3>{experiment.title}</h3> <p>{experiment.description}</p></li>
              
            ))}
          </ul>
        ) : (
          <p>No experiments found with general topic {topicGeneral}, specific topic {topicSpecific}, and BNCC topic {topicBncc}</p>
        )}
      </div>
    </>
  
  )
}
