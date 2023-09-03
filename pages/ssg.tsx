import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { Layout } from '../components/Layout';
import { supabase } from '../utils/supabase';
import { Task, Notice } from '../types/types';

type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}

export const getStaticProps: GetStaticProps = async () => {
  console.log('GetStaticProps ...RUN');

  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })
  
  console.log('GetStaticProps ...OK')  
  return { props: { tasks, notices } }
}

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  
  return (
    <Layout title='SSG'>
      <p className='mb-3 text-blue-500'>SSG</p>
    
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
      <Link href='/ssr' prefetch={false}>
        <p className='my-3 text-xs'>Link to ssr</p>
      </Link>

      <Link href='/isr' prefetch={false}>
        <p className='my-3 text-xs'>Link to isr</p>
      </Link>

    </Layout>
  )
}

export default Ssg;