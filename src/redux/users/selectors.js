export const selectUsers = (state) => state.users.users;
export const selectUser = (state) => state.users.user;
export const selectNextUrl = (state) => state.users.nextUrl;
export const selectPrevUrl = (state) => state.users.prevUrl;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;