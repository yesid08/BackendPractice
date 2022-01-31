const fs = require('fs');
const db = require('mongoose');
const Model = require('./model')
const configFile = fs.readFileSync('./config.json');
const config = JSON.parse(configFile);
db.Promise = global.Promise;
db.connect(
    `mongodb://${config.user}:${config.password}@${config.clusterName}-shard-00-00.sqdth.mongodb.net:27017,`+
    `${config.clusterName}-shard-00-01.sqdth.mongodb.net:27017,`+
    `${config.clusterName}-shard-00-02.sqdth.mongodb.net:27017/`+
    `${config.databaseName}?ssl=true&replicaSet=atlas-ah0tbj-shard-0&authSource=admin&retryWrites=true&w=majority`,{
        useNewUrlParser: true
    }
)
console.log('[db] : Connection was made successfully');



const getAllMessages = async (userFilter) => {
    if (userFilter !== null){
        let filter = {
            user: userFilter
        }
        return await Model.find(filter);
    } else{
        return await Model.find();
    }
    
}

const addMessage =  async (message) => {
    const aMessage = new Model(message);
    aMessage.save()
}
const updateText =  async (id, message) => {
    const foundMessage = await Model.findOne({
        _id: id
    })
    foundMessage.message = message;

    const newMessage = await foundMessage.save();
    return newMessage;
}

module.exports = {
    add: addMessage,
    list: getAllMessages,
    updateText
};

