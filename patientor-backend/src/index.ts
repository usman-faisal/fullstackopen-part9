import express from "express";
import cors from "cors";
const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
import diagnosesRouter from "./routes/diagnose";
import patientRouter from "./routes/patient";
import entriesRouter from "./routes/entry"

const PORT = 3003;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use("/api/diagnoses",diagnosesRouter);
app.use("/api/patients",patientRouter);
app.use("/api/patients/:id/entries",entriesRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
