import express from "express";
import {calculateBmi} from "./bmiCalculator";
import {calculateExercise} from "./exerciseCalculator";
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi",(req,res) => {
    const {height,weight} = req.query;
    if(!isNaN(Number(height)) && !isNaN(Number(weight))){
        const bmi = calculateBmi(Number(height),Number(weight));
        res.json({
            weight,
            height,
            bmi
        });
    }else res.json({error: "invalid params"});
});
app.post("/calculator",(req,res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises,target} = req.body;
    if(!daily_exercises || !target || !Array.isArray(daily_exercises)) return res.json({error: "parameters missing"});

    const areNumbers = daily_exercises?.every((item: unknown) => !isNaN(Number(item)));
    if(areNumbers && !isNaN(Number(target))){
        const result = calculateExercise(daily_exercises as number[] ,Number(target));
        return res.json(result);
    } else {
        return res.json({error: "invalid parameters"});
    }
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});