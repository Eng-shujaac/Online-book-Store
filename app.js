// selectors 
let isbn = document.querySelector('#isbn'),
    title = document.querySelector('#title'),
    author = document.querySelector('#author'),
    category =  document.querySelector('#category'),
    date = document.querySelector('#publishedDate'),
    form = document.querySelector('#book-form'),
    btn = document.querySelector('.btn'),
    BookList = document.querySelector('.book-list'),
    UpdatedID ;


// get data from localstorage or get empty array 
let StoreBook = JSON.parse(localStorage.getItem('books') || '[]');
displayBook(StoreBook)

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(isbn.value != '' && title.value != '' && author.value != '' && category.value != '' && date.value != ''){
        if(btn.value == 'Save'){
            AddBookStore({
                isbn : isbn.value,
                title : title.value,
                author : author.value,
                category : category.value,
                date : date.value
            })
        }else{
            Update({
                isbn : isbn.value,
                title : title.value,
                author : author.value,
                category : category.value,
                date : date.value
            })
        }
    }else{
        alert('please fill all inputs ')
    }
})

// Add data localstrage \
function AddBookStore(obj){
    StoreBook.push(obj);
    localStorage.setItem('books',JSON.stringify(StoreBook));
    location.reload();
}
// display data from local storage\

function displayBook(books){
    let output = `
    <table>
            <tr>
                <th>Isbn</th>
                <th>Title</th>
                <th>Author</th>
                <th>category</th>
                <th>publishedDate</th>
                <th>Action</th>
            </tr>
    
    `;
    books.forEach((book , index)=>{
        output += `
        <tr>
            <td>${book.isbn}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.date}</td>
            <td><i class="fa fa-edit" onclick='fillForm(${index})' ></i> <i class="fa fa-trash"></i></td>
        </tr>

        `;
    })
    output += '</table>';
    BookList.innerHTML = output;
}

function fillForm(index) {
    isbn.value = StoreBook[index].isbn;
    title.value = StoreBook[index].title;
    author.value = StoreBook[index].author;
    category.value = StoreBook[index].category;
    date.value = StoreBook[index].date;

    btn.value = 'Update';
    UpdatedID = index;
}

function Update(obj){
    StoreBook[UpdatedID] = obj;
    localStorage.setItem('books',JSON.stringify(StoreBook));
    location.reload();
}