const validate = (schema) => async (req, res, next) => {
    try {
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;
      next();
    } catch (err) {
      const error = {
        status: 422,
        message: "Fill the input properly",
        extraDetails: err.errors[0].message,
      };
  
      next(error);
    }
  };
  
  export default validate;  