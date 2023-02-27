import { useState, useEffect } from "react";

const typeDelta = () => {
    return 250 - Math.random() * 50;
}

const deleteDelta = () => {
    return 150 - Math.random() * 50;
}

const TypingBanner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('_');
    const [delta, setDelta] = useState(typeDelta());
    const [index, setIndex] = useState(1);
    const toRotate = ["Computer Science Student", "Aspiring Software Developer"];

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    })

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);


        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(deleteDelta());
        } else if (isDeleting && updatedText.length === 1) {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(typeDelta());
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }
    return (
        <div>
            <h3 className="py-2 text-2xl text-teal-900 dark:text-teal-600 md:text-3xl">{text}</h3>
        </div >
    )
}
export default TypingBanner;