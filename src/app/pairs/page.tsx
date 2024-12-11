'use client';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getPairs, addPair, updatePair, deletePair } from '../../lib/api/pairs';
import { PairForm } from '@/components/PairForm';
import { PairActions } from '@/components/PairActions';

const queryClient = new QueryClient();

const PairsPageContent = () => {
  const [isClient, setIsClient] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['pairs'],
    queryFn: getPairs,
  });


  const pairs = Array.isArray(data?.body?.data) ? data?.body?.data : [];

  const addMutation = useMutation({
    mutationFn: addPair,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pairs'] }),
  });

  const updateMutation = useMutation({
    mutationFn: updatePair,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pairs'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePair,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pairs'] }),
  });

  if (!isClient) {
    return null;
  }

  console.log(pairs)

  return (
    <div>
      <h1 className="text-2xl mb-4">Crypto Pairs</h1>
      <PairForm onSubmit={addMutation.mutate} />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading pairs: {error.message}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Base</th>
              <th>Quote</th>
              <th>Interval</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pairs.length === 0 ? (
              <tr>
                <td colSpan="4">No pairs available</td>
              </tr>
            ) : (
              pairs.map((pair) => (
                <tr key={pair.id}>
                  <td>{pair.baseCurrency}</td>  {/* Check if the key names are correct */}
                  <td>{pair.quoteCurrency}</td>
                  <td>{pair.updateInterval}</td>
                  <td>
                    <PairActions
                      pair={pair}
                      onEdit={(updatedPair) => updateMutation.mutate({ id: pair.id, ...updatedPair })}
                      onDelete={() => deleteMutation.mutate(pair.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

const PairsPage = () => (
  <QueryClientProvider client={queryClient}>
    <PairsPageContent />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default PairsPage;
