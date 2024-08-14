import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { setSortOrder } from '../redux/commentSlice';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const SortArrowContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const SortArrow = styled.div`
  font-size: 24px;
`;

const CommentSection = () => {
    const dispatch = useDispatch();
    const { comments, sortOrder } = useSelector((state) => state.comments);

    const handleSortToggle = () => {
        const newSortOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
        dispatch(setSortOrder(newSortOrder));
    };

    const sortedComments = [...comments].sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.date) - new Date(a.date);
        } else {
            return new Date(a.date) - new Date(b.date);
        }
    });

    return (
        <Container>
            <h2>Comments</h2>
            <CommentForm />
            <SortArrowContainer onClick={handleSortToggle}>
                <span>Sort by: {sortOrder}</span>
                <SortArrow sortOrder={sortOrder}>
                    {sortOrder === 'newest' ? '↓' : '↑'}
                </SortArrow>
            </SortArrowContainer>
            {sortedComments.map(comment => (
                <Comment key={comment.id} comment={comment} isReply={false} parentId={null} />
            ))}
        </Container>
    );
};

export default CommentSection;
