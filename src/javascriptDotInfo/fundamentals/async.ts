export function validatePromiseExecutorImmediatelyInvoked() {
    /** The promise executor is invoked when constructed */

    // when we
    let newPromise = new Promise((resolve, reject) => {
        console.log("im immediately invoked!")

        setTimeout(resolve, 1000)
    })
}

export function inspectPromiseStruct() {

    //when we define a new promise we define an executor thats run immediately. Presumably, returned promises from other funcs have there own executors.
    let newPromise = new Promise((resolve, reject) => {
        console.log("invoking pokemon promise executor")
        // executor is invoked immediately
        fetch("https://pokeapi.co/api/v2/pokemon/charmander1")
        .finally(() => console.log("done executing fetch"))
        .then((result) => resolve(result))
        .catch((err) => reject(err)) 


    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }).finally(() => {
        console.log("Done with pokemon promise")
    })
}

export function testResult() {
    let promise = new Promise(function(resolve, reject) {
        resolve(1);
      
        setTimeout(() => resolve(2), 1000);
      });
      
      promise.then(console.log);
      
}

/**
 * Delay with a promise
The built-in function setTimeout uses callbacks. Create a promise-based alternative.

The function delay(ms) should return a promise. That promise should resolve after ms milliseconds, so that we can add .then to it, like this:
 * @param ms 
 */
export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function testDelay(ms: number) {
    delay(3000).then(() => console.log("ran after 3 seconds"))
}

export async function microVsMacrotask() {
    console.log("I will happen 1st")
    setTimeout(() => console.log("I will happen last, i'm a macrotask"), 1)
    let logMicro = async () => {
        console.log("I will happen second as im a microtask")
    }
    await logMicro()
}
  
