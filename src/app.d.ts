// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}

		//used for hook.server.ts for cookie based authentication
		//it is basically a server side state
		//which we can aceess on any of our server side endpoints
		// interface Locals {
		// 	userID: string | null;
		// }
		//  interface PageData {
        //     products?: {id:number}[];
        //  }
		// interface Platform {}
	}
}

export {};