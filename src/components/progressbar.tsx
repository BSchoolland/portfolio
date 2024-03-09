import React from "react";
import Image from "next/image";
type ProjectProgressBarProps = {
    progress: number;
    steps: React.ReactNode[];
    delay: number;
};

const ProjectProgressBar = ({progress, steps, delay }: ProjectProgressBarProps) => {
    const [currentProgress, setCurrentProgress] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    React.useEffect(() => {
    const timeout = setTimeout(() => {
        setIsVisible(true);
    }, 1000); // Delay of 1 second
    return () => clearTimeout(timeout);
}, []);
    // a count up animation for the progress bar
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setCurrentProgress((prev) => {
                    if (prev < progress) {
                        if (prev + 10 > progress) {
                            return prev + 0.01 + (progress-prev)/50;
                        }
                        return prev + 0.2
                    }
                    return progress;
                });
            }, 10);
            return () => clearInterval(interval);
        }, delay + 500); // Delay the start of the interval by 1 second
        // start a fade in animation for the progress bar

        return () => clearTimeout(timeout);
    }, [progress]);
    return (
        <div className={` ${isVisible ? "progress-bar" : "invisible"}`}>
            <div className="progress-bar-container">
                {[...Array(steps.length)].map((_, i) => (
                    <div
                        key={i}
                        className={`progress-bar-fill ${i*(progress / steps.length) < currentProgress ? 'filled' : ''}`}
                        style={{ width: `${progress / steps.length}%` }}
                    />
                ))}
            </div>
            <h3 className="progress-bar-title">
                {/* display the step that is closest in terms of % to the currentProgress */}
                {currentProgress === 0 ? '' :
                steps[Math.floor((currentProgress / progress) * steps.length)] || steps[steps.length - 1]}
            </h3>
        </div>
    );
};

export default ProjectProgressBar;
