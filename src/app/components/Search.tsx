'use client';

// import querySearch from "./Firebase/Firestore/querySearch";
import { useState } from 'react'
import getFirebaseInstance from "./Firebase/firebase";
import {franc, francAll} from 'franc'

export default function Search() {
  const [queryInput, setQueryInput] = useState<string>('');
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  const [queryResults, setQueryResults] = useState({ docs: [] });

  const firebase = getFirebaseInstance();

  interface QuerySnapshotItem {
    id: string;
    data: () => any;
  }

  const [errorMessage, setErrorMessage] = useState("")

  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
    e.persist()
    setErrorMessage("")
    setQueryInput(e.target.value)
  }

  function handleKeyPress(e: { key: string; }) {
    switch (e.key) {
      case "Enter":
        if(composing) break;
        detectLanguage();
        getQuerySearchResult();
        break;
    }
  }

  function detectLanguage() {
    if(queryInput){
      console.log(queryInput);
      const language = franc(queryInput, {minLength: 1});
      setDetectedLanguage(language);
    } else {
      setDetectedLanguage('Please enter text');
    }
  };

  async function getQuerySearchResult() {
    try {
      const result:any = await firebase.querySearch(queryInput, detectedLanguage);
      if (result) {
        setQueryResults(result);
      }
    } catch (error) {
      console.error("Error during query:", error);
      setErrorMessage("")
    }
  }

  return (
    <>  
      <div className="flex w-1/2 justify-center items-center m-auto">
        <div className="m-auto">
          <div className="relative mt-2 rounded-md">
            <input
              type="text"
              name="data1"
              id="data1"
              className="block rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300"
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onCompositionStart={startComposition}
              onCompositionEnd={endComposition}
            />
          </div>
        </div>        
      </div>
      <ul>
        {queryResults.docs.map((doc: QuerySnapshotItem) => (
          <>
            <li key={doc.id}>
              <p>{doc.data().ja}</p>            
              <p>{doc.data().ko}</p>            
            </li>
            <br />
          </>
        ))}
      </ul>
    </>
  )
}