import { AlchemySigner } from "@alchemy/aa-alchemy";

let signer = null;

export function getSigner() {
    if (!signer) {
        signer = new AlchemySigner({
            client: {
                connection: { apiKey: "3QnLowpma_WCRWqXjJOxfvrExbsU-5ET" },
                iframeConfig: {
                    iframeContainerId: "turnkey-iframe-container",
                },
            },
        });
    }

    return signer;
}