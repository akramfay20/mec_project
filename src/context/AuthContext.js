import React, { createContext, useContext, useEffect, useReducer } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return { ...state, ...action.payload, loading: false };
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app_auth');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'INIT', payload: {
          isAuthenticated: !!parsed.isAuthenticated,
          user: parsed.user || null
        }});
      } else {
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
      }
    } catch {
      dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
    }
  }, []);

  const login = (user) => {
    const payload = { isAuthenticated: true, user };
    localStorage.setItem('app_auth', JSON.stringify(payload));
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('app_auth');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


