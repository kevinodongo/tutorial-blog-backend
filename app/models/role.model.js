module.exports = mongoose => {
    const Role = mongoose.model(
      "Role",
      mongoose.Schema(
        {
          name: String,
        },
        { timestamps: true }
      ) 
    );
    return Role;
  };