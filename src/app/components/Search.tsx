'use client';

// import querySearch from "./Firebase/Firestore/querySearch";
import { useState } from 'react'
import getFirebaseInstance from "./Firebase/firebase";

export default function Search() {
  const [queryInput, setQueryInput] = useState<string>('');
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

  function handleInputChange(e:any) {
    e.persist()
    setErrorMessage("")
    setQueryInput(e.target.value)
  }

  function handleKeyPress(e: { key: string; }) {
    switch (e.key) {
      case "Enter":
        if(composing) break;
        getQuerySearchResult();
        break;
    }
  }

  async function getQuerySearchResult() {
    try {
      const result:any = await firebase.querySearch(queryInput);
      if (result) {
        setQueryResults(result);
        result.forEach((doc:any) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.data().body);
        });
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
          <li key={doc.id}>
            {doc.data().body}
          </li>
        ))}
      </ul>
    </>
  )
}