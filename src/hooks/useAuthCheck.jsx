import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuthCheck = (redirectPath = '/login') => {
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate(redirectPath);
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [auth, navigate, redirectPath]);

    return auth.currentUser;
};

export default useAuthCheck;
