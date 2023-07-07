import type { ParamMatcher } from '@sveltejs/kit';


//this matcher ensures that rest params in URL have more than one segments

//e.g.   /file/a   will not work while

// /file/a/b    will work

// where folder structure is
//  file -> [...path] 
export const match: ParamMatcher = (param) => {
    return param.split('/').length > 1;
};