import React from 'react'

export default function Quotes() {
    const [quotes, setQuotes] = React.useState(false);
    const [currQuote, setCurrQuote] = React.useState({ quote: "", author: "" });
    const [showQuote, setShowQuote] = React.useState(true);
    
    React.useEffect(() => {
        fetch("/data/quotes.json")
        .then(res => res.json())
        .then(data => {
            setQuotes(data);
            const randNum = Math.floor(Math.random() * data.length);
            setCurrQuote({ quote: data[randNum]["quote"], author: data[randNum]["author"] });
        })
        .catch(err => err);
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const randNum = Math.floor(Math.random() * quotes.length);
            setShowQuote(oldShowQuote => !oldShowQuote);
            setTimeout(() => {
                setCurrQuote({ quote: quotes[randNum]["quote"], author: quotes[randNum]["author"] });
                setShowQuote(oldShowQuote => !oldShowQuote);
            }, 1000);
        }, 10000);
        
        return () => { clearInterval(interval) };
    }, [quotes]);

    return (
        <div className='quote' style={{color: showQuote ? "#444" : "transparent"}}>
            “ { currQuote.quote } ” ― <strong>{ currQuote.author }</strong>
        </div>
    )
}
