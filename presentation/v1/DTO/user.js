function userToDto(user) {
    return {
        username: user.username,
        phone: user.phoneNumber,
        email: user.email,
        //profile: user.profilePhoto,
    }
}

function usersToDto(users) {
    const usersDto = [];
    for (const user in users) {
        usersDto.push(usersToDto(user));
    }
    return usersDto;
}


module.exports = {userToDto, usersToDto};