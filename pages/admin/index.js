import React from 'react';
import useSWR from 'swr';
import { request } from 'graphql-request';

const fetcher = (query) => request('api/graphql', query);
//const API = 'https://api.graph.cool/simple/v1/movies';
//const fetcher = (query) => request(API, query);

const AdminPage = () => {
  /*const { data, error } = useSWR(
    `{
        Movie(title: "Inception") {
        releaseDate
            actors {
                name
            }
        }
    }`,
    fetcher
  );*/
  const { data, error } = useSWR(
    `{
        menu {
            title
        }
    }`,
    fetcher
  );
  console.log('ERROR', error);
  if (error) return <div>failed to load {JSON.stringify(error)}</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {JSON.stringify(data)}!</div>;
};

export default AdminPage;
