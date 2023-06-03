interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: 1 | 2 | 3
    ratingDescription: string;
    target: number;
    average: number;
}

interface ArgsResult {
    target: number
    exercises: number[]
}

const parseArguments  = ():ArgsResult => {
    const target = process.argv[2];
    const exercises = process.argv.slice(3,process.argv.length);
    const areNumbers = exercises.every(item => !isNaN(Number(item)));
    if(areNumbers && !isNaN(Number(target))) {
        return {
            target: Number(target),
            exercises: exercises.map(item => Number(item))
        };
    }
    throw new Error("Provided values are not numbers");
};


export const calculateExercise = (ex: Array<number>,target: number): ExerciseResult => {
    const periodLength = ex.length;
    const trainingDays = ex.filter(i => i !== 0).length;
    const totalSum = ex.reduce((a,b) => a + b, 0);
    const average = totalSum / periodLength;
    const success = average >= target;
    let rating: 1 | 2 | 3 = 1;
    let ratingDescription= "";

    if(average > target) {
        rating = 3;
        ratingDescription = "Outstanding";
    }
    if(average == target) {
        rating = 2;
        ratingDescription = "Perfect";
    }
    if(average < target) {
        rating = 1;
        ratingDescription = "Could be better";
    }
    return {
        periodLength,
        trainingDays,
        success,
        average,
        target,
        rating,
        ratingDescription
    };
};

try {
    const {target,exercises} = parseArguments();
    console.log(calculateExercise(exercises,target));
}catch(err: unknown) {
    let errorMsg = "Something went wrong, ";
    if(err instanceof Error) {
        errorMsg += err.message;
    }
    console.log(errorMsg);
}












