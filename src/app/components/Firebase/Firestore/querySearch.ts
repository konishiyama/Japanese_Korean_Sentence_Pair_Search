import firebase from "../config";
import { getFirestore, doc, getDoc, getDocs, collection, query, where, limit } from "firebase/firestore";

const db = getFirestore(firebase)
const citiesRef = collection(db, "test");

export default async function querySearch(queryInput:string) {
  let q = query(collection(db, "test"), limit(10));

  // split input to 2-gram array
  const twoGrams = [];
  const characters = queryInput.split('');
  
  for (let i = 0; i < characters.length - 1; i++) {
    twoGrams.push(characters[i] + characters[i + 1]);
  }
  
  twoGrams.forEach(twoGram => {
    q = query(q, where(`test.${twoGram}`, '==', true))
  });
  const result = await getDocs(q);
  
  return result
}
