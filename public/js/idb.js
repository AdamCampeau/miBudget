//Create a variable to hold db connection
var db;

//establish connection 
const request = indexedDB.open('budget', 1)
request.onupgradeneeded = function (event) {

    const db = event.target.result;
    db.createObjectStore('new_budget', { autoIncrement: true });

    request.onsuccess - function (event) {
        db = event.target.result;
    }

    if (navigator.online) {
        uploadBudget()
    }
};
request.onerror = function (event) {
    console.log(event.target.errorCode);
}

function record_save(record) {
    const transaction = db.transaction(['new_budget'], "readwrite")
    const budgetObjectStore = transaction.objectStore('new_budget')

    budgetObjectStore.add(record);
}

function record_upload() {
    const transaction = db.transaction(['new_budget'], 'readwrite')
    const budgetObjectStore = transaction.objectStore('new_budget')
    const getAll = budgetObjectStore.getAll()
    // upon a successful .getAll() execution
    getAll.onsuccess = function () {
        //send indexedD data store to api server
        if (getAll.result.length > 0) {
            fetch('/api/budget', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    // new transaction
                    const transaction = db.transaction(['new_budget'], 'readwrite');
                    // access budget store
                    const budgetStore = transaction.objectStore('new_budget');
                    // clear items in store
                    budgetStore.clear();

                    alert('Budget has been submitted');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
}

window.addEventListener('online', uploadBudget);