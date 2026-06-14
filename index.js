import 'dotenv/config';
import express from 'express';
const app = express()
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.listen(PORT,()=>{
    console.log('El servidor esta coriendo en http://localhost:${PORT}');

});

app.get('/',(req,res)=>{
     res.status(500).json({
        message:'API de la tarea 1 modulo 6'
     });
});

// base de datos en memoria
const estudiantes = [
  { nombre: "Alejandro García",  correo: "alejandro.garcia@email.com",  nota: 8.5 },
  { nombre: "Beatriz López",     correo: "b.lopez99@email.com",         nota: 9.2 },
  { nombre: "Carlos Mendoza",    correo: "mendoza.carlos@email.com",    nota: 7.8 },
  { nombre: "Diana Martínez",    correo: "diana.mtz@email.com",         nota: 9.5 },
  { nombre: "Eduardo Torres",    correo: "e.torres.edu@email.com",      nota: 6.4 },
  { nombre: "Fernanda Ruiz",     correo: "fer.ruiz.v@email.com",        nota: 8.8 },
  { nombre: "Gabriel Soto",      correo: "g.soto_prof@email.com",       nota: 7.3 },
  { nombre: "Helena Castro",     correo: "helena.castro@email.com",     nota: 4.1 },
  { nombre: "Iván Delgado",      correo: "delgado.ivan@email.com",      nota: 8.2 },
  { nombre: "Julia Ortega",      correo: "j.ortega.msn@email.com",      nota: 9.7 },
  { nombre: "Kevin Blanca",      correo: "k.blanca88@email.com",        nota: 5.0 },
  { nombre: "Laura Méndez",      correo: "laura.mendez@email.com",      nota: 8.9 },
  { nombre: "Mario Silva",       correo: "silva.mario@email.com",       nota: 7.5 },
  { nombre: "Natalia Ríos",      correo: "n.rios.academia@email.com",   nota: 9.3 },
  { nombre: "Oscar Peña",        correo: "oscar.pena@email.com",        nota: 3.5 },
  { nombre: "Patricia Luna",     correo: "p.luna.vance@email.com",      nota: 8.6 },
  { nombre: "Quique Jara",       correo: "quique.jara@email.com",       nota: 7.0 },
  { nombre: "Rosa Valdés",       correo: "r.valdes.g@email.com",        nota: 9.4 },
  { nombre: "Sergio Pardo",      correo: "sergio.pardo@email.com",      nota: 6.8 },
  { nombre: "Teresa Vega",       correo: "t.vega.solis@email.com",      nota: 9.0 },
];
//get

// GET todos los estudiantes
app.get("/estudiantes", (req, res) => {
  res.json(estudiantes);
});


// GET estudiante por correo
app.get("/estudiantes/:correo", (req, res) => {
  const correo = decodeURIComponent(req.params.correo);
  const estudiante = estudiantes.find(e => e.correo === correo);

  if (!estudiante) {
    return res.status(404).json({ mensaje: "Estudiante no encontrado." });
  }

  res.json(estudiante);
});

// GET estudiante por nombre (búsqueda parcial, sin importar mayúsculas)
app.get("/estudiantes/buscar/:nombre", (req, res) => {
  const nombre = decodeURIComponent(req.params.nombre).toLowerCase();
  const resultados = estudiantes.filter(e =>
    e.nombre.toLowerCase().includes(nombre)
  );

  if (resultados.length === 0) {
    return res.status(404).json({ mensaje: "No se encontraron estudiantes." });
  }

  res.json(resultados);
});
//post

// POST registrar nuevo estudiante
app.post("/estudiantes", (req, res) => {
  const { nombre, correo, nota } = req.body;

  // Validar que todos los campos estén presentes
  if (!nombre || !correo || nota === undefined) {
    return res.status(400).json({ mensaje: "Todos los campos son requeridos: nombre, correo, nota." });
  }

  // Validar que la nota esté entre 0 y 10
  if (nota < 0 || nota > 10) {
    return res.status(400).json({ mensaje: "La nota debe estar entre 0 y 10." });
  }

  // Validar que el correo no esté ya registrado
  const existe = estudiantes.find(e => e.correo === correo);
  if (existe) {
    return res.status(409).json({ mensaje: "Ya existe un estudiante con ese correo." });
  }

  const nuevoEstudiante = { nombre, correo, nota };
  estudiantes.push(nuevoEstudiante);   //put


  res.status(201).json({
    mensaje: "Estudiante registrado exitosamente.",
    estudiante: nuevoEstudiante
  });
});


// delete

// DELETE eliminar estudiante por correo
app.delete("/estudiantes/:correo", (req, res) => {
  const correo = decodeURIComponent(req.params.correo);

  const index = estudiantes.findIndex(e => e.correo === correo);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Estudiante no encontrado." });
  }

  const eliminado = estudiantes.splice(index, 1)[0];

  res.json({
    mensaje: "Estudiante eliminado exitosamente.",
    estudiante: eliminado
  });
});