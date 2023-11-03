import firebase from "../config";
import { getFirestore, doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";

const db = getFirestore(firebase)
const citiesRef = collection(db, "test");

export default async function querySearch(queryInput:string) {
    const q = query(citiesRef, where(`test.${queryInput}`, '==', true));
    const result = await getDocs(q);
    return result
    // let result = null;
    // let error = null;

    // try {
    //     result = await getDocs(q);
    // } catch (e) {
    //     error = e;
    // }

    // return { result, error };
}
