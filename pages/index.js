import SanityBlockContent from '@sanity/block-content-to-react'

import { gql } from "@apollo/client";
import client from "../apollo-client";

import { useRouter } from 'next/router';

export default function Home({ posts }) {
 console.log(posts)
 const router = useRouter();
 return (
   <div className='container'>
    <h1 className='nav' onClick={() => router.push('/')}>My Blog</h1>

    {
    posts.map((post, index) => (
        <div key={index} className='postContainer'>
        <div className='postTitle'>{post.title}</div>

        <div className='postCard'>
            <img className='postImg' src={post.mainImage.asset.url} alt="postImage" />

            <div className='postDetails'>
            <div className='postPreview'>
                <SanityBlockContent blocks={post.bodyRaw} />
            </div>
            <button className='btn' onClick={() => router.push(`/post/${post.slug.current}`)}>Read more...</button>
            </div>
        </div>
         
         
        </div>
    ))
    }
   </div>
 )
}

export async function getServerSideProps() {
 const { data } = await client.query({
   query: gql`
   query {
    allBlog{
    title,
    slug {
        current
    },
    bodyRaw,
    mainImage {
        asset {
        url  
        }
    },
    }
   }`
 })

 return {
   props: {
    posts: data.allBlog
   }
 }
}
