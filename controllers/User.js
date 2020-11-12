const { request } = require("express");
const { users } = require("../models");
const db = require("../models");
const { param } = require("../routes/users");
const usersObj = db.users;
const Op = db.Sequelize.Op;

// create and save new user

exports.create = (request, result) => {
    if (!request.body.username) {
        result.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = {
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        role: request.body.role
    };

    // save user to database
    usersObj.create(user).then(data => {
        result.status(200).send({
            status: true,
            message: "User Saved Successfully",
            response: data
        });
    }).catch(err => {
        result.status(500).send({
            message: "Some error occured while saving the user!!"
        });
    });
}

// fetch all users
exports.fetchAll = (request, result) => {
    usersObj.findAll().then(data => {
        result.status(200).send({
            status: true,
            message: "Fetched all Users Data",
            response: data
        });
    }).catch(err => {
        result.status(500).send({
            status: false,
            message: err.message || "Some error occured while fetching the data"
        });
    });
};

// fetch single user

exports.fetchSingle = (request, result) => {
    const paramID = request.params.id;
    usersObj.findAll({
        where: { id: paramID }
    }).then(data => {
        result.status(200).send({
            status: true,
            message: "Found User from given id",
            response: data
        });
    }).catch(err => {
        result.status(500).send({
            status: false,
            message: err.message || "Couldn't fint the user from given id"
        });
    });
};

// update single user
exports.updateCurrentUser = (request, result) => {
    const paramID = request.params.id;
    // console.log(paramID);
    // console.log(request.body);
    usersObj.update(request.body, {
        where: { id: paramID }
    }).then(num => {
        console.log(num);
        if (num[0] === 1) {
            result.status(200).send({
                status: true,
                message: `User updated with id : ${paramID}`
            });
        } else {
            result.status(400).send({
                message: `Can't Update the user with id: ${paramID}`
            });
        }
    }).catch(err => {
        result.status(500).send({
            message: err.message || `Error while updating the user with id: ${paramID}`
        });
    });
};


// Deleting User with its id

exports.deleteCurrentUser = (request, result) => {
    const paramID = request.params.id;
    usersObj.destroy({
        where: { id: paramID }
    }).then(num => {
        if (num === 1) {
            result.status(200).send({
                status: true,
                message: `User deleted with id: ${paramID}`
            });
        } else {
            result.status(400).send({
                status: false,
                message: `Failed to delete the user with id: ${paramID}`
            });
        }
    }).catch(err => {
        result.status(500).send({
            status: false,
            message: err.message || `Errror occured while deleting the user with id: ${paramID}`
        });
    });
};


// Delete all Users
exports.deleteAllUsers = (request, result) => {
    usersObj.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        console.log(nums);
        if (nums > 0) {
            result.status(200).send({
                status: true,
                message: `${nums} users were deleted successfully!`
            });
        } else {
            result.status(400).send({
                status: false,
                message: `No user data is present, so can't delete users!`
            });
        }
    }).catch(err => {
        result.status(500).send({
            message: err.message || `Error occured whiile deleting all users`
        });
    });
};
