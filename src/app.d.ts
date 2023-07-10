// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: string;
		}

		//used for hook.server.ts for cookie based authentication
		//it is basically a server side state
		//which we can aceess on any of our server side endpoints
		interface Locals {
			user?: {id:number, name:string} | undefined;
		}
		//  interface PageData {
        //     products?: {id:number}[];
        //  }
		// interface Platform {}
	}
}

export {};