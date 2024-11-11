import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import ListGroup from 'react-bootstrap/ListGroup'; 

const Home = () => {
  const [comment, setComment] = useState(''); // 입력하는 글 정보 담기
  const [comments, setComments] = useState([]); // 조회된 글 배열 담기

  const getComments = async () => {

    
    const q = query(collection(db, "comments"));
    const querySnapshot = await getDocs(q);
    /*
    setComments가 너무 많이 많이 반복됨, 비효율적

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const commentObj = { / 값을
        ...doc.data(), / 만들
        id : doc.id / 고
      }
      setComments(prev => [commentObj, ...prev]); // 반복
    });

    const commentArr = querySnapshot.docs.map(doc => {return {...doc.data(), id:doc.id}})
    */
   const commentArr = querySnapshot.docs.map(doc => ( {...doc.data(), id:doc.id} ))
   setComments(commentArr);

  }
  console.log(comments);

  useEffect(() => {
    getComments();
  }, []) // 최초 렌더링 후 실행, 변동 시 실행

  const onChange = (e) => {
    // let value = e.target.value;
    const {target:{value}} = e;
    setComment(value);
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    console.log(comment, '실행');
    try {
      const docRef = await addDoc(collection(db, "comments"), { // 글 정보가 doRef 변수에 담기고
        // comment,
        comment:comment,
        date:serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id); // 그 값을 콘솔에 출력
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  return(
    <div className="container">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="comment">          
          <Form.Control type="text" onChange={onChange} placeholder="글을 입력해주세요" />
        </Form.Group>
        <Button variant="primary" type="submit">입력</Button>
      </Form>
      <hr />
      <ListGroup>
        {comments.map(item =>
           <ListGroup.Item>{item.comment}</ListGroup.Item>
           )}
      </ListGroup>
    </div>
  )
}
export default Home;