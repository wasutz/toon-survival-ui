import getConfig from 'next/config'

export default async function handler(req, res) {
    const { token } = req.body;
    const {serverRuntimeConfig} = getConfig()
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            secret: serverRuntimeConfig?.turnstile?.secretKey,
            response: token
        })
    };

    const response = await fetch(serverRuntimeConfig?.turnstile?.verifyUrl, requestOptions);
    const data = await response.json();

    res.status(200).json(data);
}