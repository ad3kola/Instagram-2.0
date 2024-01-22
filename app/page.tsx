import Image from 'next/image'
import NavHeader from '../components/NavHeader'
import NavSidebar from '../components/NavSidebar'
import FeedSection from '@/components/FeedSection'
import Widgets from '@/components/Widgets'
import { Toaster } from 'react-hot-toast'
import { IGPostsCollectionRef } from '@/firebase-config'
import { getDocs, orderBy, query } from 'firebase/firestore'
import { PostDetailsProps } from '@/utils/typings'
import { generateUsersData } from '@/utils/getUserStoriesData'
import { getServerSession } from 'next-auth'

async function fetchPosts() {
  const fetchPostsQuery = query(
      IGPostsCollectionRef,
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(fetchPostsQuery);
    const queryData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as PostDetailsProps[];
  
    return queryData
}

async function fetchStories() {
  const storiesData = await generateUsersData(20);
  return storiesData
}
export default async function Home() {
    const SSRPosts = await fetchPosts()
    const SSRStories = await fetchStories()
    const session = await getServerSession()
  return (
    <main className='overflow-hidden relative'>
      <Toaster />
      <NavHeader />
      <div className  = 'flex w-full h-screen px-2 xl:justify-between overflow-hidden'>
      <NavSidebar />
      <FeedSection SSRPosts = {SSRPosts} SSRStories = {SSRStories} />
      <Widgets />
      </div>
    </main>
  )
}
