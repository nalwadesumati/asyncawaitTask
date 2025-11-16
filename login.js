const cl = console.log;


const snackbar = (icon, msg) => {
    Swal.fire({
        icon: icon,
        title: msg,
        timer: 1000
    })
}


async function loginToApp() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > .5 ? false : true;
            if (!err) {
                resolve("login Successfully!!!")
            } else {
                reject("Invalied details")
            }
        }, 500)
    })
}


function redirectToDashboard() {
    cl(`Redirect To Dashboard!!!!`)
}

const onit = async () => {
    try {
        let res = await loginToApp()
        snackbar("success", 'login Successfully!!!!')
        redirectToDashboard()

    } catch (err) {
        snackbar("error", 'invalied details')
    }
}
cl(onit())