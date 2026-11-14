//Calculator using separate functions: add, subtract, multiply and divide.
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}   
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}



//Function returning a Promise after a simulated delay.
function fetchProducts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true; // Change this to false to test rejection
            if (success) {
                resolve("Products fetched successfully.");
            } else {
                reject("Product fetching failed.");
            }
        }, 3000);
    });
}

//Use async/await to call the Promise-based function.
async function displayProducts() {
    try {
        const message = await fetchProducts();
        console.log(message);
    } catch (error) {
        console.error(error);
    }
}



//Simulate fetching users or products.
function fetchUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true; // Change this to false to test rejection
            if (success) {
                resolve("Users fetched successfully.");
            } else {
                reject("User fetching failed.");
            }
        }, 3000);
    });
}

async function displayUsers() {
    try {
        const message = await fetchUsers();
        console.log(message);
    } catch (error) {
        console.error(error);
    }   
}


//Handle a rejected Promise using try/catch and display a useful error.

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = false; // Change this to true to test resolution
            if (success) {
                resolve("Data fetched successfully.");
            } else {
                reject("Data fetching failed.");
            }
        }, 3000);
    });
}

async function displayData() {
    try {
        const message = await fetchData();
        console.log(message);
    } catch (error) {
        console.error(error);
    }
}

