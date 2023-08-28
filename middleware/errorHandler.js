const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 504;
  switch (statusCode) {
    case constants.BadRequest:
      res.json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.Unauthorized:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.PaymentRequired:
      res.json({
        title: "Payment Required",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.Forbidden:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NotFound:
      res.json({
        title: "NotFound",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.InternalServerError:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.BadGateway:
      res.json({
        title: "Bad Gateway",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error, All Good!");
      break;
  }
};

module.exports = errorHandler;
