import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

interface SalaryData {
  work_year: number;
  job_title: string;
}

interface JobTitleData {
  job_title: string;
  count: number;
}

const JobTitlesTable: React.FC<{ year: number }> = ({ year }) => {
  const [data, setData] = useState<JobTitleData[]>([]);

  useEffect(() => {
    axios.get('/data/salaries.json')
      .then(response => {
        const salaries: SalaryData[] = response.data.filter((d: SalaryData) => d.work_year === year);
        const jobTitleCounts = salaries.reduce((acc: any, job: SalaryData) => {
          acc[job.job_title] = (acc[job.job_title] || 0) + 1;
          return acc;
        }, {});
        const jobTitlesData = Object.keys(jobTitleCounts).map(jobTitle => ({
          job_title: jobTitle,
          count: jobTitleCounts[jobTitle],
        }));
        setData(jobTitlesData);
      })
      .catch(error => console.error('Error loading data:', error));
  }, [year]);

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'job_title',
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'count',
    }
  ];

  return <Table columns={columns} dataSource={data} rowKey="job_title" />;
};

export default JobTitlesTable;
