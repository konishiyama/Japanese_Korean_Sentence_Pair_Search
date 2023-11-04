import firebaseConfig from "./config"
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, getDocs, setDoc, collection, query, where, limit } from "firebase/firestore";

class Firebase {
  db: any;
  constructor() {
    if (!firebaseInstance) {
      const firebase = initializeApp(firebaseConfig);
      this.db = getFirestore(firebase)
    }
  }

  async querySearch(queryInput:string){
    let q = query(collection(this.db, "ja_ko_corpus"), limit(10));

    // split input to 2-gram array
    const twoGrams = [];
    const characters = queryInput.split('');
    
    for (let i = 0; i < characters.length - 1; i++) {
      twoGrams.push(characters[i] + characters[i + 1]);
    }
    
    twoGrams.forEach(twoGram => {
      q = query(q, where(`jaWordMap.${twoGram}`, '==', true))
    });
    const result = await getDocs(q);
    
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
