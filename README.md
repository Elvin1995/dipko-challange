# Funky Code-Challenge

## Backend
Adjust the function `autoCompleteAddress` inside the `src/server.ts` file so it will return an array of Address objects.
The goal is to return a list of unique addresses that the user can choose from.

**Rules:**
* All existing test pass
* You send a valid query to the BASE_URL and use it's response
* No TypeScript errors or warning in the code
* No other dependecies should be installed

**Bonus:** Only start this task when you are 100% sure the rest is absolutely perfect! Implement an addional function called `autoCompleteAddressWithoutNo` which returns the same but without the house numbers. Don't change the existing interfaces.


## Frontend
Build a Front End which allows the user to enter an address.
The address needs to be 100% valid. Invalid street numbers, zip, city and street combinations need to show an error.
Implement a better way for the user to select an address instead if typing everything himself.
You are allowed to install anything that helps you build this including Frontend Frameworks, a style Library etc (except _).

**Rules:**
* All E2E tests pass (not yet here)
* think about a user-friendly way to create a page which let's anyone submit an address in cologne
* only accept valid addresses

**Optional Hardcore-Mode:** Don't use any framework or dependecies.
