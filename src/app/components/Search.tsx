'use client';

// import querySearch from "./Firebase/Firestore/querySearch";
import { useState, useEffect } from 'react';
import getFirebaseInstance from "./Firebase/firebase";
import {franc, francAll} from 'franc';

import Results from './Results';

export default function Search() {
  const [queryInput, setQueryInput] = useState<string>('');
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  const [queryResults, setQueryResults] = useState({ docs: [] });
  const [showResultsUl, setShowResultsUl] = useState(false);
  const [headerMeassage, setHeaderMeassage] = useState<string>('75万件の日韓例文ペアから、検索キーワードにマッチするものを最大で30件まで表示します。');
  
  const firebase = getFirebaseInstance();

  const [clientWindowHeight, setClientWindowHeight] = useState<number>(0);
  const [inputElementBackground, setInputElementBackground] =  useState('');
  const [inputElementPaddingTop, setInputElementPaddingTop] =  useState('0');
  const [inputElementPaddingBottom, setInputElementPaddingBottom] =  useState('0');
  
  const [errorMessage, setErrorMessage] = useState('')

  interface QuerySnapshotItem {
    id: string;
    data: () => any;
  }


  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage('');
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
    if(queryInput.length != 0){
      try {
        const result:any = await firebase.querySearch(queryInput);
        console.log(queryInput);
        const resultLen = result.docs.length;
        if (resultLen > 1) {
          setShowResultsUl(true);
          setHeaderMeassage(resultLen + '件該当');
          setQueryResults(result);
        }else{
          setShowResultsUl(false)
          setHeaderMeassage('該当する結果はありませんでした。');
        }
      } catch (error) {
        console.error("Error during query:", error);
        setShowResultsUl(false)
        setErrorMessage("")
      }
    }else{
      setErrorMessage('キーワードを入力してください。');
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    if (clientWindowHeight > 80) {
      setInputElementBackground('248, 250, 252, 255');
      setInputElementPaddingTop('1.5rem');
      setInputElementPaddingBottom('1.5rem');
    }else{
      setInputElementBackground('0, 0, 0, 0');
      setInputElementPaddingTop('0');
      setInputElementPaddingBottom('0');
    }
  }, [clientWindowHeight]);

  return (
    <>  
      <div className="justify-center items-center mx-auto">
        <div 
          className='relative sticky top-0' 
          style={{
            paddingTop:`${inputElementPaddingTop}`,
            paddingBottom:`${inputElementPaddingBottom}`
            }}
        >
          <button className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none pointer-events-auto" onClick={getQuerySearchResult}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
          </button>
          <input 
            type="search" 
            id="default-search" 
            // search cancel:https://github.com/tailwindlabs/tailwindcss/discussions/10190
            className={`appearance-none block w-full p-3 ps-11 shadow-google text-base rounded-full focus:outline-none ${
              errorMessage ? 'placeholder-red' : 'placeholder-base' // Add red color when there's an error
            }`}
            style={{
              backgroundColor: `rgba(${inputElementBackground})`,
              }}
            placeholder={errorMessage ? errorMessage : "キーワードを入力"}
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
              <ul className='' style={{ display: showResultsUl ? 'block' : 'none' }}>
                <Results queryResults={queryResults} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}