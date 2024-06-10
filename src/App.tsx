import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import MainTable from './components/MainTable';
import LineGraph from './components/LineGraph';
import JobTitlesTable from './components/JobTitlesTable';
import Chat from './components/chat';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Title level={2} style={{ margin: '16px 0' }}>ML Engineer Salaries</Title>
      </Header>
      <Content>
        <MainTable />
        <LineGraph />
        {selectedYear && <JobTitlesTable year={selectedYear} />}
        <Chat />
      </Content>
    </Layout>
  );
};

export default App;
