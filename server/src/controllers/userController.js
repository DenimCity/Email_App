import logger from '../lib'
import request from 'request';

const getUsers = (req, res) => {
    try {
        logger.debug(`Invoked ${getUsers.name.toUpperCase()}().`);
        request({
            uri: 'https://api.spacexdata.com/v3/launches',
            json: true
        }, (error, response, body) => {
            if (!error) {
                logger.debug('Data return from End Point')
                return res.send(body);
            }
            throw new Error(error)
        })
    } catch (err) {
        return res.send({ error: err.message });
    }
}

export default getUsers;