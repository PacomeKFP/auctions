
// Il s'agit du middleware chargé de si chaque requette respecte le format qu'il faut

/**
 * Intercept and valdate request body
 * @param validationSchema validation schema object
 * @returns
 */
export default function (validationSchema) {
    return (request, response, next) => {
      const validation = validationSchema.validate(request.body);
      if (validation.error) {
        return response.status(400).json({
          status: "ERROR",
          errors: getValidationErrors(validation.error),
        });
      }
      request.body = validation.value;
      next();
    };
  }
  /**
   * This function will handle the Joi Validation error and will format it
   * @param validationError The error throwed by the previous function
   * @returns
   */
  const getValidationErrors = (validationError) => {
    let errors = [];
  
    for (const error of validationError.details) {
      if (!error.context) continue;
  
      const err = {
        code: "DATA_FORM_VALIDATION_ERROR",
        field: error.context.key,
        value: error.context.value,
        message: error.message,
      };
      errors.push(err);
    }
  
    return errors;
  };