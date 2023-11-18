import { error } from "console";
import firebaseConfig from "./config"
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, getDocs, setDoc, collection, query, where, limit } from "firebase/firestore";
import { franc } from 'franc'

class Firebase {
  db: any;
  constructor() {
    if (!firebaseInstance) {
      const firebase = initializeApp(firebaseConfig);
      this.db = getFirestore(firebase)
    }
  }


  async querySearch(queryInput:string){
    let q = query(collection(this.db, "ja_ko_corpus"), limit(50));
    const detectedLanguage = franc(queryInput, {minLength: 1});
    let targetLangMap:string;
    switch (detectedLanguage) {
      case "jpn":
        targetLangMap = "ja_n_gram_map";
        break;
      case "kor":
        targetLangMap = "ko_n_gram_map";
        break;
      default:
        targetLangMap = "ja_n_gram_map";
    }
    let result:any;
    const queryInputLen = queryInput.length;
    if(queryInputLen == 1){
      q = query(q, where(`${targetLangMap}.${queryInput}`, '==', true))
      result = await getDocs(q);
    }else{ 
      // split input into 2-gram array
      const twoGrams = [];
      const characters = queryInput.split('');
      
      for (let i = 0; i < characters.length - 1; i++) {
        twoGrams.push(characters[i] + characters[i + 1]);
      }
      twoGrams.forEach(twoGram => {
        q = query(q, where(`${targetLangMap}.${twoGram}`, '==', true))
      });
      result = await getDocs(q);  
    }
    return result
  }


  async getDocument(collection:string, id:string) {
    let docRef = doc(this.db, collection, id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
  }

  
  async addData(colllection:string, id:string, data: any) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(this.db, colllection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
  }

  
}

let firebaseInstance:any

function getFirebaseInstance() {
  if (!firebaseInstance) {
    firebaseInstance = new Firebase()
    return firebaseInstance
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null
  }
}

export default getFirebaseInstance
