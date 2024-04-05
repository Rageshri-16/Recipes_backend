const users = require("../Models/UserRegister");

const bcrypt = require("bcrypt");

var adduser = async (req, res) => {
  req.query.Password = await bcrypt.hash(req.body.password, 10);
  console.log(req.body, "...........");

  let data = new users(req.query);

  users.create(data, function (error, result, field) {
    if (error) {
      res.send(error);
    }
    res.json(result);
  });
};

var login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = users.findByEmail(email, async function (error, result) {
    if (error) {
      return error;
    }

    if (result.length > 0) {
      let checkPassword = await bcrypt.compare(password, result[0].Password);
      console.log(checkPassword, password, "checkPassword");
      if (checkPassword) {
        res.send({ data: true });
      } else {
        res.send({ data: true });
      }
    } else {
      res.send({ data: false });
    }
  });
};

var userlist = (req, res) => {
  users.findall(function (error, result) {
    if (error) {
      res.send(error);
    }
    res.json(result);
  });
};

var userinfo = (req, res) => {
  users.findByID(req.params.id, function (error, result) {
    if (error) {
      res.send(error);
    }
    res.json(result);
  });
};

var userupdate = (req, res) => {
  let data = new users(req.query);
  console.log("data", data);
  users.update(data, req.params.id, function (error, result, field) {
    if (error) {
      res.send(error);
    }
    res.json(result);
  });
};

var userDelete = (req, res) => {
  users.delete(req.params.id, function (error, result) {
    if (error) {
      res.send(error);
    }
    res.json(result);
  });
};

module.exports = {
  adduser,
  login,
  userlist,
  userinfo,
  userupdate,
  userDelete,
};
