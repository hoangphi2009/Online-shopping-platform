import Product from "../../models/product.model.js";

const getProductByIdService = async (productId) => {
    try {
        const existingProduct = await Product.findById(productId)
            .populate("category", "name")
            .populate("brandId", "brandName");
        if (!existingProduct) {
            return 'Sản phẩm không tồn tại';
        }
        return existingProduct;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default getProductByIdService;