import {useContext} from "react";
import {AlchemyContext} from "./AlchemyContext";

export const DashboardPage = () => {

    const { signer} = useContext(AlchemyContext);

    return (
        <>
            <div>
                <h1>Dashboard Page</h1>
            </div>
        </>
    );

}