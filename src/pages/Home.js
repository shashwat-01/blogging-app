import React, { useEffect, useState } from 'react'
import {getDocs , deleteDoc,doc} from 'firebase/firestore'
import {collection} from 'firebase/firestore'
import { db,auth } from '../firebase-config';

function Home({isAuth}) {

  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef= collection(db,"posts");

  // const deletePost= async (id)=>{
  //   const postDoc = doc(db,"posts",id);
  //   await deleteDoc(postDoc);
  //   window.location.reload()
  // }

  // useEffect(()=>{
  //   const getPosts= async ()=>{
  //     const data = await getDocs(postsCollectionRef); 
  //     setPostLists(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
  //   };
  //   getPosts();
  // },[]);

  //---------------------------

  // const deletePost = useCallback(async (id) => {
  //   const postDoc = doc(db, "posts", id);
  //   await deleteDoc(postDoc);
  // }, []);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const data = await getDocs(postsCollectionRef);
  //       setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getPosts();
  // }, [deletePost]);

  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      setPostLists(
        data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    getPosts();
  };

  useEffect(() => {
    console.log("Effect called");
    getPosts();
  }, []);

 

  return (
    <div className='homePage'>
      {postLists.map((post)=>{
        return (
        <div className='post'>
          <div className='postHeader'>
            <div className='title'>
              <h2>{post.title}</h2>
            </div>
            <div className='deletePost'>
              {isAuth && post.author.id === auth.currentUser.uid && (<button onClick={()=>{deletePost(post.id)}}> &#128465; </button>) }
              
            </div>
          </div>

          <div className='postTextContainer'>
            {post.postText}
          </div>
          <h3 className='author'>{post.author.name}</h3>
        </div>
        );
      })}
    </div>
  )
}

export default Home
