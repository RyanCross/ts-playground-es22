// spread can be used in three places, 
// 1. mostly it is used to add existing objects or arrays to new objects and arrays
// can spread arrays into objects, as objects, as arrays indices are considered the "key", 
// but not vice versa unless that object is Iterable (like a Map)


// Rest (coalesce the "rest")
// 2. allow a function to accept any n number of arguments (technically this is called the "rest parameter")




function functionWithRest(arg1: any, arg2 : any, ...options : []) {
    // parameter 

    return 
}

let one = new Map([[1, "one"], [2, "two"]])
let two = { k : 2, z : 4}


let three = new Array(...one)

let four = { ...two, x : 5 }







