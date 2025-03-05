import { mockUser } from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/utils/constants.mjs';

export const findUserByID = (request, response, next) =>{
    //find user
    const{body, params:{id}} = request;
    const parseId = parseInt(id);
    if(isNaN(parseId))
        return response.sendStatus(400);
    const findUserId = mockUser.findIndex((user) => user.id === parseId);
    if(findUserId === -1)
        return response.sendStatus(404);
    request.findUserId = findUserId;
    next();
}