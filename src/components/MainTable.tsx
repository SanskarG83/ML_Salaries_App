import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

interface SalaryData {
  work_year: number;
  job_title: string;
  salary_in_usd: number;
}

const MainTable: React.FC = () => {
  const [data, setData] = useState<SalaryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/data/salaries.json')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error loading data:', error));
  }, []);

  const columns = [
    {
      title: 'Year',
      dataIndex: 'work_year',
      sorter: (a: SalaryData, b: SalaryData) => a.work_year - b.work_year,
    },
    {
      title: 'Number of Total Jobs',
      dataIndex: 'num_jobs',
      render: (_: any, record: SalaryData) => data.filter(d => d.work_year === record.work_year).length,
    },
    {
      title: 'Average Salary (USD)',
      dataIndex: 'avg_salary',
      render: (_: any, record: SalaryData) => {
        const jobs = data.filter(d => d.work_year === record.work_year);
        const avgSalary = jobs.reduce((acc, job) => acc + job.salary_in_usd, 0) / jobs.length;
        return avgSalary.toFixed(2);
      },
      sorter: (a: any, b: any) => {
        const aJobs = data.filter(d => d.work_year === a.work_year);
        const aAvgSalary = aJobs.reduce((acc, job) => acc + job.salary_in_usd, 0) / aJobs.length;
        const bJobs = data.filter(d => d.work_year === b.work_year);
        const bAvgSalary = bJobs.reduce((acc, job) => acc + job.salary_in_usd, 0) / bJobs.length;
        return aAvgSalary - bAvgSalary;
      }
    }
  ];

  return <Table columns={columns} dataSource={data} rowKey="work_year" loading={loading} />;
};

export default MainTable;
