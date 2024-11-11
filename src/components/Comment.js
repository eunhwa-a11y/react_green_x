import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';

const Comment = ({commentObj, isOwener})=>{

  return(
    <ListGroup.Item>
      <div className='d-flex justify-content-between'>
        {commentObj.comment}
        {isOwener && 
          <div className='d-flex gap-1'>
            <Button variant="secondary" size="sm">수정</Button>
            <Button variant="danger" size="sm">삭제</Button>
          </div>
        }
      </div>
    </ListGroup.Item> 
  )
}
export default Comment;