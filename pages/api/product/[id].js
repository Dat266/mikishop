import Product from "../../../modules/Product";
import connect from "../../../config/db";

connect();

async function handlerProduct(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":

    default:
      throw new Error({
        message: "error fail!",
      });
  }
}

export default handlerProduct;
