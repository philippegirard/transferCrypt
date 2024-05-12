import { AlchemySigner } from "@alchemy/aa-alchemy";
import {API_KEY} from "./constants";

let signer = null;

export function getSigner() {
    if (!signer) {
        signer = new AlchemySigner({
            client: {
                connection: { apiKey: API_KEY },
                iframeConfig: {
                    iframeContainerId: "turnkey-iframe-container",
                },
            },
        });
    }

    return signer;
}