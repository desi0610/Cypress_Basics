class Auth{
    // difference from Java, class name does not have to be same with file name
    // you can put more than one class in a file, and none of them have super power

    login(user_name,password){
        cy.get('[name="username"]').type(user_name);
        cy.get('[name="password"]').type(password);
        cy.get('#wooden_spoon').click();
    }

    logout(){
        cy.contains('Logout').should('be.visible').click();
    }
}

const auth = new Auth(); // object of the class we made

module.export = {
    auth
}