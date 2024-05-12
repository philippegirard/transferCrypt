import React, {useEffect, useState} from 'react';
import {getSigner} from './signer';
import {AlchemyContext} from './AlchemyContext';

export const AlchemyProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState("started");
    const [signer, setSigner] = useState(null);
    const [user, setUser] = useState(null);

    function changeState(newState) {
        console.log("Changing state to", newState)
        setState(newState);
    }

    useEffect(() => {
        const signer = getSigner();
        changeState("fetching-signer")
        setSigner(signer);
        changeState("found-signer")
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (signer) {
                changeState("fetching-user")
                const userDetails = await signer.getAuthDetails().catch(() => null);
                setUser(userDetails);
                changeState("assigned-user")
                changeState("ready")
            }
        };

        fetchUser();
    }, [signer]);

    useEffect(() => {
        if (state == "ready") {
            setLoading(false);
        }
    }, [state]);

    if (loading) {
        return (<>Loading AlchemyProvider...</>)
    }

    return (
        <AlchemyContext.Provider value={{ signer, user }}>
            {children}
        </AlchemyContext.Provider>
    );
};