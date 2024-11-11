import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { doc, deleteDoc, updateDoc} from "firebase/firestore";
import { db } from '../firebase';
import Form from 'react-bootstrap/Form';
import { getStorage, ref, deleteObject } from "firebase/storage";

const Comment = ({commentObj, isOwener})=>{
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(commentObj.comment); //이전 글을 초기값

  const deleteComment = async ()=>{ 
    const storage = getStorage();
    const deleteConfirm = window.confirm('정말 삭제할까요?');
    if(deleteConfirm){
      await deleteDoc(doc(db, "comments", commentObj.id));

      // Create a reference to the file to delete
      const storageRef = ref(storage, commentObj.image);

      // Delete the file
      deleteObject(storageRef);
    }
  }
  const toggleEditMode = ()=>{
    setEdit(prev=>!prev);
  }
  
  const onChange = (e)=>{
    // let value = e.target.value;
    const {target:{value}} = e;
    setComment(value);
  }
  const onSubmit = async (e)=>{
    e.preventDefault();
    const commentRef = doc(db, "comments", commentObj.id);
    await updateDoc(commentRef, {
      comment: comment
    });
    setEdit(false);
  }

  return(
    <ListGroup.Item>
      <div className='d-flex flex-column'>
        {edit ? 
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="comment">          
              <Form.Control type="text" value={comment} onChange={onChange} placeholder="글을 입력해주세요" />
            </Form.Group>
            <div>
              <Button variant="info" type="button" onClick={toggleEditMode}>취소</Button>
              <Button variant="success" type="submit">입력</Button>
            </div>
          </Form>
        : 
        (
          <>
            {commentObj.comment}
            {commentObj.image && <div><img src={commentObj.image} alt="" width="100" /></div>}
            {isOwener &&            
              <div className='d-flex gap-1 align-self-end'>
                <Button variant="secondary" onClick={toggleEditMode}  size="sm">수정</Button>
                <Button variant="danger" onClick={deleteComment}  size="sm">삭제</Button>
              </div> 
            }
          </>
          )   
        }

   
      </div>
    </ListGroup.Item> 
  )
}
export default Comment;