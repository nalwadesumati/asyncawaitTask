const cl = console.log;

const snackbar = (icon, msg) => {
    Swal.fire({
        icon: icon,
        title: msg,
        timer: 1000
    })
}


async function hrCall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > 0.2 ? false : true;
            if (!err) {
                let Data = `Candiate Shortlisted for 1st interview round!!!!`
                resolve(Data)
            } else {
                let err = `Looking for another Candidate!!!`
                reject(err)
            }


        }, 800)
    })
}

async function firstRound() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > 0.2 ? false : true;
            if (!err) {
                let Data = `Candiate Shortlisted for 2nd interview round!!!!`
                resolve(Data)
            } else {
                let err = `Looking for another Candidate!!!`
                reject(err)
            }


        }, 800)
    })
}

async function secondRound() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > 0.2 ? false : true;
            if (!err) {
                let Data = `Candiate Shortlisted for 3rd interview round!!!!`
                resolve(Data)
            } else {
                let err = `Looking for another Candidate!!!`
                reject(err)
            }


        }, 800)
    })
}

async function mlRound() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > 0.2 ? false : true;
            if (!err) {
                let Data = `Candidate for shortlisted for given profile!!!!`
                resolve(Data)
            } else {
                let err = `Looking for another Candidate!!!`
                reject(err)
            }


        }, 800)
    })
}


const onit = async () => {
    try {
        let res1 = await hrCall()
        let res2 = await firstRound()
        let res3 = await secondRound()
        let res = await mlRound()

        snackbar("success", 'Selected')
    } catch (err) {
        snackbar("error", 'rejected')
    }
}
onit()