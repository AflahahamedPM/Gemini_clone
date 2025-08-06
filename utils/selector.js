export const selectLatestChat = (state) => {
  return [...state.chats].sort((a, b) => b.createdAt - a.createdAt)[0];
};
