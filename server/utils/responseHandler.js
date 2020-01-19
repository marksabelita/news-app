class ResponseHandler {
  sendResponse(response, data) {
    response.send({
      'success': true,
      data
    });
  }
    
  catchErrors(response, validationError) {
    response.status(422).send({
      success: false,
      errors: validationError.message,
    });
  }
}

module.exports = new ResponseHandler();