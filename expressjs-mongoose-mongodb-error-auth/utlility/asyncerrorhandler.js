module.exports= (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => {
      console.log(error);
      // const error = new customeError(`${err}`,404);
      next(error);
    });
  };
};
