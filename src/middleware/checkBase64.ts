const checkBase64 = (req : any, res : any, next: any) => {
    const decode = req.headers['x-vamf-jwt'];
    req.token = decode;
    next();
}

export default checkBase64;