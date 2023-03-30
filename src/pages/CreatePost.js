import React from 'react'
import { useState, useEffect } from 'react';
import {addDoc, collection} from 'firebase/firestore'
import { db,auth } from '../firebase-config';
import {useNavigate} from 'react-router-dom'

function CreatePost({isAuth}) {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef= collection(db,"posts");
  let navigate=useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {title, postText, author:{name:auth.currentUser.displayName ,id:auth.currentUser.uid }});
    navigate('/');
  };
  
  useEffect(() => {
    if(!isAuth){
      navigate('/login')
    }
  }, [])
  

  return (
    <div className='createPostpage'>
      <div className='cpContainer'>
        <h2>Create a Post</h2>
        <div className='inputGP'>
          <label>Title</label>
          <input placeholder='Title...' onChange={(event)=>{
            setTitle(event.target.value);
          }}/>
        </div>

        <div className='inputGP'>
          <label>Post</label>
          <textarea placeholder='Post...' onChange={(event)=>{
            setPostText(event.target.value);
          }}/>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost
