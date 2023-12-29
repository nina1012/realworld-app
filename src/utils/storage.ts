const storage = {
  getUser: () => {
    return JSON.parse(
      window.localStorage.getItem('user') || ''
    );
  },
  // setUser: (userData: string) => {
  //   return JSON.parse(
  //     window.localStorage.setItem(
  //       'user',
  //       JSON.stringify(userData)
  //     )
  //   );
  // },
  clearUser: (): void => {
    window.localStorage.removeItem('user');
  },
};

export default storage;
