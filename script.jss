// Optional JS if you want to add dynamic menu functionality
console.log("Site loaded successfully!");

// Example: highlight active menu item
const menuItems = document.querySelectorAll('#menu li a');
menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    menuItems.forEach(i => i.classList.remove('active'));
    e.target.classList.add('active');
  });
});
