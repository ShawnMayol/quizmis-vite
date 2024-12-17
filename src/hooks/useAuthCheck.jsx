import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthCheck = (redirectPath = "/login") => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [user, setUser] = useState(auth.currentUser);
    const [loading, setLoading] = useState(true); // Initial state is loading
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                setUser(user);
                setLoading(false);
                if (!user) {
                    navigate(redirectPath);
                }
            },
            (error) => {
                console.error("Error checking auth state: ", error);
                setError(error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [auth, navigate, redirectPath]);

    return { user, loading, error };
};

export default useAuthCheck;
