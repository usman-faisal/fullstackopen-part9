interface ArgsResult {
    height: number
    weight: number
}

const parseArguments = ():ArgsResult => {
    const height = process.argv[2];
    const weight = process.argv[3];
    if(!isNaN(Number(height)) && !isNaN(Number(weight))){
        return {
            height: Number(height),
            weight: Number(weight)
        };
    }
    throw new Error("Provided values are not numbers");
};



export const calculateBmi = (h: number, w: number): string => {
    const bmi = w / (h / 100) ** 2;
    if(bmi < 18.5) {
        return "Abnormal (Underweight)";
    }
    if(bmi >= 18.5 && bmi <= 24.9) {
        return "Normal (healthy weight)";
    }
    if(bmi >= 25 && bmi <= 29.9) {
        return "Abnormal (Overweight)";
    }
    if(bmi >= 30){
        return "Abnormal (Obese)";
    }
    return "";
};

try {
    const {height,weight} = parseArguments();
    console.log(calculateBmi(height,weight));
}catch(e: unknown) {
    let errorMsg = "Something went wrong, ";
    if(e instanceof Error) {
        errorMsg += e.message;
    }
    console.log(errorMsg);
}