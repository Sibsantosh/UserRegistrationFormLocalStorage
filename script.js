//This is a variable for adding fetching the stored json in local storage
var persons = JSON.parse(localStorage.getItem("persons")) || [];

//This function is used for setting the div. list elements i.e card for the list of user that are added
function setInnerHtml() {
    let personCards = '<h2> Registered Users</h2><hr style="margin-top: 10px;"><br>';

    //this loop iterates over the person array and add its data to the html card
    persons.forEach(person => {
        personCards += `
        <div class="card">
            <div class="personDetails">
                <h3>${person.name}</h3>
                ${person.email}
            </div>
            <div class="personJob">
                ${person.occupation}<br>
                ${person.department}
            </div>
            <div class="cardActions">
                <button class="edit-button" onclick="editUser(${person.count})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                <button class="delete-button" onclick="deleteUser(${person.count})"><i class="fa fa-times" aria-hidden="true"></i></button>
            </div>
        </div>`;

        
    });

    //setting the contents of the list
    $('div.list').html(personCards);
    localStorage.setItem("persons",JSON.stringify(persons));
}

//This function is used for password validation i.e it validate the password entered by the user and matches it with the regular expression 
//The condition for the regex is password must be 8 digit must contain one special character and one lowercase and one upper case letter
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

//This function is used for email validation i.e it validate the email entered by the user and matches it with the regular expression 
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

//This funciton is used for registering the user to the local storage it contains some validation 
function registerUser() {
    document.getElementById('registratonFormHeader').innerHTML = 'Edit Registered Users'
    document.getElementById('email').style.opacity = '100';
    //getting the form object
    const form = document.getElementById('registrationForm');
    form.email.disabled = false;

    //getting the data inside the form
    const formData = new FormData(form);
    const jsonObject = {};
    //this loop iterates over the form and generate a json of the form data with key value pair of the name and the value of the form element
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    
    //these are the values entered by the users
    let email = jsonObject.email;
    let name = jsonObject.name;
    let phone = jsonObject.phone;
    let password = jsonObject.password;
    
    //these are some conditional statements for validating that the user didn't entered any null value for the required fields
    if(name ==="") {
        alert("Enter an name")
        return
    }
    else if(email===""){
        alert("Enter an email")
        return
    }
    else if(password ===""){
        alert("Enter an Password")
        return
    }
    else if(phone ===""){
        alert("Enter an phone number")
        return
    }


    //this function valiates the email 
    if(!validateEmail(email)){
        alert("Enter a valid Email")
        return
    }
    //this is used to check that the entered phone number is of 10 digits 
    if(phone.length!=10){
        alert("Phone Number must be 10 digit")
        return
    }
    
    
    //this function validates the email and checks whether that the password entered is valid or not
    if(!validatePassword(password)){
        alert("Enter a valid password i.e Minimum 8 digits and Must contain atleast one lower and one upper case character and one special character")
        return
    }
    
    //this is used for getting a filtered array to check whether the email entered is valid or not
    let tempArray = persons.filter(person => person.email === email);
    
    //this is used for setting a primary field
    jsonObject.count = Date.now()
 

    //if the email dont exist then user is registered
    if (tempArray.length === 0) {      
        persons.push(jsonObject);
        setInnerHtml();
        form.reset();
        
       
    } else {
        alert("User Already Exist!!");
        form.reset();
    } 
    
}



//this function deletes the user with a confirmation dialog if the user confirms then the registered user is deleted
function deleteUser(count) {
    const userConfirmed = confirm("Are you sure you want to delete this user?");

    // If the user clicks "OK", proceed with deletion else cancel it
    if (userConfirmed) {
        persons = persons.filter(person => person.count !== count);
        setInnerHtml();
    } else {
        console.log("User deletion canceled.");
    }
}

//this function is used for editing the registered users
function editUser(count) {
    document.getElementById('registratonFormHeader').innerHTML = 'Edit Registered Users'
    let temp = persons.filter(person => person.count === count)[0];
    console.log(temp);
    persons = persons.filter(person => person.count !== count);
    let form = $('#registrationForm')[0];
    form.reset();
    form.name.value = temp.name;
    form.email.value = temp.email;
    form.password.value = temp.password;
    form.dateOfBirth.value = temp.dateOfBirth;
    form.gender.value = temp.gender;
    form.phone.value = temp.phone;
    form.occupation.value = temp.occupation;
    form.department.value = temp.department;
    form.email.disabled = true;
    //makes the email field faded colour
    document.getElementById('email').style.opacity = '10';
    setInnerHtml();
}




//load the div element first time when the page loadsg
$(document).ready(_=>{
    if(persons!==null)

        setInnerHtml();
}); 