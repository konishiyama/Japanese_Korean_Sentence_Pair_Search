'use client';

// import querySearch from "./Firebase/Firestore/querySearch";
import { useState } from 'react'
import getFirebaseInstance from "./Firebase/firebase";
import {franc, francAll} from 'franc'

import Results from './Results';

export default function Search() {
  const [queryInput, setQueryInput] = useState<string>('');
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  const [queryResults, setQueryResults] = useState({ docs: [] });
  // const [showResultsUl, setShowResultsUl] = useState(false)
  const [headerMeassage, setHeaderMeassage] = useState<string>('75万件の日韓例文ペアから、検索キーワードにマッチするものを最大で30件まで表示します。')
  
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
        // detectLanguage();
        getQuerySearchResult();
        break;
    }
  }

  async function getQuerySearchResult() {
    try {
      const result:any = await firebase.querySearch(queryInput);
      const resultLen = result.docs.length;
      if (resultLen > 1) {
        // setShowResultsUl(true);
        setHeaderMeassage(resultLen + '件該当');
        setQueryResults(result);
      }else{
        setHeaderMeassage('該当する結果はありませんでした');
      }
    } catch (error) {
      console.error("Error during query:", error);
      setErrorMessage("")
    }
  }

  return (
    <>  
      <div className="justify-center items-center mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
          </div>
          <input 
            type="search" 
            id="default-search" 
            className="block w-full p-3 ps-11 shadow-google text-base rounded-full focus:outline-none placeholder-base dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="単語または文章を入力" 
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onCompositionStart={startComposition}
            onCompositionEnd={endComposition}
            required 
          />  
        </div>
        <div className='mt-6 sm:mt-7'>
          <div className='bg-white shadow-google rounded-lg min-h-96 md:min-h-180'>
            <h3 className='border-b border-solid border-slate-100 rounded-t-lg px-4 py-3 font-semibold'>検索結果</h3>
            <div className='px-4 py-3'>
              <p className='text-light'>{headerMeassage}</p>
              <ul>
                <Results queryResults={queryResults} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}