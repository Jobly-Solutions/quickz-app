import { STORE_COLLECTION } from '@/constants/Api';
import { findCategoryByKey, findCategoryBySubcategoryKey } from '@/constants/Categories';
import { agregarProductoCarro, obtenerContentCarro } from '@/firebase-js/api';
import { useAppDispatch } from '@/hooks/redux';
import { setCategory, setCategorySelected } from '@/redux/slices/category-slice';
import { setProductList, setProductListSelected } from '@/redux/slices/product-slice';
import { setSubCategory } from '@/redux/slices/sub-category-slice';
import { useLazyListMyProductsQuery } from '@/services/product-api';
import { TiendasProducto } from '@/types';

export default function productUtils() {
    // const PRODUCT_LIST = useAppSelector((state) => state.product.myProductList);
    // const productList = useMemo(() => PRODUCT_LIST, [PRODUCT_LIST]);

    // const CATEGORY = useAppSelector((state) => state.category.category);
    // const category = useMemo(() => CATEGORY, [CATEGORY]);

    // const SUB_CATEGORY = useAppSelector((state) => state.subCategory.subCategory);
    // const subCategory = useMemo(() => SUB_CATEGORY, [SUB_CATEGORY]);


    const dispatch = useAppDispatch();
    const [listMyProducts] = useLazyListMyProductsQuery();

    // const {getMyProductList, isLoading} = useGetProduct();

    const setProducts = (products: TiendasProducto[]) => {
        dispatch(setProductListSelected(products));
    }
    const setAllProducts = (allProducts: TiendasProducto[]) => {
        dispatch(setProductList(allProducts));
    }
    const setSubCategoryName = (subCategory: string) => {
        dispatch(setSubCategory(subCategory));
    }
    const setCategoryKey = (categoryKey: string) => {
        dispatch(setCategorySelected(categoryKey));
    }
    const selectCategory = (category: {}) => {
        dispatch(setCategory(category));
    }

    const getProductsCart = async (userId: string) => await obtenerContentCarro(userId);

    /**
     * Actualiza la cantidad de unidades de los productos en la pantalla
     * con la cantidad de unidades que hay en el carro
     * @method updateProductQuantity
     * @param {string} userId - Id del usuario
     * @memberof useProduct 
     */
    // const updateProductQuantity = async (userId: string, _products: TiendasProducto[]): Promise<TiendasProducto[]> => {
    //     const productsCart = await getProductsCart(userId);
    //     if (productsCart) {
    //         return _products.map((product) => {
    //             const product_cuant = productsCart.find((productCart) => productCart.product_id === product.product_id)?.product_cuant || 0;
    //             if (product_cuant > 0) product.product_cuant = product_cuant;
    //             return product;
    //         });
    //     }
    //     return _products;
    // };

    const updateProductList = async (userId: string, _products: TiendasProducto[]): Promise<TiendasProducto[]> => {
        const productsCart = await getProductsCart(userId);
        let products = [];
        if (productsCart) {
            products = _products.map((p) => {
                const product_cuant = productsCart.find((productCart) => productCart.product_id === p.product_id)?.product_cuant || 0;
                const product_category_top = findCategoryBySubcategoryKey(p.product_category).key;
                return {
                    ...p,
                    product_cuant: product_cuant,
                    product_category_top: product_category_top
                };
            });
        }
        return products;
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
    const updateProductQuantityById = (products, id: string, quantity: number) => {        
        const updatedProducts = products.map((product) => {
            if (product.product_id === id) {
                return {
                    ...product,
                    product_cuant: quantity
                };
            }
            return product;
        });
        setProducts(updatedProducts);
        return updatedProducts;
    }

    const filterProducts = (allProducts, text: string) => {
        const pattern = new RegExp(text, "i");
        return (allProducts.filter(
            (product: TiendasProducto) =>
            (
                pattern.test(product.product_name)
                ||
                pattern.test(product.product_details)
            )
        ));
    }

    // Filtrar productos por category usando subcategory
    const filterProductsBySubcategoryKey = (_products: TiendasProducto[], subcategoryKey: string) => {
        const p = _products.filter((product) => product.product_category === subcategoryKey || product.product_category_top === subcategoryKey);
        return p;
    }
    // Filtrar productos por category usando key
    const filterProductsByCategoryKey = (_products: TiendasProducto[], key: string) => {
        const filteredProducts = _products.filter((product) =>
            product.product_category_top === key
        );
        return filteredProducts;
    }

    const getProducts = async (shopId: string, userId: string) => {
        if (shopId) {
            const collection = STORE_COLLECTION;
            const idCollection = shopId;
            const params = { collection, idCollection }
            await listMyProducts(params)
                .unwrap()
                .then((res) => {
                    const { data } = res;
                    updateProductList(userId, data)
                        .then((res) => {
                            setProducts(res);
                            setAllProducts(res);
                        }
                        )
                })
        }
    }

    // Actualizar la clave de categoria
    const updateCategoryKey = (allProducts, key: string) => {
        setCategoryKey(key);
        updateCategory(allProducts, key);
    }

    const updateCategory = (allProducts, categoryKey: string) => {
        // Encontrar categoria
        const _category = findCategoryByKey(categoryKey);
        if (_category) {
            selectCategory(_category);
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

    const updateSubCategory = (allProducts, name: string) => {
        setSubCategoryName(name);
        const productFiltered = filterProductsBySubcategoryKey(allProducts, name);
        setProducts(productFiltered);
    }

    const addToCart = async (products, shopId: string, userId: string, product: TiendasProducto, quantity: number) => {        
        return await agregarProductoCarro(
            userId,
            shopId,
            product.product_id,
            product.product_sku,
            product.product_name,
            product.product_details,
            product.product_unit,
            product.product_unit_value,
            product.product_price,
            quantity,
            () => updateProductQuantityById(products, product.product_id, quantity),//doc,
            () => "error al agregar el producto al carro",
        );
    };

    return {
        getProducts,
        getProductsCart,
        filterProducts,
        filterProductsBySubcategoryKey,
        filterProductsByCategoryKey,
        updateCategoryKey,
        updateCategory,
        updateSubCategory,
        updateProductList,
        addToCart
    }
}
