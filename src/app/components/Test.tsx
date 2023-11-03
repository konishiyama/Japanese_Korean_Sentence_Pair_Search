'use client';
import { stringify } from "querystring";
import addData from "./Firebase/Firestore/addData";
import getDoument from "./Firebase/Firestore/getDoument";
import querySearch from "./Firebase/Firestore/querySearch";
import { useState } from 'react'

export default function Test() {
  const [queryInput, setQueryInput] = useState<string>('');
  const [queryResults, setQueryResults] = useState({ docs: [] });
  interface QuerySnapshotItem {
    id: string;
    data: () => any; // Assuming the data() method returns the document's data
  }

  const [errorMessage, setErrorMessage] = useState("")

  function handleInputChange(e:any) {
    e.persist()
    setErrorMessage("")
    setQueryInput(e.target.value)
  }

  async function querySearchResult() {
    console.log("query start");
    
    try {
      const result:any = await querySearch(queryInput);
      
      if (result) {
        setQueryResults(result);
        result.forEach((doc:any) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.data().body);
        });
      }
    } catch (error) {
      console.error("Error during query:", error);
      // Handle the error here, e.g., set an error message in state.
      // setErrorState(error.message);
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
              className="block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300"
              onChange={handleInputChange}
            />
          </div>
        </div>        
      </div>
      <div className="flex items-center justify-center mt-14 ">
        <button 
          className="h-10 px-6 font-semibold rounded-md bg-black text-white " 
          type="submit"
          onClick={querySearchResult}
        >
          Search
        </button>
      </div>
      <ul>
      {queryResults.docs.map((doc: QuerySnapshotItem) => (
        <li key={doc.id}>
          {JSON.stringify(doc.data().body)}
        </li>
      ))}
    </ul>
    </>
  )
}