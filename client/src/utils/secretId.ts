export const getSecretId = (str: string) => {
    return str
        .replace(/\.[^/.]+$/, "")                  
        .split("/")                                
        .pop();                                    
}