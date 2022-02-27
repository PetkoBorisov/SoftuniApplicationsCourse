function lockedProfile() {

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(res => res.json())
        .then((data) => {
            let counter = 1;
            for (key in data) {


                console.log(data[key]);

                let username = data[key].username;
                let email = data[key].email;
                let age = data[key].age;

                //Main div(append final product here)
                let mainDivElement = document.querySelector('#main');


                //profile div
                let profileDivElement = document.createElement('div');
                profileDivElement.classList.add('profile');

                //Image
                let profileImgElement = document.createElement('img');
                profileImgElement.src = './iconProfile2.png';
                profileImgElement.classList.add('userIcon');


                //Lock label
                let lockLabelElement = document.createElement('label');
                lockLabelElement.textContent = 'Lock';
                //Lock radio button
                let lockRadioButtonElement = document.createElement('input');
                lockRadioButtonElement.type = 'radio';
                lockRadioButtonElement.name = `user${counter}Locked`;
                lockRadioButtonElement.value = 'lock';
                lockRadioButtonElement.checked = true;

                //Unlock label
                let unlockLabelElement = document.createElement('label');
                unlockLabelElement.textContent = 'Unlock';
                //Unlock radio button
                let unlockRadioButtonElement = document.createElement('input');
                unlockRadioButtonElement.type = 'radio';
                unlockRadioButtonElement.name = `user${counter}Locked`;
                unlockRadioButtonElement.value = 'unlock';

                //hr element
                let hrElement = document.createElement('hr');

                //Username Label
                let usernameLabelElement = document.createElement('label');
                usernameLabelElement.textContent = 'Username';

                //Username readonly text input
                let usernameInputElement = document.createElement('input');
                usernameInputElement.type = 'text';
                usernameInputElement.name = `user${counter}Username`;
                usernameInputElement.value = username;
                usernameInputElement.disabled = true;
                usernameInputElement.readOnly = true;

                //Hidden Info Div
                let hiddenInfoDivElement = document.createElement('div');
                hiddenInfoDivElement.classList = 'hiddenInfo';
                //add hr here

                //Email Label
                let emailLabelElement = document.createElement('label');
                emailLabelElement.textContent = 'Email:';

                //Email readonly text input
                let emailInputElement = document.createElement('input');
                emailInputElement.type = 'email';
                emailInputElement.name = `user${counter}Email`;
                emailInputElement.value = email;
                emailInputElement.disabled = true;
                emailInputElement.readOnly = true;

                //Age label
                let ageLabelElement = document.createElement('label');
                ageLabelElement.textContent = 'Age:';

                //Age readonly text input
                let ageInputElement = document.createElement('input');
                ageInputElement.type = 'email';
                ageInputElement.name = `user${counter}Age`;
                ageInputElement.value = age;
                ageInputElement.disabled = true;
                ageInputElement.readOnly = true;
                //Hidden Info div ends here


                //show more Button
                let showMoreButton = document.createElement('button');
                showMoreButton.textContent = 'Show more';
                showMoreButton.addEventListener('click', (e) => {

                    let allProfileElements = e.currentTarget.parentElement.children;

                    if (allProfileElements[4].checked == true) {

                        if (allProfileElements[7].children[2].style.display == 'block') {

                            for (child of allProfileElements[7].children) {
                                child.style.display = '';
                            }
                            e.currentTarget.textContent = 'Show more';
                        }
                        else if (allProfileElements[7].children[2].style.display == '') {


                            for (child of allProfileElements[7].children) {
                                child.style.display = 'block';
                            }
                            e.currentTarget.textContent = 'Hide it';
                        }

                    }

                })


                profileDivElement.appendChild(profileImgElement);
                profileDivElement.appendChild(lockLabelElement);
                profileDivElement.appendChild(lockRadioButtonElement);
                profileDivElement.appendChild(unlockLabelElement);
                profileDivElement.appendChild(unlockRadioButtonElement);
                profileDivElement.appendChild(hrElement);
                profileDivElement.appendChild(usernameLabelElement);
                profileDivElement.appendChild(usernameInputElement);

                hiddenInfoDivElement.appendChild(hrElement);
                hiddenInfoDivElement.appendChild(emailLabelElement);
                hiddenInfoDivElement.appendChild(emailInputElement);
                hiddenInfoDivElement.appendChild(ageLabelElement);
                hiddenInfoDivElement.appendChild(ageInputElement);

                profileDivElement.appendChild(hiddenInfoDivElement);
                profileDivElement.appendChild(showMoreButton);

                mainDivElement.appendChild(profileDivElement);

                counter++;
            }
        })
        .catch((err) => {
            console.log(err);
        })



}