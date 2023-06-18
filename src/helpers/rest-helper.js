const { StatusCodes } = require("http-status-codes");

function restHelper(model) {
  return {
    get: (req, res, next) => {
      try {
        const item = model.findUnique({ where: req.query });

        if (!item) {
          res.status(StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.ACCEPTED).json(item);
      } catch (e) {
        next(e);
      }
    },
    post: (req, res, next) => {
      try {
        const item = model.create({ data: req.body });

        res.status(StatusCodes.ACCEPTED).json(item);
      } catch (e) {
        next(e);
      }
    },
    patch: (req, res, next) => {
      try {
        const item = model.update({
          where: { id: req.params.id },
          data: req.body,
        });

        res.status(StatusCodes.ACCEPTED).json(item);
      } catch (e) {
        next(e);
      }
    },
    delete: (req, res, next) => {
      try {
        model.delete({ where: { id: req.params.id } });

        res.status(StatusCodes.NO_CONTENT);
      } catch (e) {
        next(e);
      }
    },
  };
}
