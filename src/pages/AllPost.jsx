import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config.js'
import { Container, PostCard } from '../components/index.js'
function AllPost() {
    const [posts,setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            console.log(posts.rows);
            console.log(posts.total);
            
            if(posts) {
                setPosts(posts.rows)  // ← was posts.rows
            }
        })
    }, []) 
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} 
                    className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost