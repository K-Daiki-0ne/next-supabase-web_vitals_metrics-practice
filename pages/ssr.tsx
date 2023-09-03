import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Layout } from '../components/Layout';
import { supabase } from '../utils/supabase';
import { Task, Notice } from '../types/types';

type ServerSideProps = {
  tasks: Task[]
  notices: Notice[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('GetServerSideProps ...RUN');

  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })
  
  console.log('GetServerSideProps ...OK')  
  return { props: { tasks, notices } }
}

const Ssr: NextPage<ServerSideProps> = ({ tasks, notices }) => {
  return (
    <Layout title='SSR'>
      <p className='mb-3 text-pink-500'>SSR</p>
      <ul className='mb-3'>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className='text-lg font-extralight'>{task.title}</p>
            </li>
          )
        })}
      </ul>

      <ul className='mb-3'>
        {notices.map((note) => {
          return (
            <li key={note.id}>
              <p className='text-lg font-extralight'>{note.content}</p>
            </li>
          )
        })}
      </ul>
      <Link href='/ssg' prefetch={false}>
        <p className='my-3 text-xs'>Link to ssg</p>
      </Link>

      <Link href='/isr' prefetch={false}>
        <p className='my-3 text-xs'>Link to isr</p>
      </Link>
    </Layout>
  )
}

export default Ssr;