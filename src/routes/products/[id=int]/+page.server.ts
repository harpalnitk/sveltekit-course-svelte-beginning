import { error,redirect } from '@sveltejs/kit';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async ({params})=>{

	const products = await (await import('$lib/data/dummy-products.json')).default;
    const product = products.products.find(p => p.id === +params.id)

    // console.log(product);
    if(!product){
        throw error(404,'Product not found');

        //throw redirect(301,'/products');
    }

    return {
        product,
        title: product.title, // used in root layout for displaying title
        desc: product.description
    }
}