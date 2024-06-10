import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface SalaryData {
  work_year: number;
  salary_in_usd: number;
}

const LineGraph: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get('./data/salaries.json')
      .then(response => {
        const salaries = response.data;
        const years = Array.from(new Set(salaries.map((d: SalaryData) => d.work_year)));
        const graphData = years.map(year => {
          const jobs = salaries.filter((d: SalaryData) => d.work_year === year);
          const avgSalary = jobs.reduce((acc: number, job: SalaryData) => acc + job.salary_in_usd, 0) / jobs.length;
          return { year, avgSalary };
        });
        setData(graphData);
      })
      .catch(error => console.error('Error loading data:', error));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="avgSalary" stroke="#8884d8" activeDot={{ r: 11 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
