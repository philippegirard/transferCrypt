import {useContext, useEffect, useState} from "react";
import {useAlchemy} from "./useAlchemy";
import {AuthPage} from "./AuthPage";
import {DashboardPage} from "./DashboardPage";
import {AlchemyContext} from "./AlchemyContext";

export const LandingPage = () => {
    const { signer, user} = useContext(AlchemyContext);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (signer != null && urlParams.has("bundle")) {
            let bundle = urlParams.get("bundle");
            console.log("BUNDLE", bundle)
            // this will complete email auth
            signer.authenticate({type: "email", bundle: bundle})
                // redirect the user or do w/e you want once the user is authenticated
                .then(() => (window.location.href = "/"));
        }
    }, [signer]);

    if (user == null) {
        return (<><AuthPage/></>)
    } else {
        return (<><DashboardPage/></>)
    }
};