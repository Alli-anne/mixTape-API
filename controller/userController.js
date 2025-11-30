import db from '../models/index.js';
const User = db.user;

const createUser = async (req, res) => {
  try {
    console.log(req.body)
    const {username, password} = req.body;

    const user = new User({
      username: username,
      password: password
    });

    user.save()
    .then((data) => {
      console.log(data)
      res.status(201).send(data)
    })
    .catch((err) => {
            res.status(500).send({
                message: err.message
            })
        })
  } catch (err) {
    res.status(500).send({
            message: err.message
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    User.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
        res.status(500).send({
          message: err.message
        })
    })
  }
  catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

export {createUser, getAllUsers}