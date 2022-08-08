const authAdmin = (handler) => {
  return (req, res) => {
    if (req.user.admin == false) {
      return res
        .status(403)
        .json("Bạn không có quyền thực hiện hành động này!");
    }
    return handler(req, res);
  };
};

export default authAdmin;
