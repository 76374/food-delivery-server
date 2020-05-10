import React from 'react';
import useSWR from 'swr';
import { request } from 'graphql-request';

const fetcher = (query) => request('api/graphql', query);

const AdminPage = () => {
  const { data, error } = useSWR(
    `{
        menu {
            title
        }
    }`,
    fetcher
  );
  if (error) {
      return <div>failed to load {JSON.stringify(error)}</div>;
  }
  if (!data) {
       return <div>loading...</div>;
  }
  return <div>hello {JSON.stringify(data)}!</div>;
};

export default AdminPage;
