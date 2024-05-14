import React, {useEffect, useState} from 'react';
import {getSigner} from './signer';
import {AlchemyContext} from './AlchemyContext';
import {createLightAccountAlchemyClient} from "@alchemy/aa-alchemy";
import {LocalAccountSigner, optimismSepolia} from "@alchemy/aa-core";
import {API_KEY} from "./constants";

export const AlchemyProvider = ({children}) => {
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
                    // 9c1a67228a40db7d40d4a9cda65a158c45102b61f74601d6a3f65a7cf469b27f
                    // 0xfE79697D55DACbEa7cC0F9B6EFBAaA91967ab009
                    const eoaSigner =
                        LocalAccountSigner.privateKeyToAccountSigner(`0x9c1a67228a40db7d40d4a9cda65a158c45102b61f74601d6a3f65a7cf469b27f`);

                    let alchemyAccount = await createLightAccountAlchemyClient({
                        apiKey: API_KEY,
                        chain: optimismSepolia,
                        signer: eoaSigner,
                        gasManagerConfig: {
                            policyId: "d47a3531-c8be-4506-92ef-3af9b7ca7012", // replace with your policy id, get yours at https://dashboard.alchemy.com/
                        },
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
        <AlchemyContext.Provider value={{signer, user, account}}>
            {children}
        </AlchemyContext.Provider>
    );
};