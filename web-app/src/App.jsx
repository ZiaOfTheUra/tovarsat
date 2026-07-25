import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase-config.json';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import { useListMovies } from '@dataconnect/generated/react';
import './App.css';

const app = initializeApp(firebaseConfig);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Movies />
    </QueryClientProvider>
  );
}

function Movies() {
  const { isLoading, data } = useListMovies();
  if (isLoading) {
    return <h1>...</h1>
  }
  return (
    <>
      {data?.movies.map(
        movie => <h1 key={movie.id}>{movie.title}</h1>
      )}
    </>
  );
}

export default App;