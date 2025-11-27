const UserAccountDetailsRepository = require('../repositories/userAccountDetailsRepository');
const logger = require('../logger/logger');

const getAccountDetails = async (request, response) => {
    const { userID } = request.query;
    const userAccountDetailsRepository = new UserAccountDetailsRepository();
    const existingUserAccountDetails = await userAccountDetailsRepository.select(userID);

    if (existingUserAccountDetails) {
        logger.info(`existingUserAccountDetails ${existingUserAccountDetails.first_name}`);
        return response.status(200).json({
            id: existingUserAccountDetails.id,
            userID: existingUserAccountDetails.user_id,
            firstName:existingUserAccountDetails.first_name,
            lastName: existingUserAccountDetails.last_name,
            addressLine1: existingUserAccountDetails.address_1,
            addressLine2:existingUserAccountDetails.address_2,
            city: existingUserAccountDetails.city,
            state: existingUserAccountDetails.state,
            zipCode: existingUserAccountDetails.zip_code,
            phoneNumber: existingUserAccountDetails.phone_number,
            email: existingUserAccountDetails.email
        });
    } else {
        logger.info('No data for that account.');
        return response.status(204).json({});
    }
};

const upsertAccountDetails = async (request, response) => {
    const {
        userID, firstName, lastName, addressLine1, addressLine2,
        city, state, zipCode, phoneNumber, email
    } = request.body;
    const userAccountDetailsRepository = new UserAccountDetailsRepository();

    const existingUserAccountDetails = await userAccountDetailsRepository.select(userID);

    if (existingUserAccountDetails) {
        const userAccountDetails = await userAccountDetailsRepository.update(
            userID, firstName, lastName, addressLine1, addressLine2,
            city, state, zipCode, phoneNumber, email
        );

        return response.status(200).json({
            id: userAccountDetails.id,
            details: request.body
        });
    }
    else {
        const userAccountDetails = await userAccountDetailsRepository.insert(
            userID, firstName, lastName, addressLine1, addressLine2,
            city, state, zipCode, phoneNumber, email
        );

        return response.status(201).json({
            id: userAccountDetails.id,
            details: request.body
        });
    }
};

module.exports = { upsertAccountDetails, getAccountDetails }