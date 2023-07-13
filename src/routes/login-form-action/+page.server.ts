import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions:Actions = {


	//if there is single action name it default; if there are two actions
	//default action also need to be changed to some other name
    login: async ({request,cookies,url})=>{

        const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password')

        // console.log(`username ${form.get('username')}`)
        // console.log(`password ${form.get('password')}`)

		if(!username){
			return fail(400,{usernameMissing: true})
		}
		if(!password){
			return fail(400,{passwordMissing: true})
		}

		cookies.set('token','token_value',{
			path: '/'
		});

		//return {success:true,name: username, id:1}

		//redirect to some page

		throw redirect(303,url.searchParams.get('redirectTo') || '/')

    },

	logout: ({cookies,url})=>{

		cookies.delete('token',{
			path:'/'
		});
		throw redirect(303,url.searchParams.get('redirectTo') || '/')

	}
}