const cl = console.log;
const blogForm = document.getElementById("blogForm")

const blogTitlectrl = document.getElementById("blogTitle")
const blogContentctrl = document.getElementById("blogContent")


const blogContainer = document.getElementById("blogContainer")



const uuid = () => {
    return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    })
};



const snackbar = (icon, msg) => {
    Swal.fire({
        icon: icon,
        title: msg,
        timer: 1000
    })
}


let blogArr = [{
    title: "Javascript",
    content: "JavaScript is a programming language and core technology of the Web, alongside HTML and CSS.It was created by Brendan Eich in 1995. Ninety - nine percent of websites use JavaScript on the client side for webpage behavior."
},
{
    title: "HTML",
    content: "Hypertext Markup Language is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of web content."
}];



const createBlogs = (data) => {
    let result = "";
    data.forEach(blog => {
        result += `
        <div class="row mt-2" id="blogContainer">
            <div class="col-md-3 col-sm-6 text-center">
                <div class="card">
                    <div class="card-header">
                        <h5>${blog.title}</h5>
                    </div>
                    <div class="card-body">
                        <p>${blog.content}</p>
                    </div>
                     <button class="btn btn-sm btn-outline-primary btn-block mt-5">Add Blog</button>
                            <button class="btn btn-sm btn-outline-primary btn-block mt-5 d-none">Update Blog</button>
                </div>
            </div>`
    })
    blogContainer.innerHTML = result;
}
createBlogs(blogArr);




async function onBlogSubmit(eve) {
    eve.preventDefault()

    let blogObj = {
        title: blogTitlectrl.value,
        content: blogContentctrl.value
    }
    cl(blogObj)
    eve.target.reset();

    try {
        let res = await postBlog(blogObj)
        cl(res)
        snackbar('success', 'New blog Created Successfully!!!!')
        let data = await featchBlog(blogObj)
        cl(data)
        createBlogs(data.blog);
        snackbar('success', 'New blog Created Successfully!!!!')

    } catch (err) {
        snackbar('error', 'something went wrong while creating a new blog!!!')
    }


}

async function postBlog(obj) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > .3 ? false : true;
            if (!err) {
                blogArr.push(obj)
                resolve({
                    msg: 'New blog created Successfully!!!!!',
                    blog: { ...obj, id: uuid() }
                })

            } else {
                reject({
                    msg: `Something went wrong while creating new blog!!!!`,
                    stetusCode: 500
                })
            }
        }, 800)
    })
}
async function featchBlog(obj) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > .3 ? false : true;
            if (!err) {
                blogArr.push(obj)
                resolve({
                    msg: 'New blog featched Successfully!!!!!',
                    blog: { ...obj, id: uuid() }
                })

            } else {
                reject({
                    msg: `Something went wrong while featching new blog!!!!`,
                    stetusCode: 500
                })
            }
        }, 800)
    })
}













blogForm.addEventListener("submit", onBlogSubmit)