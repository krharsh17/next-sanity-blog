import React from 'react'
import SanityBlockContent from '@sanity/block-content-to-react'
import client from "../../apollo-client";
import { gql } from "@apollo/client";

import { useRouter } from 'next/router'

import { useEffect } from 'react'

export default function Post({ post }){
   // console.log(post)
   const router = useRouter()

   const updateLikes = () => {
    fetch('https://1errwial.api.sanity.io/v2021-06-07/data/mutate/production', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer skFPIYfjhAbylm0KrrVvPhJS3NxVUzVUPgvaT3JvnKAbDcKHeNx45M7xaa0xeoqbry9PeX4iqo5hLxYsp',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "mutations": [
                {
                    "patch": {
                    "id": `${post._id}`,
                    "inc": {
                        "likes": 1
                    }
                    }
                }]
        })
    }).then(res => res.json()).then(data => console.log(data))
   }

   const updateViews = () => {
    fetch('https://1errwial.api.sanity.io/v2021-06-07/data/mutate/production', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer skFPIYfjhAbylm0KrrVvPhJS3NxVUzVUPgvaT3JvnKAbDcKHeNx45M7xaa0xeoqbry9PeX4iqo5hLxYsp',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "mutations": [
                {
                    "patch": {
                    "id": `${post._id}`,
                    "inc": {
                        "views": 1
                    }
                    }
                }]
        })
    }).then(res => res.json()).then(data => console.log(data))
   }

   useEffect(()=> {
    updateViews()
   },[])

   return (
    <div className='container'>
        <h1 className='nav' onClick={() => router.push('/')}>My Blog</h1>
        <h1 className='postTitle'>{post.title}</h1>
        <img className='postImg floatImg' src={post.mainImage.asset.url} />
        <p style={{fontWeight: 'bold'}}>Published on: {post.publishedAt.split('T')[0]}</p>
        <SanityBlockContent blocks={post.bodyRaw} />
        <button className='btn' onClick={() => updateLikes()}>Like</button>
        <p>{post.likes} likes | {post.views} views</p>
    </div>
   )
}

export async function getServerSideProps(pageContext) {
   const pageSlug = pageContext.query.slug;

   if (!pageSlug) {
    return {
        notFound: true
    }
   }

   const { data } = await client.query({
    query: gql`
        query {
            allBlog(where: {
            slug: {
                current: {
                eq: "${pageSlug}"
                }
            }
            })
            {
            title,
            _id,
            mainImage {
                asset {
                url
                }
            },
            publishedAt,
            bodyRaw,
            likes,
            views
            }
        }`
    })

    return {
    props: {
        post: data.allBlog[0]
    }
    }
}