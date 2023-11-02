'use client';
import addData from "./Firebase/Firestore/addData";
import getDoument from "./Firebase/Firestore/getDoument";
import { useState } from 'react'

export default function Test() {
  const [formValues, setFormValues] = useState({ data1: "", data2: "" })
  const [dbData, setDbData] = useState({data1: "test", data2:"test", test:{"test":false, "test2":false}})
  const [errorMessage, setErrorMessage] = useState("")

  function handleInputChange(e:any) {
    e.persist()
    setErrorMessage("")
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  async function addDataTest(){
    const data = {
      data1: formValues.data1,
      data2: formValues.data2
    }
    const { result, error } = await addData('test', 'test', data)
    
    if (error) {
      return console.log("formSubmitError")
    }
  }

  async function getDataTest(){
    const { result, error } = await getDoument("test", "test");
    if(result){
      const data = result.data();
      const data1 = data?.data1;
      const data2 = data?.data2;
      const test = data?.test;
      setDbData({data1: data1, data2: data2, test: test})
    }

    if (error) {
      return console.log("formSubmitError")
    }
  }

  return (
    <>  
      <div className="flex w-1/2 justify-center items-center m-auto">
        <div className="m-auto">
          <label htmlFor="data1" className="block text-sm font-medium leading-6 text-gray-900">data1</label>
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
        <div className="m-auto">
          <label htmlFor="data2" className="block text-sm font-medium leading-6 text-gray-900">data2</label>
          <div className="relative mt-2 rounded-md">
            <input
              type="text"
              name="data2"
              id="data2"
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
          onClick={addDataTest}
        >
          Add Data
        </button>
      </div>
      <div className="flex items-center justify-center mt-14 ">
        <button 
          className="h-10 px-6 font-semibold rounded-md bg-black text-white " 
          type="submit"
          onClick={getDataTest}
        >
          Get Data
        </button>
      </div>
      <p>{dbData.data1}</p>
      <p>{dbData.data2}</p>
      {/* <p>{data1}</p> */}
    </>
  )
}