import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }) => {
    const renderInfo = (part: CoursePart) => {
        switch (part.kind) {
            case "basic":
                return (
                        <p>{part.description}</p>
                )
            case "group":
                return (
                        <p>{part.groupProjectCount}</p>
                )
            case "background":
                return (
                    <>
                        <p>{part.description}</p>
                        <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
                    </>
                )
            case "special":
                return (
                    <>
                        <p>{part.description}</p>
                        <p>{part.requirements.join(", ")}</p>
                    </>
                )
            default:
                return assertNever(part);
        }
    }
    return (
        <div>
            <p>
                <b>{part.name} {part.exerciseCount}</b>
            </p>
            {renderInfo(part)}
        </div>
    )

};

export default Part;
