import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { editComment, deleteComment } from '../redux/commentSlice';
import CommentForm from './CommentForm';
import { FaTrash } from 'react-icons/fa';

const CommentContainer = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CommentBody = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin-right: 5px;
  padding: 2px 5px;
  cursor: pointer;
`;

const ReplyContainer = styled.div`
  margin-left: 20px;
  border-left: 2px solid #ddd;
  padding-left: 10px;
`;

const ActionText = styled.span`
    margin-right: 10px;
    padding: 2px 5px;
    cursor: pointer;
    color: #007bff;
    &:hover {
        text-decoration: underline;
    }
`;

const DeleteButton = styled(FaTrash)`
    cursor: pointer;
    color: grey;
`;

const CommenterName = styled.span`
  font-weight: bold;
  
`;

const Comment = ({ comment, isReply = false, parentId = null }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const [isReplying, setIsReplying] = useState(false);
    const dispatch = useDispatch();

    const handleEdit = () => {
        if (isEditing) {
            dispatch(editComment({ id: comment.id, text: editedText }));
        }
        setIsEditing(!isEditing);
    };

    const handleDelete = () => {
        dispatch(deleteComment({ id: comment.id, parentId }));
    };

    const toggleReply = () => {
        setIsReplying(!isReplying);
    };



    return (
        <CommentContainer>
            <CommentHeader>
                <CommenterName>{comment.name}</CommenterName>
                <span>{new Date(comment.date).toLocaleString()}</span>
            </CommentHeader>
            <CommentBody>
                {isEditing ? (
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                ) : (
                    comment.text
                )}
            </CommentBody>
            <div>
                <ActionText onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</ActionText>
                {!isReply && (
                    <ActionText onClick={toggleReply}>{isReplying ? 'Cancel Reply' : 'Reply'}</ActionText>
                )}
                <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </div>

            {isReplying && (
                <CommentForm parentId={comment.id} onSubmitSuccess={() => setIsReplying(false)} />
            )}
            {!isReply && comment.replies && comment.replies.length > 0 && (
                <ReplyContainer>
                    {comment.replies.map(reply => (
                        <Comment key={reply.id} comment={reply} isReply={true} parentId={comment.id} />
                    ))}
                </ReplyContainer>
            )}
        </CommentContainer>
    );
};

export default Comment;