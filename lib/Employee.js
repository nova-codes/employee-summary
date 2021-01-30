// Parent class - Employee
class Employee {
    constructor(name, id, email){
       this.name = name;
       this.id = id;
       this.email = email;
       this.role = 'Employee'; 
    }

 // Getter for the name property   
 getName(){
     return this.name;
 }

// Getter for the id property
getId(){
    return this.id;
}

// Getter for the behavior property
getEmail(){
    return this.email;
}

// Getter for the role property
getRole(){
    return 'Employee';
}
}
module.exports = Employee;
