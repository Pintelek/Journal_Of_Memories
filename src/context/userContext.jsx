import { createContext, useState } from 'react';

export const UserContext = createContext ({
  userId : 1
});

export function UserContextProvider ({children}) {

  const [userId, setUserId] = useState(1);

  return(
    <UserContext.Provider value={{userId : userId, setUserId : setUserId}}>
      {children}
    </UserContext.Provider>
  );
}