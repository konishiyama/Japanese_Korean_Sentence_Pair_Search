import { NextPage } from 'next';
import React from 'react';
import { Locale } from '@components/i18n';

interface QuerySnapshotItem {
  id: string;
  data: () => any;
}

interface ResultsListProps {
  queryResults: { docs: QuerySnapshotItem[] };
  lang: Locale;
}

const Results: NextPage<ResultsListProps> = ({ queryResults, lang }) => (
  <>
    {queryResults.docs.map((doc: QuerySnapshotItem) => (
        <React.Fragment key={doc.id}>
          <li className='py-4 border-b border-solid border-slate-50 text-sm md:text-base'>
            {lang === 'ja' ? (
              <>
                <p className='font-extralight'>{doc.data().ja}</p>
                <p className='font-extralight'>{doc.data().ko}</p>
              </>
            ) : (
              <>
                <p className='font-extralight'>{doc.data().ko}</p>
                <p className='font-extralight'>{doc.data().ja}</p>
              </>
            )}
          </li>
        </React.Fragment>
      ))}
  </>  
);

export default Results;
