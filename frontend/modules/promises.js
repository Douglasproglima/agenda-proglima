function promiseExemples() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //console.log('Hello World');
            resolve();
        });
    }, 2000);
}

export default async function() {
    await promiseExemples();
    //console.log('Finish');
}