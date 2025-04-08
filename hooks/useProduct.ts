import { useEffect, useState } from 'react';
import { Category, findCategoryByKey, findCategoryBySubcategoryKey } from '@/constants/Categories';
import { agregarProductoCarro, obtenerContentCarro, obtenerDatosProducto, obtenerDocuProductos } from '@/firebase-js/api';
import { TiendasProducto } from '@/types';
import useShop from './useShop';
import useUser from './useUser';

export default function useProduct() {
    const [products, setProducts] = useState<Array<TiendasProducto> | []>([]);
    const [allProducts, setAllProducts] = useState<Array<TiendasProducto> | []>([]);
    const [category, setCategory] = useState<Category>({} as Category);
    const [categoryKey, setCategoryKey] = useState("");
    const [subCategory, setSubCategory] = useState("");

    const { shop } = useShop();
    const user = useUser();

    const getProductsCart = async (userId: string) => {
        if (userId)
            return await obtenerContentCarro(userId);
    }

    /**
     * Actualiza la cantidad de unidades de los productos en la pantalla
     * con la cantidad de unidades que hay en el carro
     * @method updateProductQuantity
     * @param {string} userId - Id del usuario
     * @memberof useProduct 
     */
    const updateProductQuantity = async (userId: string, _products: TiendasProducto[]): Promise<TiendasProducto[]> => {
        const productsCart = await getProductsCart(userId);
        if (productsCart) {
            return _products.map((product) => {
                const product_cuant = productsCart.find((productCart) => productCart.product_id === product.product_id)?.product_cuant || 0;
                if (product_cuant > 0) product.product_cuant = product_cuant;
                return product;
            });
        }
        return _products;
    };

    /**
     * Actualiza la cantidad de unidades de un producto en la pantalla
     * con la cantidad de unidades que hay en el carro
     * @method updateProductQuantityById
     * @param {string} id - Id del producto
     * @param {number} quantity - Cantidad de unidades
     * @memberof useProduct
     * @returns {void}
     * */
    const updateProductQuantityById = async (id: string, quantity: number) => {
        const _products = [...products];
        const index = _products.findIndex((product) => product.product_id === id);
        if (index >= 0) {
            _products[index].product_cuant = quantity;
            setProducts(_products);
        }
    }

    const filterProducts = (text: string) => {
        const pattern = new RegExp(text, "i");
        setProducts(allProducts.filter(
            (product: TiendasProducto) =>
            (
                pattern.test(product.product_name)
                ||
                pattern.test(product.product_details)
            )
        ));
    }

    // Filtrar productos por category usando subcategory
    const filterProductsBySubcategoryKey = (_products: TiendasProducto[], subcategoryKey: string) =>
        _products.filter((product) =>
            findCategoryBySubcategoryKey(product.product_category || "varios").key === subcategoryKey
        );

    // Filtrar productos por category usando key
    const filterProductsByCategoryKey = (_products: TiendasProducto[], key: string) =>
        _products.filter((product) =>
            product.product_category === key
        );

    const getProducts = async (shopId: string, userId: string) => {
        if (shopId) {
            const _products = await updateProductQuantity(userId, await obtenerDocuProductos(shopId));
            setProducts(_products);
            setAllProducts(_products);
        }
    }

    // Actualizar la clave de categoria
    const updateCategoryKey = (key: string) => {
        setCategoryKey(key);
    }

    const udpateCategory = async (name: string) => {
        // Encontrar categoria
        const _category = findCategoryByKey(name);
        if (_category) {
            setCategory(_category);
            // Filtrar productos por categoria usando subcategoria como clave
            const key = _category.key
            if (key) {
                if (allProducts) {
                    const _products = filterProductsByCategoryKey(allProducts, key);
                    if (_products) setProducts(_products);
                }
                
            }
        }
    }

    const updateSubCategory = (name: string) => {
        setSubCategory(name);
        setProducts(filterProductsByCategoryKey(allProducts, name));
    }

    const addToCart = (productId: string, quantity: number) => {
        obtenerDatosProducto(
            shop.id,
            productId,
            (doc) => {
                if (!doc)
                    return "error al obtener datos del producto';
                else {
                    agregarProductoCarro(
                        user.id,
                        shop.id,
                        doc.product_id,
                        doc.product_sku,
                        doc.product_name,
                        doc.product_details,
                        doc.product_unit,
                        doc.product_unit_value,
                        doc.product_price,
                        quantity,
                        () => updateProductQuantityById(productId, quantity),//doc,
                        () => "error al agregar el producto al carro",
                    );
                }
            });
    };

    useEffect(() => {
        (async () => {
            if (shop.id && user.id) await getProducts(shop.id, user.id);
        })();
    }, [shop.id, user.id]);

    useEffect(() => {
        (async () => {
            if (categoryKey) await udpateCategory(categoryKey);
        })();
    }, [categoryKey]);

    return {
        products,
        allProducts,
        category,
        subCategory,
        updateCategoryKey,
        getProducts,
        getProductsCart,
        filterProducts,
        filterProductsBySubcategoryKey,
        filterProductsByCategoryKey,
        udpateCategory,
        updateSubCategory,
        addToCart
    }
}
