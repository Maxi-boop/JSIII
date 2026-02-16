const area = document.getElementById("forgot-password-area");
const link = document.getElementById("forgot-password-link");

//Make the form
const forgotEmailLabel = document.createElement("label");
forgotEmailLabel.for = "forgotemail";
forgotEmailLabel.textContent = "Email:";

const forgotEmailInput = document.createElement("input");
forgotEmailInput.type = "email";
forgotEmailInput.name = "forgotemail";

const forgotEmailButton = document.createElement("button");
forgotEmailButton.type = "submit";
forgotEmailButton.textContent = "Submit";

const forgotEmailForm = document.createElement("form");
forgotEmailForm.appendChild(forgotEmailLabel);
forgotEmailForm.appendChild(forgotEmailInput);
forgotEmailForm.appendChild(forgotEmailButton);

link.addEventListener("click", () => {
    area.innerHTML = `
        <h1>Forgot Password</h1>
        `

    area.appendChild(forgotEmailForm);
})
const showPassArea = document.createElement("p");
forgotEmailForm.appendChild(showPassArea);
forgotEmailForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailPass = grabInput();
    showPassArea.textContent = 'Loading...';


    emailPass.then((value) => {
        const forgotEmailValue = forgotEmailInput.value
        showPassArea.textContent = value[forgotEmailValue];

    }).catch((error) => {
        console.error(error);
        showPassArea.textContent = 'Error Retriving Data';
    })



})

async function grabInput() {
    const response = await fetch('data.txt');
    const text = await response.text();
    const lines = text.trim().split("\n");

    const dict = {}

    lines.forEach((line) => {
        const [email, password] = line.split(" ");
        dict[email] = password.replace(/[\r]+/g, '');
    })

    return dict;
}