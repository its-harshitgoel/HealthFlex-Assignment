import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addComment, addReply } from '../redux/commentSlice';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  height: 30px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 5px;
  resize: none;
  height: 70px;
`;

const Button = styled.button`
  padding: 8px 16px;
  width: 20%;
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
`;

const CommentForm = ({ parentId = null, onSubmitSuccess = () => { } }) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !text.trim()) return;

        const newComment = {
            id: Date.now(),
            name,
            text,
            date: new Date().toISOString(),
        };

        if (parentId) {
            dispatch(addReply({ parentId, reply: newComment }));
        } else {
            dispatch(addComment(newComment));
        }

        setName('');
        setText('');
        onSubmitSuccess();
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextArea
                    placeholder="Your Comment"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <Button type="submit">POST</Button>
            </Form>
        </>
    );
};

export default CommentForm;