import { useEffect } from 'react';

export default function Search({ routeParams }) {
  useEffect(() => {
    document.title = routeParams.query;
  }, [routeParams]);

  return <h2>Search to: {routeParams.query}</h2>;
}
