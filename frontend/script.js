document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
  document.getElementById("studentsTable").style.display = "table";
});

const p = document.getElementById("greetMessage");

document.getElementById("HiButton").addEventListener("click", async () => {
  const name = document.getElementById("nameInput").value;
  const response = await fetch(`/api/greet?name=${name}`);
  const data = await response.json();
  p.textContent = data.message;
  p.style.display = "block";
});

document.getElementById("nameInput").addEventListener("input", () => {
  const name = document.getElementById("nameInput").value.trim();
  document.getElementById("HiButton").disabled = name === "";
});

document.getElementById("newStudentInput").addEventListener("input", () => {
  const name = document.getElementById("newStudentInput").value.trim();
  document.getElementById("addButton").disabled = name === "";
});

document.getElementById("addButton").addEventListener("click", async () => {
  const name = document.getElementById("newStudentInput").value.trim();
  if (!name) return;

  const response = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  const newStudent = await response.json();

  const tbody = document.querySelector("#studentsTable tbody");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${newStudent.id}</td><td>${newStudent.name}</td>`;
  tbody.appendChild(row);

  document.getElementById("studentsTable").style.display = "table";
  document.getElementById("newStudentInput").value = "";
  document.getElementById("addMessage").textContent = `"${newStudent.name}" agregado correctamente.`;
});

