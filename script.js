// Resume download functionality
document.getElementById("btn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "./Assets/MohibResume.pdf";  // Path to your resume PDF
    link.download = "MohibResume.pdf";  // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
const navLinks = document.querySelectorAll(".navbar a");  
const sections = document.querySelectorAll("section");    

document.querySelector('a[href="#Home"]').classList.add('active');
document.getElementById("Home").classList.add('activate');

function activateSection(event) {
    event.preventDefault();

    navLinks.forEach(link => link.classList.remove('active'));
    sections.forEach(section => section.classList.remove('activate'));

    const target = event.target;
    target.classList.add('active');
    const sectionId = target.getAttribute('href').substring(1);  
    document.getElementById(sectionId).classList.add('activate');

}

navLinks.forEach(link => {
    link.addEventListener('click', activateSection);  
});


let textElement = document.getElementById("text");
const text = " Me!";  
let index = 0;

function typeText() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);  
        index++;
        setTimeout(typeText, 1500);  
    }
}

typeText();
