import React, {useEffect, useState} from 'react';
import {getSigner} from './signer';
import {AlchemyContext} from './AlchemyContext';
import { createLightAccountAlchemyClient } from "@alchemy/aa-alchemy";
import  {optimismSepolia} from "@alchemy/aa-core";
import {API_KEY} from "./constants";

export const AlchemyProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState("started");
    const [signer, setSigner] = useState(null);
    const [user, setUser] = useState(null);
    const [account, setAccount] = useState(null);

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
                if (!!userDetails) {
                    changeState("fetching-account")
                    let alchemyAccount = await createLightAccountAlchemyClient({
                        apiKey: API_KEY,
                        chain: optimismSepolia,
                        signer: signer,
                    });
                    console.log("alchemyAccount", alchemyAccount)
                    setAccount(alchemyAccount);
                    changeState("assigned-account")
                }
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
        <AlchemyContext.Provider value={{ signer, user, account }}>
            {children}
        </AlchemyContext.Provider>
    );
};