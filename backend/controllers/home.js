const homeController = (request, response) => {
  response.redirect(303, "/tasks");
};

module.exports = {
  homeController,
};
