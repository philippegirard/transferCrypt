import {useContext} from "react";
import {AlchemyContext} from "./AlchemyContext";
import {encodeFunctionData} from "viem";



export const DashboardPage = () => {

    const {signer, user, account} = useContext(AlchemyContext);

    console.log("signer", signer)
    console.log("user", user)
    console.log("account", account)

    async function logout() {
        await signer.disconnect()
        window.location.href = "/"
    }

    async function sendMoney() {
        const AlchemyTokenAbi = [
            {
                inputs: [{internalType: "address", name: "recipient", type: "address"}],
                name: "mint",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
        ];

        const uoCallData = encodeFunctionData({
            abi: AlchemyTokenAbi,
            functionName: "mint",
            args: [account.getAddress()],
        });


        const uo = await account.sendUserOperation({
            uo: {
                target: "0xcCba31057D456e37cae60f4B7DFBfDb8e49e562d",
                data: uoCallData,
            },
        });

        /*
        const uo = await account.sendUserOperation({
            uo: {
                target: "0xcCba31057D456e37cae60f4B7DFBfDb8e49e562d",
                value: 0,
                data:""
            },
        });

         */

        const txHash = await account.waitForUserOperationTransaction(uo);

        console.log(txHash);

    }

    return (
        <>
            <div>
                <h1>Dashboard Page</h1>
                <ul>
                    <li>Email: {user?.email}</li>
                    <li>Address: {user?.address}</li>
                </ul>
                <ul>
                    <li>Account.Address: {account?.account.address}</li>
                </ul>
                <button onClick={() => {
                    logout()
                }}>Logout
                </button>
                <button onClick={() => {
                    sendMoney()
                }}>Send Money
                </button>
            </div>
        </>
    );

}