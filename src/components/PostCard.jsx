import React from 'react'
import StorageClass from '../appwrite/config'
import { Link } from 'react-router-dom'
// to display post card, you need to pass some props
// so whenever you will apply a query
// you'll get the post card from appwrite
// note- in appwrite variable id is written as '$id'

// joh bhi iss PostCard ko call kr rha hai. woh id toh de hi rha hai hume
function PostCard({$id, title, featureImage}) {
  
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-50 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img 
                    src={StorageClass.getFilePreview(featureImage)} alt={title}  // featuredimg id is same as entire post id ie. $id
                    className='rounded-xl' />
                </div>
                <h2 
                    className='text-xl font-bold'
                    >{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard