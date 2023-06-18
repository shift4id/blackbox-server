const { StatusCodes } = require("http-status-codes");

function restHelper(model) {
  return {
    get: async (req, res, next) => {
      try {
        const item = await model.findUnique({ where: req.query });

        if (!item) res.status(StatusCodes.NOT_FOUND);

        res.status(StatusCodes.ACCEPTED).json(item);
        next();
      } catch (e) {
        next(e);
      }
    },
    post: async (req, res, next) => {
      try {
        const item = await model.create({ data: req.body });
        res.status(StatusCodes.ACCEPTED).json(item);

        next();
      } catch (e) {
        next(e);
      }
    },
    patch: async (req, res, next) => {
      try {
        const item = await model.update({
          where: { id: req.params.id },
          data: req.body,
        });

        if (!item) res.status(StatusCodes.NOT_FOUND);

        res.status(StatusCodes.ACCEPTED).json(item);
        next();
      } catch (e) {
        next(e);
      }
    },
    delete: async (req, res, next) => {
      try {
        await model.delete({ where: { id: req.params.id } });

        res.status(StatusCodes.NO_CONTENT);
        next();
      } catch (e) {
        next(e);
      }
    },
  };
}

module.exports = restHelper;
