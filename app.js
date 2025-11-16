let blogsArr = [
    {
        blogTitle: 'Async-await',
        blogContent: `async and await are modern JavaScript keywords that make working with promises easier and cleaner.
Instead of writing messy .then() chains, you can write asynchronous code that looks synchronous.`
    },
    {
        blogTitle: 'Angular',
        blogContent: `Angular is a TypeScript-based front-end framework by Google for building fast, scalable single-page web applications.`
    }
];


const blogForm = document.getElementById("blogForm");
const blogTitlectrl = document.getElementById("blogTitle");
const blogContentctrl = document.getElementById("blogContent");
const blogContainer = document.getElementById("blogContainer");

const snackBar = (title, icon = "success") => {
    Swal.fire({
        title,
        icon,
        timer: 1500
    });
};

function onBlogSubmit(e) {
    e.preventDefault();

    let blogObj = {
        blogTitle: blogTitlectrl.value,
        blogContent: blogContentctrl.value
    };

    postBlog(blogObj)
        .then(res => {
            snackBar(res.msg);
            return fetchBlog();
        })
        .then(res => {
            createBlogs(res.blog);
        })
        .catch(err => {
            snackBar(err.msg, "error");
        });

    blogForm.reset();
}

function postBlog(blog) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > .1 ? false : true;

            if (!err) {
                blogsArr.unshift(blog);
                resolve({
                    msg: `New blog added successfully!`,
                    blogObj: { ...blog, id: "fromBE" }
                });
            } else {
                reject({
                    msg: `Something went wrong while creating a new blog`,
                    statusCode: 400
                });
            }
        }, 1000);
    });
}


function fetchBlog() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let err = Math.random() > .1 ? false : true;

            if (!err) {
                resolve({
                    msg: `All blogs fetched successfully`,
                    blog: blogsArr
                });
            } else {
                reject({
                    msg: `Something went wrong while fetching blogs`,
                    statusCode: 400
                });
            }
        }, 500);
    });
}


function createBlogs(data) {
    let result = "";

    data.forEach(blog => {
        result += `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h5>${blog.blogTitle}</h5>
                    </div>
                    <div class="card-body">
                        <p>${blog.blogContent}</p>
                    </div>

                    <button class="btn btn-outline-primary btn-sm btn-block mt-3">Edit</button>
                    <button class="btn btn-outline-danger btn-sm btn-block mt-2">Remove</button>
                </div>
            </div>
        `;
    });

    blogContainer.innerHTML = result;
}


createBlogs(blogsArr);

blogForm.addEventListener("submit", onBlogSubmit);
