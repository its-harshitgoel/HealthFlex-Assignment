import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: JSON.parse(localStorage.getItem('comments')) || [],
  sortOrder: 'newest'
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    editComment: (state, action) => {
      const { id, text } = action.payload;
      const comment = state.comments.find(comment => comment.id === id);
      if (comment) {
        comment.text = text;
      } else {
        // Search for the reply in all comments
        for (let mainComment of state.comments) {
          if (mainComment.replies) {
            const reply = mainComment.replies.find(reply => reply.id === id);
            if (reply) {
              reply.text = text;
              break;
            }
          }
        }
      }
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    deleteComment: (state, action) => {
      const { id, parentId } = action.payload;
      if (parentId) {
        // This is a reply
        const parentComment = state.comments.find(comment => comment.id === parentId);
        if (parentComment && parentComment.replies) {
          parentComment.replies = parentComment.replies.filter(reply => reply.id !== id);
        }
      } else {
        // This is a main comment
        state.comments = state.comments.filter(comment => comment.id !== id);
      }
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    addReply: (state, action) => {
      const { parentId, reply } = action.payload;
      const comment = state.comments.find(comment => comment.id === parentId);
      if (comment) {
        if (!comment.replies) comment.replies = [];
        comment.replies.push(reply);
        localStorage.setItem('comments', JSON.stringify(state.comments));
      }
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { addComment, editComment, deleteComment, addReply, setSortOrder } = commentSlice.actions;

export default commentSlice.reducer;