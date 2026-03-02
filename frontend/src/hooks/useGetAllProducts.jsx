import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllProducts } from '../redux/productSlice';
import { BACKEND_URL_ENDPOINT } from '../constants/constants';
import { toast } from 'sonner';

const useGetAllProducts = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL_ENDPOINT}/products`);
                if (res.data.success) {
                    dispatch(setAllProducts(res.data.data));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || 'Failed to fetch products');
            }
        }
        
        fetchProducts();
    }, [dispatch]);
}

export default useGetAllProducts
