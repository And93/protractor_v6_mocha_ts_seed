export async function downloadSessionVideo(src: string): Promise<Buffer> {
    await Wait.hard(10000);
    return (await httpRequest('GET', src)).body;
}

export async function deleteSessionVideo(src: string) {
    await httpRequest('DELETE', src);
}

export async function httpRequest(method: string, src: string): Promise<{ headers: any, options: any, body: Buffer }> {
    // "http://ggrname:ggrpassword@localhost:4444/video/selenoid1d1d3f07d6dbc71f2f32dd76de01f362.mp4".match(/(^\w+:)\/\/([\w\.]+)[\/:](\d+)(\/.+)/)
    // => [fullMatch, 'http:', 'localhost', '4444', '/video/selenoid1d1d3f07d6dbc71f2f32dd76de01f362.mp4']
    //const urlParts = src.match(/(^\w+:)\/\/(\w+:\w+@)([\w\.]+)[\/:](\d+)(\/.+)/);
    const urlParts = src.match(/(^\w+:)\/\/([\w\.]+)[\/:](\d+)(\/.+)/); //without autorisation, it is passed by authStr
    const protocol = urlParts[1];
    const hostname = urlParts[2];
    const port = parseInt(urlParts[3]);
    const path = urlParts[4];
    //const authStr = auth ? `${auth.username}:${auth.password}` : '';
    const options = {
        protocol: protocol,
        hostname: hostname,
        port: port,
        path: path,
        method: method,
        auth: 'ggrname:ggrpassword'
    };

    return await new Promise<{ headers: any, options: any, body: Buffer }>((resolve, reject) => {
        (src.startsWith('https') ? https.request : http.request)(options, (response) => {
            const rawData = [];
            const headers = response.headers;
            response.on('data', chunk => rawData.push(chunk));
            response.on('error', err => reject(err));
            response.on('end', () => resolve(
                {
                    headers: headers,
                    options: options,
                    body: Buffer.concat(rawData)
                }
            ));
        }).end();
    });
}

export async function deleteAllVideos() {
    const allVideoNames = (await httpRequest('GET', `http://${host}:4445/video/`))
        .body.toString()
        .split('\n')
        .filter(part => part.includes(`.mp4`))
        .map(rawPart => rawPart.match(/\w+\.mp4/g)[0]);
    await Promise.all(allVideoNames.map(videoName => deleteSessionVideo(`http://${host}:4445/video/${videoName}`)));
