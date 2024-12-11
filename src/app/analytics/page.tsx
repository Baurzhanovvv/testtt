'use client';

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getRates } from '../../lib/api/rates';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Create a QueryClient instance
const queryClient = new QueryClient();

const AnalyticsPageContent = () => {
    const [pairId, setPairId] = useState<number | null>(null);
    const [startDate, setStartDate] = useState<string>('2023-01-01');
    const [endDate, setEndDate] = useState<string>('2023-12-31');
    
    const { data: rates, isLoading, error } = useQuery({
        queryKey: ['rates', pairId, startDate, endDate],
        queryFn: () => (pairId ? getRates(pairId, startDate, endDate) : []),
        enabled: !!pairId,
    });

    return (
        <div>
            <h1>Analytics</h1>
            <select onChange={(e) => setPairId(Number(e.target.value))}>
                {/* Options for currency pairs should go here */}
            </select>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error loading rates</div>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={rates}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

const AnalyticsPage = () => (
    <QueryClientProvider client={queryClient}>
        <AnalyticsPageContent />
    </QueryClientProvider>
);

export default AnalyticsPage;
