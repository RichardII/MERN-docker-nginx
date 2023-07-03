
module.exports = mongoose => {

  var schema = mongoose.Schema(
  {
    name: String
  });

const Role = mongoose.model("Role", schema);

return Role;

};
