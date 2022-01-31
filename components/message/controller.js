const storage = require('./store');

const addMessage = (user, message) =>{
    return new Promise((resolve, reject) => {
        if (!user || !message){
            console.error('[messageController] : No hay usuario o mensaje')
            status = 400;
            const error = {
                status: status,
                description: 'Los datos son incorrectos'
            }
            reject(error);
        } else{
            const fullMessage = {
                user: user,
                message: message,
                date: new Date()
            };
            storage.add(fullMessage);
            resolve(fullMessage);
        }
        
    });
    
}

const updateMessage = (id, message) =>{
    return new Promise(async (resolve, reject) => {
        if (!id || !message){
            console.error('[messageController - update] : No hay id o mensaje')
            status = 400;
            const error = {
                status: status,
                description: 'Los datos son incorrectos'
            }
            reject(error);
        } else{
            const result = await storage.updateText(id, message);
            resolve(result);
        }
        
    });
    
}


const getAllMessages = (userFilter) => {
    return new Promise((resolve, reject) => {
        if (!storage.list(userFilter)){
            reject({
                status: 500,
                description: 'Internal error on messages'
            });
        }
        resolve(storage.list(userFilter));
    })
}

module.exports = {
    addMessage,
    getAllMessages,
    updateMessage
}