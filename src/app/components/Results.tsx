// Results.tsx
import { NextPage } from 'next';
import React from 'react';

interface QuerySnapshotItem {
  id: string;
  data: () => any;
}

interface ResultsListProps {
  queryResults: { docs: QuerySnapshotItem[] };
}

const Results: NextPage<ResultsListProps> = ({ queryResults }) => (
  <>
    {queryResults.docs.map((doc: QuerySnapshotItem) => (
        <React.Fragment key={doc.id}>
          <li className='py-4 border-b border-solid border-slate-50 text-sm md:text-base'>
            <p className='font-extralight'>{doc.data().ja}</p>
            <p>{doc.data().ko}</p>
          </li>
        </React.Fragment>
      ))}
  </>  
);

export default Results;
