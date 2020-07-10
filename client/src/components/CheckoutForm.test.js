import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    //Arrange
    render(<CheckoutForm />);

    //Act
    const h2title = screen.getByText(/checkout form/i);

    //Assert
    expect(h2title).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    //Arrange
    render(<CheckoutForm />);

    //Act
    const fName = screen.getByLabelText(/first name/i);
    const lName = screen.getByLabelText(/last name/i);
    const addr = screen.getByLabelText(/address/i);
    const local = screen.getByLabelText(/city/i);
    const usState = screen.getByLabelText(/state/i);
    const zipcode = screen.getByLabelText(/zip/i);
    const checkBtn = screen.getByRole('button');

    fireEvent.change(fName, {target: {value: 'Peter'}});
    fireEvent.change(lName, {target: {value: 'Wood'}});
    fireEvent.change(addr, {target: {value: '5678 Georgia Street'}});
    fireEvent.change(local, {target: {value: 'Georgia City'}});
    fireEvent.change(usState, {target: {value: 'GA'}});
    fireEvent.change(zipcode, {target: {value: '45678'}});
    fireEvent.click(checkBtn);

    const output = screen.getByTestId('successMessage'); //placed here after the fireEvents since this won't display until after the button is clicked

    //Assert
    expect(fName).toBeInTheDocument();
    expect(lName).toBeInTheDocument();
    expect(addr).toBeInTheDocument();
    expect(local).toBeInTheDocument();
    expect(usState).toBeInTheDocument();
    expect(zipcode).toBeInTheDocument();
    expect(output).toBeInTheDocument();

    //To double-check the output
    const fullLocation = screen.getByText(/georgia city, ga 45678/i); //This is the city, state, and zip in the fireEvents concatenated together
    expect(fullLocation).toBeInTheDocument();
});
