const cl = console.log;

const blogForm = document.getElementById("blogForm");

const blogTitlectrl = document.getElementById("blogTitle");
const blogContentctrl = document.getElementById("blogContent");

const blogContainer = document.getElementById("blogContainer");

const uuid = () => {
    return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
};

const snackbar = (icon, msg) => {
    Swal.fire({
        icon: icon,
        title: msg,
        timer: 1000
    });
};


let blogArr = [
    {
        title: "Javascript",
        content: "JavaScript is a programming language..."
    },
    {
        title: "HTML",
        content: "Hypertext Markup Language is the standard markup language..."
    }
];


const createBlogs = (data) => {
    let result = "";
    data.forEach(blog => {
        result += `
        <div class="row mt-2">
            <div class="col-md-3 col-sm-6 text-center">
                <div class="card">
                    <div class="card-header">
                        <h5>${blog.title}</h5>
                    </div>
                    <div class="card-body">
                        <p>${blog.content}</p>
                    </div>
                </div>
            </div>
        </div>`;
    });

    blogContainer.innerHTML = result;
};

createBlogs(blogArr);


async function onBlogSubmit(eve) {
    eve.preventDefault();

    let blogObj = {
        title: blogTitlectrl.value,
        content: blogContentctrl.value
    };

    eve.target.reset();

    try {
        let res = await postBlog(blogObj);
        snackbar('success', 'New blog created successfully!');

        let data = await featchBlog();
        createBlogs(data.blogs);

    } catch (err) {
        snackbar('error', 'Something went wrong while creating a blog!');
    }
}


async function postBlog(obj) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > .3 ? false : true;

            if (!err) {
                blogArr.push(obj);
                resolve({
                    msg: "New blog created successfully!",
                    blog: { ...obj, id: uuid() }
                });
            } else {
                reject({
                    msg: "Error creating blog!",
                    statusCode: 500
                });
            }
        }, 800);
    });
}


async function featchBlog() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > .3 ? false : true;

            if (!err) {
                resolve({
                    msg: "Blogs fetched successfully!",
                    blogs: blogArr
                });
            } else {
                reject({
                    msg: "Error fetching blogs!",
                    statusCode: 500
                });
            }
        }, 800);
    });
}

blogForm.addEventListener("submit", onBlogSubmit);
