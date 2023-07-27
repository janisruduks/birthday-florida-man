import type { DatePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import axios from 'axios';
import { Layout, Typography, DatePicker, Button, Card } from 'antd';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { useState } from 'react';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const shareUrl = "https://birthday-florida-man.vercel.app/";

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    const formattedDate = dayjs(`2023-${dateString.slice(5)}`).format('MMMM D');
    setBirthdate(formattedDate);
    setDate(formattedDate.replace(" ", "-").toLowerCase());
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/scrape?date=${date}`);
      const { title, description } = response.data;
      setTitle(title);
      setDescription(description);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <main>
      <Layout>
        <Header className='bg-black p-3'>
          <Title level={3} style={{ color: 'white' }}>🐊birthday.florida.man</Title>
        </Header>
        <Content className="m-3 flex flex-col items-center justify-center">
          <Title
            className="text-center"
            level={2}
            keyboard={true}
          >
            What is your birthday Florida man?
          </Title>
          <Title level={3}>Enter your birthdate to find out!</Title>

          <div className="gap-3 flex">
            <DatePicker onChange={onChange} />
            <Button onClick={handleSearch} className='bg-white'>
              Search
            </Button>
          </div>
        </Content>
        <Content className="p-3 flex flex-col items-center justify-center">
          {title && description && birthdate && (
            <Card
              style={{ width: 400 }}
              title={birthdate}
              className="border-slate-100 shadow-md"
              actions={[
                <TwitterShareButton
                  key="share"
                  className='m-3'
                  url={shareUrl}
                  title={"My birthday Florida man is:\n" + title}
                >
                  <TwitterIcon size={32} round />
                  <p>Share</p>
                </TwitterShareButton>
              ]}
            >
              <p className='font-semibold'>{title}</p>
              <br />
              <p className="font-thin">{description}</p>
            </Card>
          )}
        </Content>
      </Layout>
    </main>
  );
}
