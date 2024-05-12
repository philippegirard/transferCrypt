import {useContext, useEffect, useState} from "react";
import {useAlchemy} from "./useAlchemy";
import {AlchemyContext} from "./AlchemyContext";

export const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { signer} = useContext(AlchemyContext);


    function authenticate() {
        try {
            setLoading(true);
            signer.authenticate({type: "email", email})
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (<>Loading LoginPage...</>)
    }

    return (
        <>
            <h1>Login Page</h1>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={() => authenticate(email)}>Submit</button>
            </div>
        </>
    );
}